# MetaCog MCP Server

Multi-strategy reasoning and problem-solving server implementing the Model Context Protocol. Provides structured cognitive processing with 20+ reasoning strategies, cognitive state management, and unified reasoning chains.

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
npm install @modelcontextprotocol/metacog
npm run build
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

### VS Code MCP

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
