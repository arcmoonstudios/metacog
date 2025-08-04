
# MetaCognition MCP Server - Optimized Production Dockerfile
# Multi-stage, security-hardened, reproducible, and CI/CD ready

FROM node:current-alpine3.22 AS base

WORKDIR /app

# Only install dumb-init, no update/upgrade needed for minimal base
RUN apk add --no-cache dumb-init

# Copy package files for dependency installation
COPY package.json package-lock.json* ./

# ================================
# BUILD STAGE
# ================================
FROM base AS builder

# Install all dependencies (including devDependencies for build)
RUN npm ci --include=dev && npm cache clean --force

# Copy source code (context is minimized by .dockerignore)
COPY . .

# Build TypeScript to JavaScript
RUN npm run build && npm run test --if-present

# ================================
# PRODUCTION DEPENDENCIES STAGE
# ================================
FROM base AS deps

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# ================================
# RELEASE STAGE
# ================================

FROM node:alpine3.22 AS release

# Build metadata arguments for reproducibility and CI/CD
ARG VCS_REF="local-dev"
ARG BUILD_DATE="unknown"

LABEL maintainer="Lord Xyn <LordXyn@proton.me>" \
      org.opencontainers.image.title="MetaCog" \
      org.opencontainers.image.description="Advanced cognitive reasoning and problem-solving server" \
      org.opencontainers.image.vendor="ArcMoon Studios" \
      org.opencontainers.image.licenses="MIT AND Apache-2.0" \
      org.opencontainers.image.source="https://github.com/arcmoonstudios/metacog" \
      org.opencontainers.image.ref.name="metacog" \
      org.opencontainers.image.revision="$VCS_REF" \
      org.opencontainers.image.created="$BUILD_DATE"

WORKDIR /app

# Install dumb-init for signal handling
RUN apk add --no-cache dumb-init

# Copy production dependencies and built app
COPY --from=deps --chown=1001:1001 /app/node_modules ./node_modules
COPY --from=builder --chown=1001:1001 /app/dist ./dist
COPY --from=builder --chown=1001:1001 /app/package.json ./

# Harden permissions and switch to non-root user early
RUN chown -R 1001:1001 /app
USER 1001:1001

# Environment configuration
ENV NODE_ENV=production \
    NODE_OPTIONS="--max-old-space-size=512" \
    DISABLE_THOUGHT_LOGGING=false \
    COGNITIVE_ENHANCEMENT=true \
    CONVERGENCE_TARGET=0.95 \
    LOG_LEVEL=info

# Expose MCP port (for WebSocket/HTTP)
EXPOSE 3000

# Healthcheck (expects /health endpoint)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --spider -q http://localhost:3000/health || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the MetaCognition MCP Server
CMD ["node", "dist/index.js"]

# ================================
# DEVELOPMENT STAGE (Optional)
# ================================
FROM builder AS development

# Install development tools
RUN npm install -g nodemon typescript ts-node

# Environment for development
ENV NODE_ENV=development \
    DISABLE_THOUGHT_LOGGING=false \
    COGNITIVE_ENHANCEMENT=true

USER 1001:1001

# Development command with hot reload
CMD ["npm", "run", "dev"]