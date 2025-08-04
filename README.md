# MetaCog - MCP Server

A Multi-strategy reasoning and problem-solving server implementing the Model Context Protocol. Provides structured cognitive processing with 8 tools and 20+ reasoning strategies, cognitive state management, and unified reasoning chains.

## Overview

The MetaCognition MCP Server orchestrates multiple reasoning strategies for complex problem-solving and analysis. It manages reasoning chains, cognitive states, and provides tools for autonomous decision-making, debugging, research, and optimization.

## Core Features

- **Multi-Strategy Reasoning**: 20+ specialized strategies including Abductive, Bayesian, Causal, Sequential, Financial, and Ethical reasoning
- **Cognitive State Management**: Parallel hypothesis exploration with superposition states and resolution mechanisms  
- **Reasoning Chain Orchestration**: Sequential strategy execution with convergence optimization
- **Thought Management**: Dynamic branching, revision, and refinement of reasoning paths
- **MCP Protocol Compliance**: Full WebSocket/stdio transport integration

## Available Tools

| Tool | Function |
|------|----------|
| `metacognition` | Multi-strategy reasoning and cognitive state management |
| `autonomous` | Decision engine with comprehensive strategy orchestration |
| `debugger` | Code analysis and error resolution |
| `markdown_master` | Markdown content creation and refactoring |
| `research_pro` | Research synthesis with online search integration |
| `deep_analysis` | Codebase and system analysis |
| `optimus_prime` | Performance and resource optimization |
| `wildcard` | Dynamic strategy selection |

## Reasoning Strategies

**Logical**: Abductive, Deductive, Inductive, Analogical, ForwardChaining, BackwardChaining, Defeasible  
**Probabilistic**: Bayesian, FuzzyLogic  
**Structural**: PatternAnalysis, ConstraintSatisfaction  
**Causal**: Causal, Counterfactual, Empirical  
**Specialized**: Financial, Ethical, Sequential, CaseBased, HypothesisGeneration  
**Control**: MetacognitiveControl

## Installation

### NPM

```bash
npm i metacog
npm start
```

### Docker

```bash
docker build -t mcp/metacog
docker run --rm -i mcp/metacog
```

## Configuration

### Claude Desktop

```json
{
  "mcpServers": {
    "metacognition": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/metacog"]
    }
  }
}
```

### Minimal VS Code MCP

```json
{
  "mcp": {
    "servers": {
      "metacognition": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/metacog"]
      }
    }
  }
}
```

## Extended mcp.json

```json
{
  "servers": {
    "metacognition": {
      "command": "npx",
      "args": ["-y", "metacog"],
      "description": "MetaCog - MCP Server, a multi-strategy reasoning and cognitive orchestration",
      "enabled": true,
      "env": {
        "DISABLE_THOUGHT_LOGGING": "false",
        "COGNITIVE_ENHANCEMENT": "true",
        "CONVERGENCE_TARGET": "0.95"
      },
      "tools": {
        "metacognition": {
          "description": "Multi-strategy reasoning engine with 8 tools and 20+ cognitive strategies, superposition states, and unified reasoning chains",
          "parameters": {
            "thought": "Current reasoning step or analysis",
            "thoughtNumber": "Current step number (integer)",
            "totalThoughts": "Estimated total steps (integer, adjustable)",
            "nextThoughtNeeded": "Whether additional steps are required (boolean)",
            "strategy": "Select specific reasoning strategy (Abductive|Analogical|BackwardChaining|Bayesian|CaseBased|Causal|ConstraintSatisfaction|Counterfactual|Deductive|Defeasible|Empirical|Ethical|Financial|ForwardChaining|FuzzyLogic|HypothesisGeneration|Inductive|Sequential|PatternAnalysis|MetacognitiveControl)",
            "strategy_input_data": "Strategy-specific parameters (object)",
            "cognitive_superposition_concepts": "Create parallel hypothesis states (array of strings)",
            "cognitive_resolve_state_id": "Collapse superposition to single concept (string)",
            "unified_reasoning_chain": "Execute multi-strategy reasoning (boolean)",
            "convergence_target": "Target confidence level 0.0-1.0 (number)"
          }
        },
        "autonomous": {
          "description": "Autonomous decision engine leveraging all reasoning strategies for optimal task execution",
          "parameters": {
            "task": "Decision or task requiring comprehensive analysis (string, required)",
            "context": "Additional context, constraints, or parameters (object)",
            "priority": "Priority level: low|medium|high|critical (default: medium)",
            "timeHorizon": "Time frame for implementation (string)",
            "riskTolerance": "Risk tolerance 0.0-1.0 (number, default: 0.5)"
          }
        },
        "debugger": {
          "description": "Autonomous code debugger with pattern recognition, causal analysis, and constraint satisfaction",
          "parameters": {
            "errors": "Compiler errors, lint warnings, or problem descriptions (array of strings, required)",
            "codeContext": "Relevant code snippet or file content (string)",
            "environment": "Development environment details (object)",
            "previousAttempts": "Previous debugging attempts or solutions tried (array of strings)"
          }
        },
        "markdown_master": {
          "description": "Creates or refactors markdown content with lint compliance and optimal structure",
          "parameters": {
            "content": "Existing markdown content to refactor or base content (string, required)",
            "lintWarnings": "Markdown lint warnings or style issues (array of strings)",
            "targetStyle": "Target markdown style: github|commonmark|academic|technical|readme (default: github)",
            "preserveStructure": "Whether to preserve original document structure (boolean, default: true)",
            "requirements": "Specific requirements like TOC, badges, formatting rules (object)"
          }
        },
        "research_pro": {
          "description": "Autonomous research engine with online search, abductive reasoning, and Bayesian synthesis",
          "parameters": {
            "query": "Research query or problem to investigate (string, required)",
            "domain": "Specific domain or field of research (string)",
            "failureContext": "Description of what was attempted and failed (string)",
            "searchDepth": "Research depth: shallow|moderate|deep|comprehensive (default: moderate)",
            "sources": "Preferred or required information sources (array of strings)"
          }
        },
        "deep_analysis": {
          "description": "Comprehensive analysis of codebases, modules, or systems for bugs, optimization, and architecture",
          "parameters": {
            "target": "Code, module, system, or codebase to analyze (string, required)",
            "analysisType": "Focus area: security|performance|maintainability|architecture|comprehensive (default: comprehensive)",
            "language": "Programming language or technology stack (string)",
            "metrics": "Specific metrics or aspects to evaluate (array of strings)",
            "baseline": "Baseline metrics or reference standards for comparison (object)"
          }
        },
        "optimus_prime": {
          "description": "Strategic optimizer for peak performance, safety, and minimal overhead",
          "parameters": {
            "target": "System, code, configuration, or process to optimize (string, required)",
            "optimizationGoals": "Primary objectives: performance|memory|security|maintainability|cost|reliability (array, required)",
            "constraints": "Constraints to respect during optimization (object)",
            "currentMetrics": "Current performance metrics or baseline measurements (object)",
            "environment": "Target environment or deployment context (string)"
          }
        },
        "wildcard": {
          "description": "Dynamic strategy selector with intelligent reasoning orchestration based on input analysis",
          "parameters": {
            "input": "User input, problem, or query to analyze and resolve (string, required)",
            "context": "Additional context about problem domain or requirements (object)",
            "urgency": "Urgency level: low|medium|high|critical (default: medium)",
            "complexity": "Problem complexity: simple|moderate|complex|unknown (default: unknown)",
            "preferredApproach": "User's preferred problem-solving approach (string)"
          }
        }
      },
      "shortcuts": {
        "t1": "autonomous",
        "t2": "debugger", 
        "t3": "markdown_master",
        "t4": "research_pro",
        "t5": "deep_analysis",
        "t6": "optimus_prime",
        "t7": "wildcard"
      }
    }
  },
  "settings": {
    "logLevel": "info",
    "timeout": 30000,
    "maxConcurrentRequests": 5,
    "retryAttempts": 3,
    "bufferSize": "512MB"
  },
  "features": {
    "cognitiveEnhancement": true,
    "parallelProcessing": true,
    "adaptiveStrategies": true,
    "thoughtLogging": true,
    "performanceMetrics": true
  }
}
```

## Usage Examples

### Basic Strategy Application

```json
{
  "thought": "Analyzing market data for trend identification",
  "thoughtNumber": 1,
  "totalThoughts": 3,
  "nextThoughtNeeded": true,
  "strategy": "Bayesian",
  "strategy_input_data": {
    "prior": 0.6,
    "evidence_threshold": 0.8
  }
}
```

### Cognitive Superposition

```json
{
  "thought": "Exploring multiple causal hypotheses",
  "thoughtNumber": 1,
  "totalThoughts": 4,
  "nextThoughtNeeded": true,
  "cognitive_superposition_concepts": [
    "supply chain disruption",
    "demand fluctuation", 
    "competitive pressure",
    "regulatory changes"
  ]
}
```

### Unified Reasoning Chain

```json
{
  "thought": "Comprehensive problem analysis",
  "thoughtNumber": 1,
  "totalThoughts": 1,
  "nextThoughtNeeded": false,
  "unified_reasoning_chain": true,
  "strategies": ["Causal", "Bayesian", "Sequential"],
  "convergence_target": 0.95,
  "cognitive_enhancement": true
}
```

## API Reference

### Core Inputs

- `thought` (string): Current reasoning step or analysis
- `thoughtNumber` (integer): Current step number
- `totalThoughts` (integer): Estimated total steps (adjustable)
- `nextThoughtNeeded` (boolean): Whether additional steps are required

### Advanced Features

- `cognitive_superposition_concepts` (array): Create parallel hypothesis states
- `cognitive_resolve_state_id` (string): Collapse superposition to single concept
- `strategy` (enum): Select specific reasoning strategy
- `unified_reasoning_chain` (boolean): Execute multi-strategy reasoning
- `convergence_target` (number): Target confidence level (0.0-1.0)

### Strategy Parameters

Different strategies accept specific input parameters via `strategy_input_data`:

- **Bayesian**: `{ prior: number, evidence_threshold: number }`
- **Causal**: `{ cause: string, effect: string }`
- **Counterfactual**: `{ original_condition: string, altered_condition: string }`
- **Financial**: `{ market_data: object, risk_tolerance: number }`
- **Sequential**: `{ time_horizon: string, world_branches: boolean }`

## Environment Variables

- `DISABLE_THOUGHT_LOGGING`: Disable console output of reasoning steps
- `COGNITIVE_ENHANCEMENT`: Enable/disable cognitive superposition features
- `CONVERGENCE_TARGET`: Default convergence threshold for reasoning chains

## Development

### Prerequisites

- Node.js 18+
- TypeScript 4.9+

### Build

```bash
npm install
npm run build
npm test
```

### Testing

```bash
npm run test:strategies    # Strategy validation
npm run test:cognitive     # Cognitive features
npm run benchmark          # Performance tests
```

## License

MIT & Apache-2.0
