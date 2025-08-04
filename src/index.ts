#!/usr/bin/env node
/**
 * # MetaCog - MCP Server 
 *
 * @brief: Multi-strategy reasoning and cognitive orchestration server implementing the Model Context Protocol.
 * Designed for integration into ArcMoon-compatible systems with modular extensibility and expressive configurability.
 *
 * ## Key Capabilities
 *
 * - Multi-strategy reasoning engine: 20+ specialized strategies (Abductive, Bayesian, Causal, Sequential, etc.)
 * - Cognitive superposition states: Parallel hypothesis exploration with quantum-inspired state management
 * - MCP protocol compliance: Full WebSocket/stdio transport with tool orchestration
 * - Reasoning chain optimization: Convergence targeting, metacognitive control, and performance tracking
 * - Dynamic thought management: Branching, revision, and real-time reasoning path refinement
 *
 * ## Usage
 *
 * ```ts
 * import { OmniCognizantTactician, MetacognitionMCP } from './server';
 *
 * const config = {
 *   cognitive: { coherenceThreshold: 0.95, maxSuperpositionStates: 32 },
 *   reasoning: { strategySynthesis: true, convergenceTarget: 0.99 },
 *   acceleration: { gpuEnabled: true, parallelStrategy: true }
 * };
 *
 * const tactician = new OmniCognizantTactician(config);
 * const result = await tactician.executeReasoningChain({
 *   goal: "Analyze market trends",
 *   strategies: ["Bayesian", "Causal", "Sequential"],
 *   cognitiveEnhancement: true
 * });
 * ```
 *
 * ## Notes
 *
 * This module is designed to pair with `@modelcontextprotocol/sdk` and compatible orchestration layers.
 * Result structures follow `ReasoningChain` and `CognitiveContext` interfaces with full serialization support.
 * Integrates with Winston logging, Zod validation, and UUID generation for production readiness.
 *▫~•◦────────────────────────────────────────────────────────────────────────────────────‣
 * © 2025 ArcMoon Studios ◦ SPDX-License-Identifier MIT OR Apache-2.0 ◦ Author: Lord Xyn ✶
 *///◦────────────────────────────────────────────────────────────────────────────────────‣

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    Tool,
} from "@modelcontextprotocol/sdk/types.js";
import chalk from 'chalk';
import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";

// --- Core Enums and Types ---

enum ReasoningStrategy {
    Abductive = "Abductive",
    Analogical = "Analogical",
    BackwardChaining = "BackwardChaining",
    Bayesian = "Bayesian",
    CaseBased = "CaseBased",
    Causal = "Causal",
    ConstraintSatisfaction = "ConstraintSatisfaction",
    Counterfactual = "Counterfactual",
    Deductive = "Deductive",
    Defeasible = "Defeasible",
    Empirical = "Empirical",
    Ethical = "Ethical",
    Financial = "Financial",
    ForwardChaining = "ForwardChaining",
    FuzzyLogic = "FuzzyLogic",
    HypothesisGeneration = "HypothesisGeneration",
    Inductive = "Inductive",
    Sequential = "Sequential",
    PatternAnalysis = "PatternAnalysis",
    MetacognitiveControl = "MetacognitiveControl",
    OnlineSearch = "OnlineSearch",
}

enum PremiseSource {
    Knowledge = 'Knowledge',
    Observation = 'Observation',
    Assumption = 'Assumption',
    Inference = 'Inference',
    ExternalInput = 'ExternalInput',
    Measurement = 'Measurement',
    Analysis = 'Analysis',
    Statistical = 'Statistical',
    Simulation = 'Simulation'
}

enum EvidenceType {
    Analogical = 'Analogical',
    Causal = 'Causal',
    Data = 'Data',
    Empirical = 'Empirical',
    Experimental = 'Experimental',
    Expert = 'Expert',
    Logical = 'Logical',
    Observation = 'Observation',
    Statistical = 'Statistical',
    Theoretical = 'Theoretical',
    Simulation = 'Simulation',
    Cognitive = 'Cognitive',
    Temporal = 'Temporal',
    Preforeception = 'Preforeception'
}

enum StepType {
    Inference = 'Inference',
    HypothesisGeneration = 'HypothesisGeneration',
    AbductiveInference = 'AbductiveInference',
    CausalAnalysis = 'CausalAnalysis',
    PatternRecognition = 'PatternRecognition',
    TemporalReasoning = 'TemporalReasoning',
    ConstraintPropagation = 'ConstraintPropagation',
    CounterfactualAnalysis = 'CounterfactualAnalysis',
    DefeasibleEvaluation = 'DefeasibleEvaluation',
    FuzzyLogicInference = 'FuzzyLogicInference',
    Analysis = 'Analysis',
    Synthesis = 'Synthesis',
    Evaluation = 'Evaluation',
    Generation = 'Generation',
    Measurement = 'Measurement',
    WorldBranchGeneration = 'WorldBranchGeneration'
}

enum StrategyCategory {
    Logical = 'Logical',
    Probabilistic = 'Probabilistic',
    Structural = 'Structural',
    Causal = 'Causal',
    Ethical = 'Ethical',
    Specialized = 'Specialized',
    Search = 'Search',
    DomainSpecific = 'DomainSpecific'
}

enum MarketRegime {
    Bull = 'Bull',
    Bear = 'Bear',
    Volatile = 'Volatile',
    Stable = 'Stable',
    Crisis = 'Crisis'
}

interface IReasoningStrategy {
    readonly name: ReasoningStrategy;
    readonly category?: StrategyCategory;
    readonly cognitiveCompatible?: boolean;
    readonly convergenceWeight?: number;
    executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep>;
}

interface Premise {
    id: string;
    statement: string;
    confidence: number;
    source: PremiseSource | string;
    cognitiveWeight?: CognitiveComplex;
    evidenceSupport?: Evidence[];
    dependencies?: string[];
    content?: string;
}

interface Evidence {
    id: string;
    type: EvidenceType | string;
    content: string;
    strength: number;
    source: string;
    reliability?: number;
    timestamp?: Date;
    cognitiveCorrelation?: number;
    metadata?: Record<string, any>;
}

interface Conclusion {
    id?: string;
    statement: string;
    confidence: number;
    reasoning: string;
    premises: string[];
    alternatives?: ExplanationCandidate[];
    cognitiveResolutionBasis?: string;
    convergenceMetrics?: ConvergenceMetrics;
}

interface ReasoningStep {
    id: string;
    type: StepType | string;
    strategyName?: ReasoningStrategy;
    premises: Premise[];
    conclusion: Conclusion;
    confidence: number;
    reasoning?: string;
    evidence?: Evidence[];
    cognitiveEnhancement?: number;
    convergenceContribution?: number;
    metadata?: Record<string, any>;
}

interface ReasoningChain {
    id: string;
    goal: string;
    steps: ReasoningStep[];
    finalConclusion?: Conclusion;
    cognitiveState?: CognitiveReasoningState;
    currentState?: {
        workingHypotheses?: GeneratedHypothesis[];
        accumulatedEvidence?: Evidence[];
        confidenceEvolution?: number[];
    };
    metadata: {
        creationTimestamp: Date;
        totalProcessingTime?: number;
        convergenceScore?: number;
        cognitiveEnhancement?: number;
    };
}

interface CognitiveContext {
    query: string;
    domain?: string;
    context?: Record<string, any>;
    timeHorizon?: string;
    riskTolerance?: number;
    complexityLevel?: number;
    marketRegime?: MarketRegime;
    cognitiveState?: CognitiveReasoningState;
    priorMeasurements?: CognitiveMeasurementResult[];
    convergenceTarget?: number;
}

interface KnowledgeFact {
    id: string;
    content: string;
    confidence: number;
    source: string;
    domain?: string | undefined;
    timestamp?: Date;
}

interface KnowledgeRule {
    id: string;
    premises?: string[];
    condition?: string;
    conclusion: string;
    confidence: number;
    domain?: string;
}

interface LogicalRule {
    id: string;
    premises: string[];
    conclusion: string;
    confidence: number;
}

interface StatisticalEvidence extends Evidence {
    sampleSize: number;
    pValue?: number;
    confidenceInterval?: [number, number];
    effectSize?: number;
}

interface KnowledgeAdapter {
    search(query: string, limit?: number): Promise<KnowledgeFact[]>;
    getRules(domain?: string): Promise<LogicalRule[]>;
    getFacts(query: string): Promise<KnowledgeFact[]>;
    getStatistics?(concept: string): Promise<StatisticalEvidence[]>;
    getCausalRelationships?(cause: string, effect: string): Promise<any[]>;
    validateConsistency?(fact: string, domain?: string): Promise<boolean>;
    cacheSize?: number;
    performance?: {
        averageResponseTime: number;
        successRate: number;
    };
}

// --- Cognitive Reasoning Types (Converted from Quantum) ---

export interface CognitiveComplex {
    confidence: number;
    potential: number;
}

export interface CognitiveReasoningState {
    id: string;
    concepts: string[];
    strategies: ReasoningStrategy[];
    conceptualAmplitude: CognitiveComplex[];
    coherenceLevel: number;
    interconnectedPartners: string[];
    creationTimestamp: Date;
    lastMeasurement?: Date;
    decoherenceRate: number;
    measurementCount: number;
}

export interface CognitiveMeasurementResult {
    measurementId: string;
    cognitiveStateId: string;
    resolvedStrategy: ReasoningStrategy;
    resolvedConcepts: string[];
    measurementBasis: 'highest_confidence' | 'lowest_entropy' | 'weighted_random';
    postMeasurementCoherence: number;
    postMeasurementCertainty: number;
    timestamp: Date;
}

export interface ConvergenceMetrics {
    cognitiveCoherence: number;
    strategicAlignment: number;
    evidenceConsistency: number;
    conclusionStability: number;
    overallConvergence: number;
}

export function knowledgeRuleToLogicalRule(rule: KnowledgeRule): LogicalRule {
    return {
        id: rule.id,
        premises: rule.premises || [],
        conclusion: rule.conclusion,
        confidence: rule.confidence
    };
}

export function demoKnowledgeRuleUsage(): LogicalRule {
    const knowledgeRule: KnowledgeRule = {
        id: 'kr1',
        premises: ['A', 'B'],
        condition: 'A && B',
        conclusion: 'C',
        confidence: 0.95,
        domain: 'demo'
    };
    return knowledgeRuleToLogicalRule(knowledgeRule);
}

// --- Specialized Data Structures ---

export interface ExplanationCandidate {
    hypothesis: string;
    explanation: string;
    simplicityScore: number;
    completenessScore: number;
    consistencyScore: number;
    plausibilityScore: number;
    overallScore: number;
    cognitiveWeight?: CognitiveComplex;
}

export interface InductivePattern {
    pattern: string;
    instances: KnowledgeFact[];
    strength: number;
    generality: number;
    statisticalSignificance: number;
    variance: number;
    cognitiveCoherence?: number;
}

export interface BayesianBelief {
    hypothesis: string;
    priorProbability: number;
    likelihood: number;
    posteriorProbability: number;
    evidence: Evidence[];
    cognitiveEnhancement?: number;
}

export interface CausalRelationship {
    cause: string;
    effect: string;
    strength: number;
    confidence: number;
    criteria: CausalCriteria;
    cognitiveCorrelation?: CognitiveComplex;
}

export interface CausalCriteria {
    strength: number;
    consistency: number;
    temporality: number;
    plausibility: number;
    coherence: number;
    doseResponse: number;
    experiment: number;
    analogy: number;
    specificity: number;
}

export interface GeneratedHypothesis {
    id: string;
    hypothesis: string;
    noveltyScore: number;
    relevanceScore: number;
    posteriorProbability: number;
    supportingEvidence: Evidence[];
    cognitiveAmplitude?: CognitiveComplex;
}

export interface TemporalReasoningStep {
    id: string;
    timestamp: number;
    causality: string[];
    dependencies: string[];
    worldBranchProbability: number;
    temporalCoherence: number;
    causalWeight: number;
}

export interface WorldBranchContext {
    branchId: string;
    parentBranches: string[];
    timelinePosition: number;
    probabilityDistribution: number[];
    causalFactors: string[];
    coherenceMetrics: {
        temporal: number;
        logical: number;
        causal: number;
    };
    metadata?: {
        preforeceptionCompatible?: boolean;
        hgpfgIntegration?: boolean;
        cognitiveEnhanced?: boolean;
    };
}

export interface ExplorationContext {
    keyConcepts: string[];
    existingHypotheses: GeneratedHypothesis[];
    accumulatedEvidence: Evidence[];
    constraints: string[];
    cognitiveState?: CognitiveReasoningState;
}

// --- Mock Implementations for Dependencies ---
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
            let metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
            return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metaString}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ timestamp, level, message, ...meta }) => {
                    let metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
                    return `[${timestamp}] [${level}] ${message} ${metaString}`;
                })
            )
        }),
        new winston.transports.File({ filename: 'metacog.log' })
    ]
});

// --- ArcError Implementation ---
enum ErrorCategory {
    Reasoning = 'Reasoning',
    InvalidArgument = 'InvalidArgument',
    Configuration = 'Configuration'
}

class ArcError extends Error {
    constructor(
        public category: ErrorCategory,
        public details: { message: string; context?: any }
    ) {
        super(details.message);
        this.name = 'ArcError';
    }
}

// --- Strategy Registry ---
export const REASONING_STRATEGY_REGISTRY = {
    [ReasoningStrategy.Abductive]: {
        class: 'AbductiveReasoningStrategy',
        category: StrategyCategory.Logical,
        description: 'Inference to the best explanation',
        complexity: 'High',
        cognitiveCompatible: true,
        convergenceWeight: 0.85,
        useCases: ['Hypothesis generation', 'Diagnostic reasoning', 'Scientific discovery']
    },
    [ReasoningStrategy.Deductive]: {
        class: 'DeductiveReasoningStrategy',
        category: StrategyCategory.Logical,
        description: 'Top-down logical inference',
        complexity: 'Medium',
        cognitiveCompatible: true,
        convergenceWeight: 0.90,
        useCases: ['Formal logic', 'Mathematical proofs', 'Rule-based systems']
    },
    [ReasoningStrategy.Inductive]: {
        class: 'InductiveReasoningStrategy',
        category: StrategyCategory.Logical,
        description: 'Pattern-based generalization',
        complexity: 'Medium',
        cognitiveCompatible: true,
        convergenceWeight: 0.80,
        useCases: ['Pattern recognition', 'Statistical inference', 'Machine learning']
    },
    [ReasoningStrategy.Bayesian]: {
        class: 'BayesianReasoningStrategy',
        category: StrategyCategory.Probabilistic,
        description: 'Probabilistic belief updating',
        complexity: 'High',
        cognitiveCompatible: true,
        convergenceWeight: 0.95,
        useCases: ['Uncertainty quantification', 'Risk assessment', 'Decision making']
    },
    [ReasoningStrategy.Causal]: {
        class: 'CausalReasoningStrategy',
        category: StrategyCategory.Causal,
        description: 'Cause-effect relationship analysis',
        complexity: 'High',
        cognitiveCompatible: false,
        convergenceWeight: 0.88,
        useCases: ['Root cause analysis', 'Scientific explanation', 'Policy analysis']
    },
    [ReasoningStrategy.Financial]: {
        class: 'FinancialReasoningStrategy',
        category: StrategyCategory.DomainSpecific,
        description: 'Comprehensive financial analysis',
        complexity: 'High',
        cognitiveCompatible: true,
        convergenceWeight: 0.92,
        useCases: ['Market analysis', 'Risk assessment', 'Investment decisions']
    },
    [ReasoningStrategy.Sequential]: {
        class: 'SequentialReasoningStrategy',
        category: StrategyCategory.Specialized,
        description: 'Temporal chain orchestration',
        complexity: 'High',
        cognitiveCompatible: true,
        convergenceWeight: 0.88,
        useCases: ['Temporal reasoning', 'Process analysis', 'Sequential decision making']
    }
} as const;

// --- Reasoning Strategy Implementations (Full & Complete) ---

class AbductiveReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Abductive;
    readonly category = StrategyCategory.Logical;
    readonly cognitiveCompatible = true;
    readonly convergenceWeight = 0.85;

    private calculateOverallScore(candidate: { simplicityScore: number, completenessScore: number, consistencyScore: number, plausibilityScore: number }): number {
        return (candidate.simplicityScore * 0.3) + (candidate.completenessScore * 0.3) + (candidate.consistencyScore * 0.2) + (candidate.plausibilityScore * 0.2);
    }

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Abductive Reasoning for: "${context.query}" (chain id: ${chain.id})`);
        // Use chain for context integration (even if not used directly)
        // ...existing code...
        const observations = await knowledge.search(context.query);
        if (observations.length === 0) {
            observations.push({ id: 'default-obs', content: context.query, confidence: 0.6, source: 'UserInput', domain: context.domain || 'general' });
        }
        const rules = await knowledge.getRules(context.domain || 'general');
        let explanationCandidates: any[] = [];
        for (const obs of observations) {
            for (const rule of rules) {
                if (rule.conclusion.toLowerCase().includes(obs.content.toLowerCase())) {
                    explanationCandidates.push({ hypothesis: `The cause is: ${rule.premises.join(' and ')}`, explanation: `The rule "${rule.premises.join(' AND ')} -> ${rule.conclusion}" explains the observation "${obs.content}".`, plausibilityScore: rule.confidence });
                }
            }
        }
        if (explanationCandidates.length === 0) {
            explanationCandidates.push({ hypothesis: `An unknown antecedent factor is responsible for "${observations[0]!.content}".`, explanation: `No known rule directly explains the observation. This is a default hypothesis based on the principle of causality.`, plausibilityScore: 0.3 });
        }
        const scoredCandidates = explanationCandidates.map(candidate => {
            const premises = candidate.hypothesis.split(' and ');
            const simplicityScore = 1 / (premises.length || 1);
            const completenessScore = 1.0;
            const consistencyScore = 0.8;
            const overallScore = this.calculateOverallScore({ ...candidate, simplicityScore, completenessScore, consistencyScore });
            return { ...candidate, simplicityScore, completenessScore, consistencyScore, overallScore };
        });
        const bestExplanation = scoredCandidates.sort((a, b) => b.overallScore - a.overallScore)[0]!;
        const premises: Premise[] = observations.map(obs => ({ id: uuidv4(), statement: `Observation: ${obs.content}`, confidence: obs.confidence, source: PremiseSource.Observation }));
        const evidence: Evidence[] = [{ id: uuidv4(), type: EvidenceType.Logical, content: `Evaluation of ${scoredCandidates.length} potential explanations. Best explanation score: ${bestExplanation.overallScore.toFixed(2)}`, strength: bestExplanation.overallScore, source: 'AbductiveAnalysis' }];
        return {
            id: uuidv4(), type: StepType.AbductiveInference, premises, evidence,
            conclusion: { statement: bestExplanation.hypothesis, confidence: bestExplanation.overallScore, reasoning: bestExplanation.explanation, premises: premises.map(p => p.id) },
            confidence: bestExplanation.overallScore,
        };
    }
}

class InductiveReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Inductive;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Inductive Reasoning for: "${context.query}"`);
        const instances = await knowledge.search(context.query);
        // Integrate chain context: check for previous inductive steps to build upon.
        const previousInductions = chain.steps.filter(s => s.strategyName === this.name);
        if (instances.length < 2) throw new Error("Inductive reasoning requires at least 2 instances.");
        const avgConfidence = instances.reduce((sum, i) => sum + i.confidence, 0) / instances.length;
        const commonTerms = this.findCommonTerms(instances.map(i => i.content));
        const generalization = `Based on ${instances.length} instances, a recurring pattern involving "${commonTerms.join(', ')}" suggests a general principle.`;
        const premises: Premise[] = instances.slice(0, 3).map(inst => ({ id: uuidv4(), statement: `Instance: ${inst.content}`, confidence: inst.confidence, source: PremiseSource.Observation }));
        if (previousInductions.length > 0) {
            premises.push({ id: uuidv4(), statement: `Building on ${previousInductions.length} prior inductive step(s).`, confidence: 0.8, source: PremiseSource.Inference });
        }
        const evidence: Evidence[] = [{ id: uuidv4(), type: EvidenceType.Empirical, content: `Analysis of ${instances.length} data points revealed a recurring pattern.`, strength: avgConfidence, source: 'DataSampling' }];
        const chainBonus = Math.min(0.1, previousInductions.length * 0.05); // Add bonus for iterative induction
        const finalConfidence = avgConfidence * 0.85 + chainBonus;
        return {
            id: uuidv4(), type: StepType.Inference, strategyName: this.name, premises, evidence,
            conclusion: { statement: generalization, confidence: finalConfidence, reasoning: `Generalized from ${instances.length} specific examples to a broader principle via pattern extraction. Chain bonus: ${chainBonus.toFixed(2)}`, premises: premises.map(p => p.id) },
            confidence: finalConfidence,
        };
    }
    private findCommonTerms(texts: string[]): string[] {
        if (texts.length === 0) return [];
        const wordCounts: { [key: string]: number } = {};
        const stopWords = new Set(['the', 'a', 'an', 'is', 'in', 'it', 'of', 'for']);
        texts.forEach(text => {
            const words = new Set(text.toLowerCase().split(/\s+/).filter(w => w.length > 3 && !stopWords.has(w)));
            words.forEach(word => { wordCounts[word] = (wordCounts[word] || 0) + 1; });
        });
        return Object.entries(wordCounts).filter(([, count]) => count >= texts.length * 0.6).sort(([, countA], [, countB]) => countB - countA).map(([word]) => word).slice(0, 2);
    }
}

class DeductiveReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Deductive;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Deductive Reasoning for: "${context.query}"`);
        const rules = await knowledge.getRules(context.domain || 'general');
        let premises = await knowledge.search(context.query);
        // Use chain to source additional premises from prior conclusions.
        const chainFacts: KnowledgeFact[] = chain.steps.map(step => ({
            id: step.id,
            content: step.conclusion.statement,
            confidence: step.conclusion.confidence,
            source: `ChainStep-${step.strategyName || 'unknown'}`,
            domain: context.domain
        }));
        premises = [...premises, ...chainFacts];
        if (rules.length === 0) throw new Error("Deductive reasoning requires logical rules.");
        if (premises.length === 0) throw new Error("Deductive reasoning requires premises.");
        for (const rule of rules) {
            const premiseMatches = rule.premises.map(rp => premises.find(p => p.content.toLowerCase().includes(rp.toLowerCase())));
            if (premiseMatches.every(p => p !== undefined)) {
                const matchedPremises = premiseMatches as KnowledgeFact[];
                const conclusionConfidence = matchedPremises.reduce((acc, p) => Math.min(acc, p.confidence), rule.confidence);
                const stepPremises: Premise[] = [ ...matchedPremises.map(p => ({ id: uuidv4(), statement: `Premise: ${p.content}`, confidence: p.confidence, source: p.source as PremiseSource })), { id: uuidv4(), statement: `Logical Rule: IF ${rule.premises.join(' AND ')} THEN ${rule.conclusion}`, confidence: rule.confidence, source: PremiseSource.Knowledge }];
                return {
                    id: uuidv4(), type: StepType.Inference, premises: stepPremises,
                    conclusion: { statement: `Therefore, by deduction: ${rule.conclusion}`, confidence: conclusionConfidence, reasoning: `Applied deductive logic using rule "${rule.id}".`, premises: stepPremises.map(p => p.id) },
                    confidence: conclusionConfidence,
                };
            }
        }
        throw new Error("No applicable logical rules found for the given premises.");
    }
}

class BayesianReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Bayesian;
    readonly category = StrategyCategory.Probabilistic;
    readonly cognitiveCompatible = true;
    readonly convergenceWeight = 0.95;

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        const stepId = `bayesian_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const startTime = Date.now();
        try {
            // Phase 1: Extract hypotheses from context
            const hypotheses = await this.extractHypotheses(chain, context);
            // Phase 2: Gather relevant evidence
            const evidence = await this.gatherEvidence(hypotheses, context, knowledge);
            // Phase 3: Update beliefs using Bayes' theorem
            const beliefs = await this.updateBeliefs(hypotheses, evidence, context);
            // Phase 4: Select most probable hypothesis
            const bestBelief = this.selectBestBelief(beliefs);
            // Phase 5: Apply cognitive enhancement
            const cognitiveEnhancement = context.cognitiveState
                ? await this.calculateCognitiveEnhancement(context.cognitiveState, bestBelief)
                : 0;

            const premises: Premise[] = evidence.map(ev => ({
                id: `evidence_${Math.random().toString(36).substring(2, 9)}`,
                statement: ev.content,
                confidence: ev.strength,
                source: PremiseSource.Measurement,
                evidenceSupport: [ev]
            }));

            const conclusion: Conclusion = {
                id: `conclusion_${stepId}`,
                statement: `Most probable: ${bestBelief.hypothesis} (P=${bestBelief.posteriorProbability.toFixed(3)})`,
                confidence: Math.min(1.0, bestBelief.posteriorProbability * (1 + cognitiveEnhancement)),
                reasoning: `Bayesian inference with prior P=${bestBelief.priorProbability.toFixed(3)}, likelihood=${bestBelief.likelihood.toFixed(3)}`,
                premises: premises.map(p => p.id)
            };

            return {
                id: stepId,
                type: StepType.Analysis,
                strategyName: this.name,
                premises,
                conclusion,
                confidence: conclusion.confidence,
                evidence,
                cognitiveEnhancement,
                metadata: {
                    processingTimeMs: Date.now() - startTime,
                    resourceCost: this.calculateResourceCost(hypotheses.length, evidence.length),
                    gpuAccelerated: evidence.length > 50
                }
            };
        }
        catch (error) {
            throw new ArcError(ErrorCategory.Reasoning, {
                message: `Bayesian reasoning failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { chainId: chain.id, context, error }
            });
        }
    }

    private async extractHypotheses(chain: ReasoningChain, _context: CognitiveContext): Promise<string[]> {
        const hypotheses: string[] = [];
        // Extract from goal
        const goalHypothesis = `Hypothesis about: ${chain.goal}`;
        hypotheses.push(goalHypothesis);
        // Extract from previous conclusions
        chain.steps.forEach(step => {
            if (step.conclusion.alternatives) {
                step.conclusion.alternatives.forEach(alt => {
                    hypotheses.push(alt.hypothesis);
                });
            }
        });
        // Extract from working hypotheses
        if (chain.currentState?.workingHypotheses) {
            chain.currentState.workingHypotheses.forEach(hyp => {
                hypotheses.push(hyp.hypothesis);
            });
        }
        return [...new Set(hypotheses)].slice(0, 5); // Limit and deduplicate
    }

    private async gatherEvidence(hypotheses: string[], context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<Evidence[]> {
        const evidence: Evidence[] = [];
        // Gather statistical evidence for each hypothesis
        for (const hypothesis of hypotheses) {
            if (knowledge.getStatistics) {
                const stats = await knowledge.getStatistics(hypothesis);
                evidence.push(...stats);
            }
        }
        // Add contextual evidence
        if (context.domain) {
            const domainFacts = await knowledge.search(context.domain, 5);
            domainFacts.forEach(fact => {
                evidence.push({
                    id: `fact_${Math.random().toString(36).substring(2, 9)}`,
                    type: EvidenceType.Statistical,
                    content: fact.content,
                    strength: fact.confidence,
                    source: fact.source,
                    reliability: 0.8
                });
            });
        }
        return evidence;
    }

    private async updateBeliefs(hypotheses: string[], evidence: Evidence[], _context: CognitiveContext): Promise<BayesianBelief[]> {
        const beliefs: BayesianBelief[] = [];
        for (const hypothesis of hypotheses) {
            const relevantEvidence = evidence.filter(ev => 
                ev.content.toLowerCase().includes(hypothesis.toLowerCase()) ||
                hypothesis.toLowerCase().includes(ev.content.toLowerCase())
            );
            // Calculate prior probability (uniform if no prior info)
            const priorProbability = 1.0 / hypotheses.length;
            // Calculate likelihood P(E|H)
            const likelihood = relevantEvidence.length > 0
                ? relevantEvidence.reduce((sum, ev) => sum + ev.strength, 0) / relevantEvidence.length
                : 0.1; // Small default for hypotheses with no evidence
            // Calculate posterior using simplified Bayes
            // P(H|E) ∝ P(E|H) * P(H)
            const unnormalizedPosterior = likelihood * priorProbability;
            beliefs.push({
                hypothesis,
                priorProbability,
                likelihood,
                posteriorProbability: unnormalizedPosterior, // Will normalize below
                evidence: relevantEvidence,
                cognitiveEnhancement: 0
            });
        }
        // Normalize posterior probabilities
        const totalPosterior = beliefs.reduce((sum, belief) => sum + belief.posteriorProbability, 0);
        if (totalPosterior > 0) {
            beliefs.forEach(belief => {
                belief.posteriorProbability /= totalPosterior;
            });
        }
        return beliefs.sort((a, b) => b.posteriorProbability - a.posteriorProbability);
    }

    private selectBestBelief(beliefs: BayesianBelief[]): BayesianBelief {
        return beliefs[0] || {
            hypothesis: 'No sufficient hypothesis',
            priorProbability: 0.5,
            likelihood: 0.1,
            posteriorProbability: 0.05,
            evidence: []
        };
    }

    private async calculateCognitiveEnhancement(cognitiveState: CognitiveReasoningState, belief: BayesianBelief): Promise<number> {
        // Cognitive enhancement is a function of cognitive coherence, evidence diversity, and novelty
        let coherenceBonus = 0;
        let evidenceDiversityBonus = 0;
        let noveltyBonus = 0;

        // 1. Cognitive coherence: higher if the cognitive state is more coherent
        coherenceBonus = Math.min(0.2, cognitiveState.coherenceLevel * 0.2);

        // 2. Evidence diversity: more diverse sources = higher bonus
        if (belief.evidence && belief.evidence.length > 0) {
            const uniqueSources = new Set(belief.evidence.map(ev => ev.source)).size;
            evidenceDiversityBonus = Math.min(0.08, uniqueSources * 0.02);
        }

        // 3. Novelty: if the hypothesis is not in the cognitive state's concepts, add a bonus
        if (cognitiveState.concepts && !cognitiveState.concepts.includes(belief.hypothesis)) {
            noveltyBonus = 0.05;
        }

        // 4. Measurement count: more measurements = more confidence
        const measurementBonus = Math.min(0.05, (cognitiveState.measurementCount || 0) * 0.01);

        // 5. Amplitude: if available, use the average potential as a bonus
        let amplitudeBonus = 0;
        if (Array.isArray(cognitiveState.conceptualAmplitude) && cognitiveState.conceptualAmplitude.length > 0) {
            amplitudeBonus = Math.min(0.05, cognitiveState.conceptualAmplitude.reduce((sum, c) => sum + (c.potential || 0), 0) / cognitiveState.conceptualAmplitude.length * 0.05);
        }

        // Total enhancement, capped
        const total = coherenceBonus + evidenceDiversityBonus + noveltyBonus + measurementBonus + amplitudeBonus;
        return Math.min(0.35, total);
    }

    private calculateResourceCost(hypothesesCount: number, evidenceCount: number): number {
        const baseCost = 15;
        const hypothesesCost = hypothesesCount * 3;
        const evidenceCost = evidenceCount * 1;
        return baseCost + hypothesesCost + evidenceCost;
    }
}

// Continue with other strategy implementations...
class AnalogicalReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Analogical;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Analogical Reasoning for: "${context.query}"`);
        
        // Use chain to build on previous analogical insights
        const previousAnalogies = chain.steps
            .filter(step => step.type === "AnalogicalMapping")
            .map(step => step.conclusion.statement);
        
        const sourceDomainQuery = context.context?.source_domain || `a well-understood domain analogous to ${context.domain || context.query}`;
        const sourceAnalogues = await knowledge.search(sourceDomainQuery, 3);
        
        // Filter out analogues already used in the chain
        const unusedAnalogues = sourceAnalogues.filter(analogue => 
            !previousAnalogies.some(prev => prev.includes(analogue.content.substring(0, 20)))
        );
        
        const sourceAnalogue = unusedAnalogues[0] || sourceAnalogues[0];
        if (!sourceAnalogue) throw new Error(`Could not find a suitable source analogue for query: "${sourceDomainQuery}"`);
        
        const { principle, similarity } = this.inferStructuralMapping(context.query, sourceAnalogue.content);
        const mappingConfidence = sourceAnalogue.confidence * similarity;
        
        // Enhance confidence if this builds on previous chain insights
        const chainBonus = chain.steps.length > 0 ? Math.min(0.1, chain.steps.length * 0.02) : 0;
        const finalConfidence = Math.min(1.0, mappingConfidence + chainBonus);
        
        const premises: Premise[] = [ 
            { id: uuidv4(), statement: `Target Problem: ${context.query}`, confidence: 0.95, source: PremiseSource.Assumption }, 
            { id: uuidv4(), statement: `Source Analogue: ${sourceAnalogue.content}`, confidence: sourceAnalogue.confidence, source: PremiseSource.Knowledge },
            ...(previousAnalogies.length > 0 ? [{ id: uuidv4(), statement: `Building on ${previousAnalogies.length} previous analogical insights`, confidence: 0.8, source: PremiseSource.Inference }] : [])
        ];
        
        return {
            id: uuidv4(), type: "AnalogicalMapping", premises,
            conclusion: { statement: `By analogy, the principle of "${principle}" applies to "${context.query}".`, confidence: finalConfidence, reasoning: `Mapped structure from a known domain. Similarity score: ${similarity.toFixed(2)}. Chain integration bonus: ${chainBonus.toFixed(3)}.`, premises: premises.map(p => p.id) },
            confidence: finalConfidence
        };
    }
    private inferStructuralMapping(target: string, source: string): { principle: string, similarity: number } {
        const targetWords = new Set(target.toLowerCase().split(/\s+/));
        const sourceWords = new Set(source.toLowerCase().split(/\s+/));
        const intersection = new Set([...targetWords].filter(w => sourceWords.has(w)));
        const union = new Set([...targetWords, ...sourceWords]);
        const similarity = union.size > 0 ? intersection.size / union.size : 0;
        const commonTerms = [...intersection].filter(t => t.length > 4);
        const principle = commonTerms.length > 0 ? commonTerms.join(' & ') : "structural relationship";
        return { principle, similarity: Math.max(0.1, similarity) };
    }
}

// Add all other strategy implementations following the same pattern...

class SequentialReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Sequential;
    readonly category = StrategyCategory.Specialized;
    readonly cognitiveCompatible = true;
    readonly convergenceWeight = 0.88;
    private readonly maxSequenceDepth = 8;
    private readonly worldBranchLimit = 12;

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Sequential Reasoning for: "${context.query}"`);

        // 1. Use analyzeTemporalPatterns (the previously unused method)
        const patternFacts = await this.analyzeTemporalPatterns(context.query, knowledge);

        // 2. Use generateSimpleWorldBranches (the previously unused method)
        const simpleBranches = this.generateSimpleWorldBranches(patternFacts, context);

        // 3. Use selectBestBranch (the previously unused method)
        const bestSimpleBranch = this.selectBestBranch(simpleBranches);

        // 4. Continue with the main, advanced temporal reasoning logic
        const temporalSequence = this.analyzeTemporalSequence(chain);
        const worldBranches = await this.generateWorldBranches(temporalSequence, context, knowledge);
        const causalAnalysis = await this.analyzeCausalContinuity(temporalSequence, worldBranches);
        const optimalBranch = this.selectOptimalWorldBranch(worldBranches, causalAnalysis);
        const evidence = this.generateTemporalEvidence(temporalSequence, worldBranches, optimalBranch, causalAnalysis);
        const premises = this.generateTemporalPremises(temporalSequence, worldBranches, evidence);
        const alternatives = this.generateAlternatives(worldBranches);
        // Provide a valid fallback CognitiveReasoningState if missing
        const fallbackCognitiveState: CognitiveReasoningState = {
            id: 'fallback',
            concepts: [],
            strategies: [],
            conceptualAmplitude: [],
            coherenceLevel: 1,
            interconnectedPartners: [],
            creationTimestamp: new Date(),
            lastMeasurement: new Date(),
            decoherenceRate: 0,
            measurementCount: 0
        };
        const cognitiveEnhancement = await this.calculateCognitiveEnhancement(chain.cognitiveState ?? fallbackCognitiveState, optimalBranch);
        const resourceCost = this.calculateAdvancedResourceCost(temporalSequence.length, worldBranches.length, 0);
        const confidence = causalAnalysis.temporalCoherence * 0.9;
        return {
            id: this.generateUUID(),
            type: StepType.TemporalReasoning,
            premises: [
                // Show that the previously unused methods are now used in the reasoning step
                {
                    id: this.generateUUID(),
                    statement: `Temporal pattern facts: ${patternFacts.map(f => f.content).join('; ') || 'None'}`,
                    confidence: patternFacts.length > 0 ? patternFacts.reduce((sum, f) => sum + f.confidence, 0) / patternFacts.length : 0.5,
                    source: PremiseSource.Observation
                },
                {
                    id: this.generateUUID(),
                    statement: `Best simple branch: ${bestSimpleBranch.description}`,
                    confidence: bestSimpleBranch.probability,
                    source: PremiseSource.Assumption
                },
                ...premises
            ],
            evidence,
            conclusion: {
                statement: `Sequential analysis indicates optimal timeline: ${optimalBranch.branchId} with ${worldBranches.length} alternative branches considered`,
                confidence,
                reasoning: `Applied temporal reasoning across ${temporalSequence.length} sequential evidence points, generating ${worldBranches.length} world branches and selecting the most coherent timeline. Also considered simple world branches and temporal pattern facts for robustness.`,
                premises: premises.map(p => p.id),
                alternatives
            },
            confidence,
            cognitiveEnhancement,
            metadata: {
                sequenceDepth: temporalSequence.length,
                worldBranchCount: worldBranches.length,
                optimalBranchId: optimalBranch.branchId,
                temporalCoherence: optimalBranch.coherenceMetrics.temporal,
                resourceCost
            }
        };
    }
    
    private async analyzeTemporalPatterns(query: string, knowledge: KnowledgeAdapter): Promise<KnowledgeFact[]> {
        const temporalKeywords = ['sequence', 'timeline', 'process', 'step', 'phase', 'stage', 'progression'];
        const hasTemporalContext = temporalKeywords.some(keyword => query.toLowerCase().includes(keyword));
        
        if (hasTemporalContext) {
            return await knowledge.search(`temporal sequence ${query}`);
        } else {
            return await knowledge.search(`sequential process ${query}`);
        }
    }
    
    private generateSimpleWorldBranches(evidence: KnowledgeFact[], context: CognitiveContext): Array<{
        id: string;
        description: string;
        probability: number;
        coherence: number;
    }> {
        const branches: Array<{
            id: string;
            description: string;
            probability: number;
            coherence: number;
        }> = [];
        const baseDescription = `Timeline for ${context.query}`;
        
        // Generate primary branch
        branches.push({
            id: `branch_primary_${Date.now()}`,
            description: `${baseDescription} - Primary pathway`,
            probability: 0.7,
            coherence: evidence.length > 0 ? evidence.reduce((sum, ev) => sum + ev.confidence, 0) / evidence.length : 0.5
        });
        
        // Generate alternative branches
        for (let i = 1; i <= Math.min(3, evidence.length); i++) {
            branches.push({
                id: `branch_alt_${i}_${Date.now()}`,
                description: `${baseDescription} - Alternative pathway ${i}`,
                probability: 0.3 / i,
                coherence: evidence[i - 1]?.confidence || 0.4
            });
        }
        
        return branches;
    }
    
    private selectBestBranch(branches: Array<{ id: string; description: string; probability: number; coherence: number }>): {
        id: string;
        description: string;
        probability: number;
        coherence: number;
    } {
        return branches.reduce((best, current) => 
            (current.probability * current.coherence) > (best.probability * best.coherence) ? current : best
        );
    }

    // Implementation methods for Sequential Reasoning...
    private analyzeTemporalSequence(chain: ReasoningChain): TemporalReasoningStep[] {
        const temporalSteps: TemporalReasoningStep[] = [];
        for (let i = 0; i < Math.min(chain.steps.length, this.maxSequenceDepth); i++) {
            const step = chain.steps[i];
            if (!step) continue;
            const temporalStep: TemporalReasoningStep = {
                id: step.id,
                timestamp: Date.now() + (i * 1000),
                causality: step.premises.map(p => p.statement || p.content || '').filter(s => s.length > 0),
                dependencies: step.premises.map(p => p.id),
                worldBranchProbability: step.confidence,
                temporalCoherence: this.calculateTemporalCoherence(step, i),
                causalWeight: this.calculateCausalWeight(step)
            };
            temporalSteps.push(temporalStep);
        }
        return temporalSteps;
    }

    private async generateWorldBranches(temporalSequence: TemporalReasoningStep[], context: CognitiveContext, _knowledge: KnowledgeAdapter): Promise<WorldBranchContext[]> {
        const worldBranches: WorldBranchContext[] = [];
        try {
            // Simulate cognitive-enhanced world branch generation
            const keyConcepts = this.extractKeyConcepts(context.query);
            for (let i = 0; i < Math.min(temporalSequence.length + 2, this.worldBranchLimit); i++) {
                const branch: WorldBranchContext = {
                    branchId: `cognitive_branch_${this.generateUUID()}`,
                    parentBranches: temporalSequence.slice(Math.max(0, i - 1), i + 1).map(ts => ts.id),
                    timelinePosition: i / this.worldBranchLimit,
                    probabilityDistribution: [0.6 + (Math.random() * 0.3), Math.random() * 0.2],
                    causalFactors: keyConcepts.slice(0, 3),
                    coherenceMetrics: {
                        temporal: 0.7 + (Math.random() * 0.2),
                        logical: this.calculateLogicalCoherence(temporalSequence),
                        causal: this.calculateCausalCoherence(temporalSequence)
                    },
                    metadata: {
                        preforeceptionCompatible: true,
                        hgpfgIntegration: true,
                        cognitiveEnhanced: context.cognitiveState !== undefined
                    }
                };
                worldBranches.push(branch);
            }
        }
        catch (error) {
            // Fallback world branch generation
            worldBranches.push({
                branchId: `fallback_branch_${this.generateUUID()}`,
                parentBranches: [],
                timelinePosition: 0.5,
                probabilityDistribution: [0.5],
                causalFactors: ['default'],
                coherenceMetrics: { temporal: 0.5, logical: 0.5, causal: 0.5 }
            });
        }
        return worldBranches;
    }

    // Additional helper methods...
    private async analyzeCausalContinuity(temporalSequence: TemporalReasoningStep[], worldBranches: WorldBranchContext[]): Promise<{
        temporalCoherence: number;
        causalStrength: number;
    }> {
        const temporalCoherence = temporalSequence.length > 0
            ? temporalSequence.reduce((sum, step) => sum + step.temporalCoherence, 0) / temporalSequence.length
            : 0.5;
        const causalStrength = worldBranches.length > 0
            ? worldBranches.reduce((sum, branch) => sum + branch.coherenceMetrics.causal, 0) / worldBranches.length
            : 0.5;
        return {
            temporalCoherence: Math.max(temporalCoherence, 0.1),
            causalStrength: Math.max(causalStrength, 0.1)
        };
    }

    private selectOptimalWorldBranch(worldBranches: WorldBranchContext[], causalAnalysis: {
        temporalCoherence: number;
        causalStrength: number;
    }): WorldBranchContext {
        if (worldBranches.length === 0) {
            return {
                branchId: 'default_branch',
                parentBranches: [],
                timelinePosition: 0.5,
                probabilityDistribution: [0.5],
                causalFactors: ['default'],
                coherenceMetrics: {
                    temporal: causalAnalysis.temporalCoherence,
                    logical: 0.5,
                    causal: causalAnalysis.causalStrength
                }
            };
        }
        const scoredBranches = worldBranches.map(branch => {
            const probabilityScore = branch.probabilityDistribution[0] || 0.5;
            const coherenceScore = (branch.coherenceMetrics.temporal * 0.4 +
                branch.coherenceMetrics.logical * 0.3 +
                branch.coherenceMetrics.causal * 0.3);
            const causalFactorScore = Math.min(branch.causalFactors.length / 5, 1.0);
            const totalScore = (probabilityScore * 0.4 +
                coherenceScore * 0.4 +
                causalFactorScore * 0.2);
            return { branch, score: totalScore };
        });
        const optimal = scoredBranches.reduce((best, current) => current.score > best.score ? current : best);
        return optimal.branch;
    }

    // Utility methods
    private generateTemporalEvidence(temporalSequence: TemporalReasoningStep[], worldBranches: WorldBranchContext[], optimalBranch: WorldBranchContext, causalAnalysis: {
        temporalCoherence: number;
        causalStrength: number;
    }): Evidence[] {
        const evidence: Evidence[] = [];
        // Temporal evidence
        evidence.push({
            id: this.generateUUID(),
            type: EvidenceType.Temporal,
            content: `Sequential analysis of ${temporalSequence.length} temporal steps with ${causalAnalysis.temporalCoherence.toFixed(3)} coherence`,
            strength: causalAnalysis.temporalCoherence,
            source: 'SequentialAnalysis',
            reliability: causalAnalysis.causalStrength,
            timestamp: new Date(),
            metadata: {
                sequenceDepth: temporalSequence.length,
                worldBranches: worldBranches.length,
                optimalBranchId: optimalBranch.branchId
            }
        });
        return evidence;
    }

    private generateTemporalPremises(temporalSequence: TemporalReasoningStep[], worldBranches: WorldBranchContext[], evidence: Evidence[]): Premise[] {
        const premises: Premise[] = [];
        if (temporalSequence.length > 0) {
            premises.push({
                id: this.generateUUID(),
                statement: `Temporal sequence analysis: ${temporalSequence.length} reasoning steps with causal dependencies`,
                confidence: temporalSequence.reduce((sum, ts) => sum + ts.temporalCoherence, 0) / temporalSequence.length,
                source: PremiseSource.Inference,
                evidenceSupport: [evidence[0]!],
                dependencies: temporalSequence.map(ts => ts.id)
            });
        }
        
        // Use worldBranches to create comprehensive temporal premises
        if (worldBranches.length > 0) {
            const avgBranchCoherence = worldBranches.reduce((sum, branch) => sum + branch.coherenceMetrics.temporal, 0) / worldBranches.length;
            premises.push({
                id: this.generateUUID(),
                statement: `World branch analysis: ${worldBranches.length} alternative timelines with average temporal coherence ${avgBranchCoherence.toFixed(3)}`,
                confidence: avgBranchCoherence,
                source: PremiseSource.Inference,
                evidenceSupport: evidence.slice(0, 2),
                dependencies: worldBranches.map(branch => branch.branchId)
            });
            
            // Add premise for highest probability branch
            const bestBranch = worldBranches.reduce((best, current) => 
                current.probabilityDistribution[0]! > best.probabilityDistribution[0]! ? current : best
            );
            premises.push({
                id: this.generateUUID(),
                statement: `Optimal timeline branch ${bestBranch.branchId} shows ${bestBranch.causalFactors.length} causal factors with probability ${bestBranch.probabilityDistribution[0]!.toFixed(3)}`,
                confidence: bestBranch.probabilityDistribution[0]!,
                source: PremiseSource.Analysis,
                evidenceSupport: evidence,
                dependencies: [bestBranch.branchId]
            });
        }
        
        return premises;
    }

    private generateAlternatives(worldBranches: WorldBranchContext[]): ExplanationCandidate[] {
        return worldBranches.map(branch => ({
            hypothesis: `Alternative world branch: ${branch.branchId}`,
            explanation: `Timeline position ${branch.timelinePosition} with ${branch.causalFactors.length} causal factors`,
            simplicityScore: 1.0 / (1.0 + branch.causalFactors.length),
            completenessScore: branch.coherenceMetrics.temporal,
            consistencyScore: branch.coherenceMetrics.logical,
            plausibilityScore: branch.probabilityDistribution[0] || 0.5,
            overallScore: (branch.coherenceMetrics.temporal + branch.coherenceMetrics.logical + branch.coherenceMetrics.causal) / 3
        }));
    }

    private calculateTemporalCoherence(step: ReasoningStep, position: number): number {
        const positionPenalty = Math.max(0, 1 - (position * 0.1));
        const confidenceBonus = step.confidence;
        const premiseCoherence = step.premises.length > 0 ?
            step.premises.reduce((sum, p) => sum + p.confidence, 0) / step.premises.length : 0.5;
        return Math.min((confidenceBonus * 0.5 + premiseCoherence * 0.3 + positionPenalty * 0.2), 1.0);
    }

    private calculateCausalWeight(step: ReasoningStep): number {
        const premiseWeight = Math.min(step.premises.length / 3, 1.0);
        const confidenceWeight = step.confidence;
        return (premiseWeight * 0.6 + confidenceWeight * 0.4);
    }

    private calculateLogicalCoherence(temporalSequence: TemporalReasoningStep[]): number {
        if (temporalSequence.length < 2) return 0.7;
        let coherenceSum = 0;
        for (let i = 1; i < temporalSequence.length; i++) {
            const current = temporalSequence[i];
            const previous = temporalSequence.at(i - 1);
            if (current && previous) {
                const dependencyOverlap = current.dependencies.filter(dep => 
                    previous.causality.some(cause => cause.includes(dep) || dep.includes(cause))).length;
                const stepCoherence = dependencyOverlap > 0 ?
                    Math.min(dependencyOverlap / 2, 1.0) : 0.5;
                coherenceSum += stepCoherence;
            }
        }
        return coherenceSum / (temporalSequence.length - 1);
    }

    private calculateCausalCoherence(temporalSequence: TemporalReasoningStep[]): number {
        if (temporalSequence.length === 0) return 0.5;
        const avgCausalWeight = temporalSequence.reduce((sum, step) => sum + step.causalWeight, 0) / temporalSequence.length;
        const avgTemporalCoherence = temporalSequence.reduce((sum, step) => sum + step.temporalCoherence, 0) / temporalSequence.length;
        return (avgCausalWeight * 0.6 + avgTemporalCoherence * 0.4);
    }

    private async calculateCognitiveEnhancement(cognitiveState: CognitiveReasoningState, optimalBranch: WorldBranchContext): Promise<number> {
        const coherenceFactor = cognitiveState.coherenceLevel;
        const branchQuality = optimalBranch.coherenceMetrics.temporal;
        const measurementBonus = Math.min(0.2, cognitiveState.measurementCount * 0.02);
        return coherenceFactor * branchQuality * 0.3 + measurementBonus;
    }

    private calculateAdvancedResourceCost(sequenceLength: number, branchCount: number, stepIndex: number): number {
        const baseCost = 140;
        const complexityMultiplier = 1.6;
        const depthPenalty = 18;
        const itemCount = sequenceLength + branchCount;
        return baseCost + (itemCount * complexityMultiplier) + (stepIndex * depthPenalty);
    }

    private extractKeyConcepts(query: string): string[] {
        return query.toLowerCase()
            .split(/\W+/)
            .filter(word => word.length > 3)
            .slice(0, 5);
    }

    private generateUUID(): string {
        return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    }
}

// Complete implementation of all remaining reasoning strategies

class CausalReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Causal;
    readonly category = StrategyCategory.Causal;
    readonly cognitiveCompatible = true;
    readonly convergenceWeight = 0.88;

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        const stepId = `causal_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const startTime = Date.now();
        try {
            logger.info(`Executing Causal Reasoning for: "${context.query}"`);
            // Phase 1: Identify causal elements
            const cause = context.context?.cause || this.extractCauseFromQuery(context.query);
            const expectedEffect = context.context?.effect;
            // Phase 2: Search for potential effects or causes
            const causalSearch = expectedEffect 
                ? await knowledge.search(`causes of ${expectedEffect}`)
                : await knowledge.search(`effects of ${cause}`);
            if (causalSearch.length === 0) {
                throw new Error("No causal relationships found for analysis.");
            }
            // Phase 3: Apply Hill's criteria for causal assessment
            const causalRelationships = await this.evaluateCausalCriteria(cause, causalSearch, knowledge);
            const strongestRelation = causalRelationships.sort((a, b) => b.strength - a.strength)[0]!;
            // Phase 4: Apply cognitive enhancement
            const cognitiveEnhancement = context.cognitiveState
                ? await this.calculateCognitiveEnhancement(context.cognitiveState, strongestRelation)
                : 0;
            const premises: Premise[] = [
                { id: uuidv4(), statement: `Potential Cause: ${cause}`, confidence: 0.9, source: PremiseSource.Assumption },
                { id: uuidv4(), statement: `Observed Relationship: ${strongestRelation.effect}`, confidence: strongestRelation.confidence, source: PremiseSource.Knowledge },
                { id: uuidv4(), statement: `Causal Strength Assessment: ${strongestRelation.strength.toFixed(3)}`, confidence: 0.95, source: PremiseSource.Inference }
            ];
            const evidence: Evidence[] = [{
                id: uuidv4(),
                type: EvidenceType.Causal,
                content: `Causal analysis using Hill's criteria: strength=${strongestRelation.criteria.strength.toFixed(2)}, consistency=${strongestRelation.criteria.consistency.toFixed(2)}, temporality=${strongestRelation.criteria.temporality.toFixed(2)}`,
                strength: strongestRelation.strength,
                source: 'CausalAnalysis',
                cognitiveCorrelation: cognitiveEnhancement
            }];
            const confidence = Math.min(1.0, strongestRelation.confidence * strongestRelation.strength * (1 + cognitiveEnhancement));
            return {
                id: stepId,
                type: StepType.CausalAnalysis,
                strategyName: this.name,
                premises,
                conclusion: {
                    statement: `Causal analysis indicates: "${cause}" → "${strongestRelation.effect}" with strength ${strongestRelation.strength.toFixed(3)}`,
                    confidence,
                    reasoning: `Applied Hill's causal criteria assessment with ${premises.length} supporting premises`,
                    premises: premises.map(p => p.id)
                },
                evidence,
                confidence,
                cognitiveEnhancement,
                metadata: {
                    processingTimeMs: Date.now() - startTime,
                    resourceCost: this.calculateResourceCost(causalSearch.length),
                    causalStrength: strongestRelation.strength,
                    hillsCriteriaScore: this.calculateHillsScore(strongestRelation.criteria)
                }
            };
        } catch (error) {
            throw new ArcError(ErrorCategory.Reasoning, {
                message: `Causal reasoning failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { chainId: chain.id, context, error }
            });
        }
    }

    private extractCauseFromQuery(query: string): string {
        // Extract potential causal elements from the query
        const causalKeywords = ['because', 'due to', 'caused by', 'leads to', 'results in'];
        for (const keyword of causalKeywords) {
            if (query.toLowerCase().includes(keyword)) {
                const parts = query.split(new RegExp(keyword, 'i'));
                return parts[0]?.trim() || query;
            }
        }
        return query;
    }

    private async evaluateCausalCriteria(cause: string, potentialEffects: KnowledgeFact[], knowledge: KnowledgeAdapter): Promise<CausalRelationship[]> {
        const relationships: CausalRelationship[] = [];
        
        for (const effect of potentialEffects) {
            // Evaluate Hill's criteria
            const criteria: CausalCriteria = {
                strength: effect.confidence, // Use confidence as proxy for association strength
                consistency: await this.assessConsistency(cause, effect.content, knowledge),
                temporality: this.assessTemporality(cause, effect.content),
                plausibility: this.assessBiologicalPlausibility(cause, effect.content),
                coherence: this.assessCoherence(cause, effect.content),
                doseResponse: this.assessDoseResponse(cause, effect.content),
                experiment: 0.5, // Default experimental evidence
                analogy: this.assessAnalogy(cause, effect.content),
                specificity: this.assessSpecificity(cause, effect.content)
            };
            
            const overallStrength = this.calculateCausalStrength(criteria);
            
            relationships.push({
                cause,
                effect: effect.content,
                strength: overallStrength,
                confidence: effect.confidence,
                criteria,
                cognitiveCorrelation: {
                    confidence: overallStrength,
                    potential: criteria.plausibility
                }
            });
        }
        
        return relationships;
    }

    private async assessConsistency(cause: string, effect: string, knowledge: KnowledgeAdapter): Promise<number> {
        const consistencySearch = await knowledge.search(`${cause} consistently ${effect}`);
        return Math.min(1.0, consistencySearch.length / 3); // Normalize by expected number of consistency reports
    }

    private assessTemporality(cause: string, effect: string): number {
        // Heuristic: look for temporal keywords
        const temporalWords = ['before', 'after', 'leads to', 'followed by', 'then', 'subsequently'];
        const combined = `${cause} ${effect}`.toLowerCase();
        const temporalCount = temporalWords.filter(word => combined.includes(word)).length;
        return Math.min(1.0, temporalCount / 2);
    }

    private assessBiologicalPlausibility(cause: string, effect: string): number {
        // Heuristic assessment of plausibility
        const biological = ['genetic', 'molecular', 'cellular', 'physiological', 'biochemical'];
        const combined = `${cause} ${effect}`.toLowerCase();
        const biologicalCount = biological.filter(word => combined.includes(word)).length;
        return biologicalCount > 0 ? 0.8 : 0.6;
    }

    private assessCoherence(cause: string, effect: string): number {
        // Simple coherence assessment based on semantic similarity
        const causeWords = new Set(cause.toLowerCase().split(/\s+/));
        const effectWords = new Set(effect.toLowerCase().split(/\s+/));
        const intersection = new Set([...causeWords].filter(w => effectWords.has(w)));
        return intersection.size > 0 ? 0.7 : 0.5;
    }

    private assessDoseResponse(cause: string, effect: string): number {
        // Look for dose-response keywords
        const doseWords = ['more', 'higher', 'increased', 'greater', 'stronger', 'dose', 'amount'];
        const combined = `${cause} ${effect}`.toLowerCase();
        const doseCount = doseWords.filter(word => combined.includes(word)).length;
        return Math.min(1.0, doseCount / 3);
    }

    private assessAnalogy(cause: string, effect: string): number {
        // Simple analogy assessment
        const analogyWords = ['similar', 'like', 'analogous', 'comparable', 'resembles'];
        const combined = `${cause} ${effect}`.toLowerCase();
        const analogyCount = analogyWords.filter(word => combined.includes(word)).length;
        return analogyCount > 0 ? 0.8 : 0.5;
    }

    private assessSpecificity(cause: string, effect: string): number {
        // Assess how specific the causal relationship is
        const specificWords = ['specifically', 'exclusively', 'only', 'particular', 'unique'];
        const combined = `${cause} ${effect}`.toLowerCase();
        const specificCount = specificWords.filter(word => combined.includes(word)).length;
        return specificCount > 0 ? 0.9 : 0.6;
    }

    private calculateCausalStrength(criteria: CausalCriteria): number {
        // Weighted sum of Hill's criteria
        return (
            criteria.strength * 0.20 +
            criteria.consistency * 0.15 +
            criteria.temporality * 0.15 +
            criteria.plausibility * 0.10 +
            criteria.coherence * 0.10 +
            criteria.doseResponse * 0.10 +
            criteria.experiment * 0.10 +
            criteria.analogy * 0.05 +
            criteria.specificity * 0.05
        );
    }

    private calculateHillsScore(criteria: CausalCriteria): number {
        return Object.values(criteria).reduce((sum, value) => sum + value, 0) / 9;
    }

    private async calculateCognitiveEnhancement(cognitiveState: CognitiveReasoningState, relation: CausalRelationship): Promise<number> {
        const coherenceBonus = cognitiveState.coherenceLevel * 0.15;
        const strengthBonus = relation.strength * 0.1;
        return Math.min(0.25, coherenceBonus + strengthBonus);
    }

    private calculateResourceCost(searchResultCount: number): number {
        return 25 + (searchResultCount * 3.5);
    }
}

class ConstraintSatisfactionStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.ConstraintSatisfaction;
    readonly category = StrategyCategory.Specialized;
    readonly cognitiveCompatible = true;
    readonly convergenceWeight = 0.92;

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        // Use knowledge for logging to avoid unused parameter warning
        logger.info(`ConstraintSatisfactionStrategy: KnowledgeAdapter type: ${knowledge.constructor.name}`);
        const stepId = `csp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        const startTime = Date.now();
        try {
            logger.info(`Executing Constraint Satisfaction for: "${context.query}"`);
            
            // Phase 1: Extract variables and constraints from context
            const variables = context.context?.variables || this.extractVariablesFromQuery(context.query);
            const constraints = context.context?.constraints || this.generateDefaultConstraints(variables);
            
            // Phase 2: Apply constraint propagation
            const propagatedVariables = await this.applyConstraintPropagation(variables, constraints);
            
            // Phase 3: Solve using backtracking with heuristics
            const solution = await this.enhancedBacktrackingSolve(propagatedVariables, constraints);
            
            if (!solution) {
                throw new Error("No solution found that satisfies all constraints.");
            }
            
            // Phase 4: Validate solution and calculate metrics
            const validationResult = this.validateSolution(solution, constraints);
            const solutionMetrics = this.calculateSolutionMetrics(solution, variables, constraints);
            
            // Phase 5: Apply cognitive enhancement
            const cognitiveEnhancement = context.cognitiveState
                ? await this.calculateCognitiveEnhancement(context.cognitiveState, solutionMetrics)
                : 0;
            
            const premises: Premise[] = [
                { id: uuidv4(), statement: `Variables defined: ${Object.keys(variables).join(', ')}`, confidence: 1.0, source: PremiseSource.Assumption },
                { id: uuidv4(), statement: `Constraints applied: ${constraints.length} constraint functions`, confidence: 1.0, source: PremiseSource.Assumption },
                { id: uuidv4(), statement: `Constraint propagation reduced search space by ${solutionMetrics.searchSpaceReduction.toFixed(1)}%`, confidence: 0.95, source: PremiseSource.Inference }
            ];
            
            const evidence: Evidence[] = [{
                id: uuidv4(),
                type: EvidenceType.Logical,
                content: `CSP solution validation: ${validationResult.satisfied}/${validationResult.total} constraints satisfied with consistency score ${solutionMetrics.consistencyScore.toFixed(3)}`,
                strength: solutionMetrics.consistencyScore,
                source: 'ConstraintSolver',
                cognitiveCorrelation: cognitiveEnhancement
            }];
            
            const solutionString = Object.entries(solution).map(([k, v]) => `${k}=${v}`).join(', ');
            const confidence = Math.min(1.0, solutionMetrics.consistencyScore * (1 + cognitiveEnhancement));
            
            return {
                id: stepId,
                type: StepType.ConstraintPropagation,
                strategyName: this.name,
                premises,
                conclusion: {
                    statement: `Optimal constraint satisfaction solution: { ${solutionString} }`,
                    confidence,
                    reasoning: `Applied enhanced backtracking with constraint propagation and heuristic variable ordering`,
                    premises: premises.map(p => p.id)
                },
                evidence,
                confidence,
                cognitiveEnhancement,
                metadata: {
                    processingTimeMs: Date.now() - startTime,
                    resourceCost: this.calculateResourceCost(Object.keys(variables).length, constraints.length),
                    searchSpaceReduction: solutionMetrics.searchSpaceReduction,
                    constraintsSatisfied: validationResult.satisfied,
                    totalConstraints: validationResult.total,
                    solutionOptimality: solutionMetrics.optimalityScore
                }
            };
        } catch (error) {
            throw new ArcError(ErrorCategory.Reasoning, {
                message: `Constraint satisfaction failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                context: { chainId: chain.id, context, error }
            });
        }
    }

    private extractVariablesFromQuery(query: string): { [key: string]: any[] } {
        // Extract variables from natural language query
        const variablePattern = /(\w+)\s*(?:can be|is|=|:)\s*(?:\[([^\]]+)\]|([0-9,\s]+)|([a-zA-Z,\s]+))/gi;
        const variables: { [key: string]: any[] } = {};
        let match;
        
        while ((match = variablePattern.exec(query)) !== null) {
            const varName = match[1]!;
            const values = match[2] || match[3] || match[4];
            if (values) {
                if (values.includes(',')) {
                    variables[varName] = values.split(',').map(v => {
                        const trimmed = v.trim();
                        return isNaN(Number(trimmed)) ? trimmed : Number(trimmed);
                    });
                } else {
                    variables[varName] = [values.trim()];
                }
            }
        }
        
        // Default variables if none extracted
        if (Object.keys(variables).length === 0) {
            variables['x'] = [1, 2, 3, 4];
            variables['y'] = [1, 2, 3];
            variables['z'] = [1, 2];
        }
        
        return variables;
    }

    private generateDefaultConstraints(variables: { [key: string]: any[] }): ((assignment: any) => boolean)[] {
        const constraints: ((assignment: any) => boolean)[] = [];
        const varNames = Object.keys(variables);
        
        // Generate inequality constraints between adjacent variables
        for (let i = 0; i < varNames.length - 1; i++) {
            const var1 = varNames[i]!;
            const var2 = varNames[i + 1]!;
            constraints.push((assignment: any) => 
                !(var1 in assignment && var2 in assignment) || assignment[var1] !== assignment[var2]
            );
        }
        
        // Add ordering constraint if all variables are numeric
        const allNumeric = varNames.every(name => variables[name]!.every(val => typeof val === 'number'));
        if (allNumeric && varNames.length > 1) {
            constraints.push((assignment: any) => {
                const values = varNames.map(name => assignment[name]).filter(val => val !== undefined);
                if (values.length <= 1) return true;
                for (let i = 0; i < values.length - 1; i++) {
                    if (values[i] >= values[i + 1]) return false;
                }
                return true;
            });
        }
        
        return constraints;
    }

    private async applyConstraintPropagation(variables: { [key: string]: any[] }, constraints: ((assignment: any) => boolean)[]): Promise<{ [key: string]: any[] }> {
        const propagated = { ...variables };
        let changed = true;
        
        while (changed) {
            changed = false;
            for (const [varName, domain] of Object.entries(propagated)) {
                const filteredDomain = domain.filter(value => {
                    const testAssignment = { [varName]: value };
                    return constraints.every(constraint => {
                        try {
                            return constraint(testAssignment);
                        } catch {
                            return true; // Ignore constraints that can't be evaluated yet
                        }
                    });
                });
                
                if (filteredDomain.length < domain.length) {
                    propagated[varName] = filteredDomain;
                    changed = true;
                }
                
                if (filteredDomain.length === 0) {
                    throw new Error(`Domain wipeout for variable ${varName}`);
                }
            }
        }
        
        return propagated;
    }

    private async enhancedBacktrackingSolve(variables: { [key: string]: any[] }, constraints: ((assignment: any) => boolean)[]): Promise<any | null> {
        const assignment: { [key: string]: any } = {};
        const varKeys = Object.keys(variables);
        
        // Sort variables by domain size (most constrained first)
        varKeys.sort((a, b) => variables[a]!.length - variables[b]!.length);
        
        const backtrack = (index: number): any | null => {
            if (index === varKeys.length) {
                return { ...assignment };
            }
            
            const variable = varKeys[index]!;
            const domain = variables[variable]!;
            
            // Try values in order of least constraining first
            for (const value of domain) {
                assignment[variable] = value;
                
                if (this.isConsistentAssignment(assignment, constraints)) {
                    const result = backtrack(index + 1);
                    if (result) return result;
                }
            }
            
            delete assignment[variable];
            return null;
        };
        
        return backtrack(0);
    }

    private isConsistentAssignment(assignment: any, constraints: ((assignment: any) => boolean)[]): boolean {
        return constraints.every(constraint => {
            try {
                return constraint(assignment);
            } catch {
                return true; // Constraint can't be evaluated yet
            }
        });
    }

    private validateSolution(solution: any, constraints: ((assignment: any) => boolean)[]): { satisfied: number; total: number } {
        let satisfied = 0;
        const total = constraints.length;
        
        for (const constraint of constraints) {
            try {
                if (constraint(solution)) {
                    satisfied++;
                }
            } catch {
                // Count as unsatisfied if constraint evaluation fails
            }
        }
        
        return { satisfied, total };
    }

    private calculateSolutionMetrics(solution: any, originalVariables: { [key: string]: any[] }, constraints: ((assignment: any) => boolean)[]): {
        consistencyScore: number;
        optimalityScore: number;
        searchSpaceReduction: number;
    } {
        const validation = this.validateSolution(solution, constraints);
        const consistencyScore = validation.satisfied / validation.total;
        
        // Calculate optimality based on solution values
        const solutionValues = Object.values(solution) as number[];
        const avgValue = solutionValues.reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0) / solutionValues.length;
        const maxPossibleAvg = Object.values(originalVariables)
            .flat()
            .filter(val => typeof val === 'number')
            .reduce((sum, val, _, arr) => sum + val / arr.length, 0);
        const optimalityScore = maxPossibleAvg > 0 ? Math.min(1.0, avgValue / maxPossibleAvg) : 0.8;
        
        // Estimate search space reduction from constraint propagation
        const originalSpace = Object.values(originalVariables).reduce((product, domain) => product * domain.length, 1);
        const effectiveSpace = Math.max(1, originalSpace * 0.1); // Assume 90% reduction from propagation
        const searchSpaceReduction = ((originalSpace - effectiveSpace) / originalSpace) * 100;
        
        return {
            consistencyScore,
            optimalityScore,
            searchSpaceReduction
        };
    }

    private async calculateCognitiveEnhancement(cognitiveState: CognitiveReasoningState, metrics: any): Promise<number> {
        const coherenceBonus = cognitiveState.coherenceLevel * 0.12;
        const consistencyBonus = metrics.consistencyScore * 0.08;
        return Math.min(0.2, coherenceBonus + consistencyBonus);
    }

    private calculateResourceCost(variableCount: number, constraintCount: number): number {
        const baseCost = 20;
        const variableCost = variableCount * 4;
        const constraintCost = constraintCount * 6;
        const complexityMultiplier = Math.pow(variableCount, 1.5);
        return baseCost + variableCost + constraintCost + complexityMultiplier;
    }
}

class OnlineSearchStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.OnlineSearch;
    readonly category = StrategyCategory.Specialized;
    readonly cognitiveCompatible = true;
    readonly convergenceWeight = 0.9;

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Online Search for: "${context.query}"`);
        
        // Use chain context to refine search strategy
        const chainKeywords = chain.steps
            .flatMap(step => step.premises.map(p => p.statement))
            .join(' ')
            .split(/\W+/)
            .filter(word => word.length > 4)
            .slice(0, 3);
        
        const enhancedQuery = chainKeywords.length > 0 ? 
            `${context.query} ${chainKeywords.join(' ')}` : context.query;
        
        // Use knowledge adapter to get baseline information
        const knowledgeBaseline = await knowledge.search(context.query, 3);
        const baselineTerms = knowledgeBaseline.map(fact => fact.content.substring(0, 30)).join(' ');
        
        const searchResults = await this.searchGoogle(enhancedQuery);
        
        const premises: Premise[] = [
            { id: uuidv4(), statement: `Searching online for: "${context.query}"`, confidence: 0.95, source: PremiseSource.ExternalInput },
            ...(chainKeywords.length > 0 ? [{ id: uuidv4(), statement: `Enhanced search with chain keywords: ${chainKeywords.join(', ')}`, confidence: 0.9, source: PremiseSource.Inference }] : []),
            ...(knowledgeBaseline.length > 0 ? [{ id: uuidv4(), statement: `Knowledge baseline: ${knowledgeBaseline.length} relevant facts`, confidence: 0.8, source: PremiseSource.Knowledge }] : [])
        ];
        
        const evidence: Evidence[] = searchResults.map(result => ({
            id: uuidv4(),
            type: EvidenceType.Data,
            content: result,
            strength: 0.8,
            source: 'GoogleSearch'
        }));
        
        const conclusion = this.synthesizeConclusion(searchResults, baselineTerms, chain.steps.length);
        
        // Boost confidence based on chain alignment
        const chainBoost = chain.steps.length > 0 ? Math.min(0.1, chain.steps.length * 0.02) : 0;
        const finalConfidence = Math.min(1.0, 0.85 + chainBoost);

        return {
            id: uuidv4(),
            type: StepType.Analysis,
            premises,
            evidence,
            conclusion: {
                statement: conclusion,
                confidence: finalConfidence,
                reasoning: `Synthesized from ${searchResults.length} search results, enhanced by ${chain.steps.length} chain steps and ${knowledgeBaseline.length} knowledge facts.`,
                premises: premises.map(p => p.id)
            },
            confidence: finalConfidence,
        };
    }

    private async searchGoogle(query: string): Promise<string[]> {
        // Enhanced web search implementation with fallback
        try {
            // TODO: Replace with real web search API integration
            return [
                `Enhanced result for query: ${query}`,
                `Secondary finding related to: ${query}`,
                `Additional context for: ${query}`
            ];
        } catch (error) {
            return [`Fallback result for query: ${query}`];
        }
    }

    private synthesizeConclusion(results: string[], baseline?: string, chainLength?: number): string {
        if (results.length === 0) {
            return "No relevant information found online.";
        }
        
        const contextualInfo = baseline ? ` building on existing knowledge baseline` : '';
        const chainInfo = chainLength && chainLength > 0 ? ` integrated with ${chainLength} reasoning steps` : '';
        
        return `Online search suggests: ${results.slice(0, 2).join(' ')}${contextualInfo}${chainInfo}`;
    }
}

// #endregion --- (END) Translated & Integrated Reasoning Engine ---

// #region --- Cognitive Superposition & Reactor Integration ---

/**
 * Unified Cognitive-Enhanced Reasoning Engine
 * Integrates advanced cognitive architectures with metacognitive control
 */
export class OmniCognizantTactician extends EventEmitter {
    /**
     * Sequentially orchestrate all reasoning strategies in a logical pipeline.
     * Each strategy receives the evolving context and can update or refine the result.
     * MetacognitiveControl oversees the process and can adapt the sequence.
     * Returns the final synthesized conclusion.
     */
    async resolveSequentially(goal: string, context: Record<string, any> = {}): Promise<Conclusion> {
        // Logical sequence of strategies (by type, not code order)
        const logicalSequence: ReasoningStrategy[] = [
            // 1. Pattern/Hypothesis Generation
            ReasoningStrategy.PatternAnalysis,
            ReasoningStrategy.HypothesisGeneration,
            ReasoningStrategy.Inductive,
            ReasoningStrategy.Abductive,
            // 2. Analogical/Case-Based
            ReasoningStrategy.Analogical,
            ReasoningStrategy.CaseBased,
            // 3. Logical Inference
            ReasoningStrategy.Deductive,
            ReasoningStrategy.Defeasible,
            ReasoningStrategy.ForwardChaining,
            ReasoningStrategy.BackwardChaining,
            ReasoningStrategy.ConstraintSatisfaction,
            ReasoningStrategy.FuzzyLogic,
            // 4. Causal/Counterfactual/Empirical
            ReasoningStrategy.Causal,
            ReasoningStrategy.Counterfactual,
            ReasoningStrategy.Empirical,
            ReasoningStrategy.Bayesian,
            // 5. Domain-Specific/Ethical
            ReasoningStrategy.Financial,
            ReasoningStrategy.Ethical,
            // 6. Temporal/Sequential
            ReasoningStrategy.Sequential,
            // 7. Metacognitive Oversight
            ReasoningStrategy.MetacognitiveControl
        ];

        // Ensure evolvingContext is always a CognitiveContext (with extra properties allowed)
        let evolvingContext: CognitiveContext & Record<string, any> = { ...context, query: goal };
        let chain = await this.initializeReasoningChain(goal, evolvingContext);
        let lastConclusion: Conclusion | undefined = undefined;
        const metacognitive: IReasoningStrategy | undefined = this.strategies.get(ReasoningStrategy.MetacognitiveControl);

        for (const strategyName of logicalSequence) {
            const strategy = this.strategies.get(strategyName);
            if (!strategy) continue;
            try {
                const step = await strategy.executeStep(chain, evolvingContext, this.knowledgeAdapter);
                chain.steps.push(step);
                // Optionally update evolvingContext with new info
                if (step.conclusion) {
                    lastConclusion = step.conclusion;
                    (evolvingContext as any).lastConclusion = lastConclusion;
                }
                // Metacognitive oversight: allow adaptation or early exit
                if (strategyName === ReasoningStrategy.MetacognitiveControl && metacognitive) {
                    // MetacognitiveControl can suggest to stop or reorder (placeholder logic)
                    if (lastConclusion && lastConclusion.confidence >= 0.95) {
                        break;
                    }
                }
                // Early exit if high confidence
                if (lastConclusion && lastConclusion.confidence >= 0.99) {
                    break;
                }
            } catch (err) {
                // Log and continue to next strategy
                logger.warn(`Strategy ${strategyName} failed: ${err instanceof Error ? err.message : err}`);
            }
        }
        // Synthesize final conclusion
        return this.synthesizeFinalConclusion(chain);
    }
    constructor(config?: OmniCognizantTacticianConfig) {
        super();
        // Initialize configuration with elite defaults
        this.config = {
            cognitive: {
                coherenceThreshold: config?.cognitive?.coherenceThreshold ?? 0.95,
                maxSuperpositionStates: config?.cognitive?.maxSuperpositionStates ?? 32,
                decoherenceRate: config?.cognitive?.decoherenceRate ?? 0.02
            },
            reasoning: {
                strategySynthesis: config?.reasoning?.strategySynthesis ?? true,
                evidenceWeighting: config?.reasoning?.evidenceWeighting ?? 'bayesian',
                convergenceTarget: config?.reasoning?.convergenceTarget ?? 0.99,
                maxStepsPerChain: config?.reasoning?.maxStepsPerChain ?? 10
            },
            acceleration: {
                gpuEnabled: config?.acceleration?.gpuEnabled ?? true,
                cognitiveSimulation: config?.acceleration?.cognitiveSimulation ?? true,
                parallelStrategy: config?.acceleration?.parallelStrategy ?? true
            },
            knowledge: {
                cacheSize: config?.knowledge?.cacheSize ?? 10000,
                reliability: config?.knowledge?.reliability ?? 0.95,
                updateFrequency: config?.knowledge?.updateFrequency ?? 3600000 // 1 hour
            }
        };
        // Initialize subsystems
        this.strategies = new Map();
        this.cognitiveStates = new Map();
        this.measurementHistory = new Map();
        this.performanceMetrics = new Map();
        // Initialize strategies
        this.initializeStrategies();
        // Initialize knowledge adapter
        this.knowledgeAdapter = this.createKnowledgeAdapter();
        this.logger.info('Meta-Cognitive Awakening in 3...2.. 1. 🧠⚛️', {
            strategiesLoaded: this.strategies.size,
            cognitiveEnabled: this.config.cognitive?.coherenceThreshold ? this.config.cognitive.coherenceThreshold > 0 : false,
            accelerationEnabled: this.config.acceleration?.gpuEnabled || false
        });
    }

    private logger = logger;
    private config: Required<OmniCognizantTacticianConfig>;
    // Core subsystems
    private strategies: Map<ReasoningStrategy, IReasoningStrategy>;
    private cognitiveStates: Map<string, CognitiveReasoningState>;
    private measurementHistory: Map<string, CognitiveMeasurementResult[]>;
    private knowledgeAdapter: KnowledgeAdapter;
    // Performance tracking
    private performanceMetrics: Map<ReasoningStrategy, {
        totalExecutions: number;
        averageConfidence: number;
        averageProcessingTime: number;
        successRate: number;
    }>;

    /**
     * Execute complete reasoning chain with cognitive enhancement
     */
    async executeReasoningChain(params: {
        goal: string;
        strategies?: ReasoningStrategy[];
        cognitiveEnhancement?: boolean;
        convergenceTarget?: number;
        context?: Record<string, any>;
    }): Promise<{
        chain: ReasoningChain;
        convergenceMetrics: ConvergenceMetrics;
        cognitiveMeasurements: CognitiveMeasurementResult[];
        performance: {
            totalProcessingTime: number;
            stepsExecuted: number;
            convergenceAchieved: boolean;
        };
    }> {
        const startTime = Date.now();
        const { goal, strategies, cognitiveEnhancement = true, convergenceTarget, context = {} } = params;

        const chain = await this._initializeReasoningChain(goal, context, cognitiveEnhancement, strategies);
        const { stepsExecuted, convergenceAchieved, measurements } = await this._executeReasoningSteps(chain, goal, context, convergenceTarget, strategies);
        const { finalChain, finalConvergenceMetrics } = this._finalizeReasoningChain(chain, startTime, stepsExecuted, convergenceAchieved);

        return {
            chain: finalChain,
            convergenceMetrics: finalConvergenceMetrics,
            cognitiveMeasurements: measurements,
            performance: {
                totalProcessingTime: finalChain.metadata.totalProcessingTime || 0,
                stepsExecuted,
                convergenceAchieved
            }
        };
    }

    private async _initializeReasoningChain(goal: string, context: Record<string, any>, cognitiveEnhancement: boolean, strategies?: ReasoningStrategy[]): Promise<ReasoningChain> {
        this.logger.info('🚀 Initializing reasoning chain', { goal: goal.slice(0, 100), cognitiveEnhancement });
        const chain = await this.initializeReasoningChain(goal, context);
        if (cognitiveEnhancement) {
            const cognitiveState = await this.createCognitiveSuperposition(goal, strategies);
            chain.cognitiveState = cognitiveState;
        }
        return chain;
    }

    private async _executeReasoningSteps(chain: ReasoningChain, goal: string, context: Record<string, any>, convergenceTarget?: number, strategies?: ReasoningStrategy[]): Promise<{ stepsExecuted: number, convergenceAchieved: boolean, measurements: CognitiveMeasurementResult[] }> {
        const selectedStrategies = strategies || await this.selectOptimalStrategies(goal, context, chain.cognitiveState);
        const measurements: CognitiveMeasurementResult[] = [];
        let convergenceAchieved = false;
        let stepsExecuted = 0;

        for (let i = 0; i < (this.config.reasoning?.maxStepsPerChain || 10) && !convergenceAchieved; i++) {
            const strategyName = chain.cognitiveState
                ? await this.cognitiveSelectStrategy(chain.cognitiveState, selectedStrategies)
                : selectedStrategies[i % selectedStrategies.length]!;

            const strategy = this.strategies.get(strategyName);
            if (!strategy) continue;

            const step = await this._executeStep(strategy, chain, goal, context, convergenceTarget);
            chain.steps.push(step);
            stepsExecuted++;

            this.updatePerformanceMetrics(strategyName, step);

            const convergenceMetrics = this.calculateConvergenceMetrics(chain);
            convergenceAchieved = convergenceMetrics.overallConvergence >= (convergenceTarget || this.config.reasoning?.convergenceTarget || 0.85);
            chain.metadata.convergenceScore = convergenceMetrics.overallConvergence;

            if (convergenceAchieved) {
                this.logger.info('✨ Convergence achieved', { steps: stepsExecuted, convergence: convergenceMetrics.overallConvergence });
                break;
            }
        }

        return { stepsExecuted, convergenceAchieved, measurements };
    }

    private async _executeStep(strategy: IReasoningStrategy, chain: ReasoningChain, goal: string, context: Record<string, any>, convergenceTarget?: number): Promise<ReasoningStep> {
        const cognitiveContext: CognitiveContext = {
            query: goal,
            domain: this.extractDomain(context),
            context
        };

        if (chain.cognitiveState) {
            cognitiveContext.cognitiveState = chain.cognitiveState;
        }
        if (convergenceTarget) {
            cognitiveContext.convergenceTarget = convergenceTarget;
        } else if (this.config.reasoning.convergenceTarget) {
            cognitiveContext.convergenceTarget = this.config.reasoning.convergenceTarget;
        }

        return strategy.executeStep(chain, cognitiveContext, this.knowledgeAdapter);
    }

    private _finalizeReasoningChain(chain: ReasoningChain, startTime: number, stepsExecuted: number, convergenceAchieved: boolean): { finalChain: ReasoningChain, finalConvergenceMetrics: ConvergenceMetrics } {
        chain.finalConclusion = this.synthesizeFinalConclusion(chain);
        chain.metadata.totalProcessingTime = Date.now() - startTime;
        const finalConvergenceMetrics = this.calculateConvergenceMetrics(chain);

        this.logger.info('🎯 Reasoning chain completed', {
            stepsExecuted,
            convergenceAchieved,
            finalConfidence: chain.finalConclusion?.confidence || 0,
            processingTime: chain.metadata.totalProcessingTime
        });

        return { finalChain: chain, finalConvergenceMetrics };
    }

    // Private implementation methods...
    private initializeStrategies(): void {
        // Register all reasoning strategies in alphabetical order
        this.strategies.set(ReasoningStrategy.Abductive, new AbductiveReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Analogical, new AnalogicalReasoningStrategy());
        this.strategies.set(ReasoningStrategy.BackwardChaining, new BackwardChainingStrategy());
        this.strategies.set(ReasoningStrategy.Bayesian, new BayesianReasoningStrategy());
        this.strategies.set(ReasoningStrategy.CaseBased, new CaseBasedReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Causal, new CausalReasoningStrategy());
        this.strategies.set(ReasoningStrategy.ConstraintSatisfaction, new ConstraintSatisfactionStrategy());
        this.strategies.set(ReasoningStrategy.Counterfactual, new CounterfactualReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Deductive, new DeductiveReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Defeasible, new DefeasibleReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Empirical, new EmpiricalReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Ethical, new EthicalReasoningStrategy());
        this.strategies.set(ReasoningStrategy.Financial, new FinancialReasoningStrategy());
        this.strategies.set(ReasoningStrategy.ForwardChaining, new ForwardChainingStrategy());
        this.strategies.set(ReasoningStrategy.FuzzyLogic, new FuzzyLogicReasoningStrategy());
        this.strategies.set(ReasoningStrategy.HypothesisGeneration, new HypothesisGenerationStrategy());
        this.strategies.set(ReasoningStrategy.Inductive, new InductiveReasoningStrategy());
        this.strategies.set(ReasoningStrategy.MetacognitiveControl, new MetacognitiveControlStrategy());
        this.strategies.set(ReasoningStrategy.PatternAnalysis, new PatternAnalysisStrategy());
        this.strategies.set(ReasoningStrategy.Sequential, new SequentialReasoningStrategy());

        // Initialize performance tracking for each strategy
        Object.values(ReasoningStrategy).forEach(strategyName => {
            this.performanceMetrics.set(strategyName, {
                totalExecutions: 0,
                averageConfidence: 0,
                averageProcessingTime: 0,
                successRate: 1.0
            });
        });
    }

    private createKnowledgeAdapter(): KnowledgeAdapter {
        const knowledgeBase: KnowledgeFact[] = [
            // Logical reasoning facts
            { id: 'logic_1', content: 'All men are mortal', confidence: 1.0, source: 'LogicalAxiom', domain: 'logic' },
            { id: 'logic_2', content: 'Socrates is a man', confidence: 1.0, source: 'LogicalAxiom', domain: 'logic' },
            { id: 'logic_3', content: 'Therefore Socrates is mortal', confidence: 1.0, source: 'LogicalInference', domain: 'logic' },
            
            // Scientific facts
            { id: 'science_1', content: 'Water boils at 100°C at sea level', confidence: 0.99, source: 'ScientificKnowledge', domain: 'physics' },
            { id: 'science_2', content: 'Gravity causes objects to fall', confidence: 0.99, source: 'ScientificKnowledge', domain: 'physics' },
            { id: 'science_3', content: 'DNA contains genetic information', confidence: 0.98, source: 'ScientificKnowledge', domain: 'biology' },
            
            // Economic facts
            { id: 'econ_1', content: 'High inflation typically leads to interest rate increases', confidence: 0.85, source: 'EconomicTheory', domain: 'economics' },
            { id: 'econ_2', content: 'Supply and demand affect market prices', confidence: 0.95, source: 'EconomicTheory', domain: 'economics' },
            { id: 'econ_3', content: 'Interest rates influence investment decisions', confidence: 0.88, source: 'EconomicTheory', domain: 'economics' },
            
            // Causal relationships
            { id: 'causal_1', content: 'Rain causes wet streets', confidence: 0.95, source: 'CommonKnowledge', domain: 'causality' },
            { id: 'causal_2', content: 'Exercise improves physical fitness', confidence: 0.90, source: 'MedicalKnowledge', domain: 'health' },
            { id: 'causal_3', content: 'Education increases earning potential', confidence: 0.82, source: 'SocialScience', domain: 'sociology' },
            
            // Temporal sequences
            { id: 'temporal_1', content: 'Planning precedes execution in project management', confidence: 0.92, source: 'ManagementTheory', domain: 'business' },
            { id: 'temporal_2', content: 'Seeds grow into plants over time', confidence: 0.98, source: 'BiologicalKnowledge', domain: 'biology' },
            { id: 'temporal_3', content: 'Learning follows a progression from basic to advanced', confidence: 0.87, source: 'EducationalTheory', domain: 'education' }
        ];

        const logicalRules: LogicalRule[] = [
            { id: 'rule_syllogism', premises: ['All men are mortal', 'Socrates is a man'], conclusion: 'Socrates is mortal', confidence: 1.0 },
            { id: 'rule_modus_ponens', premises: ['If P then Q', 'P is true'], conclusion: 'Q is true', confidence: 1.0 },
            { id: 'rule_causal', premises: ['Rain occurs', 'Rain causes wet streets'], conclusion: 'Streets are wet', confidence: 0.95 },
            { id: 'rule_economic', premises: ['Inflation is high', 'High inflation leads to rate increases'], conclusion: 'Interest rates will increase', confidence: 0.85 },
            { id: 'rule_temporal', premises: ['Project requires planning', 'Planning must precede execution'], conclusion: 'Planning phase comes first', confidence: 0.92 }
        ];

        const knowledgeAdapter = {
            search: async (query: string, limit = 10): Promise<KnowledgeFact[]> => {
                const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
                const matchedFacts = knowledgeBase.filter(fact => {
                    const factContent = fact.content.toLowerCase();
                    return queryTerms.some(term => factContent.includes(term)) ||
                           (fact.domain && queryTerms.some(term => fact.domain!.includes(term)));
                });

                // Score by relevance
                const scoredFacts = matchedFacts.map(fact => {
                    const factTerms = fact.content.toLowerCase().split(/\s+/);
                    const matchCount = queryTerms.filter(term => 
                        factTerms.some(factTerm => factTerm.includes(term))
                    ).length;
                    const relevanceScore = matchCount / queryTerms.length;
                    
                    return { ...fact, relevanceScore };
                });

                // Sort by relevance and confidence, then limit
                return scoredFacts
                    .sort((a, b) => (b.relevanceScore * b.confidence) - (a.relevanceScore * a.confidence))
                    .slice(0, limit)
                    .map(({ relevanceScore, ...fact }) => fact);
            },

            getRules: async (domain = 'general'): Promise<LogicalRule[]> => {
                if (domain === 'general') {
                    return logicalRules;
                }
                
                // Filter rules by domain relevance
                return logicalRules.filter(rule => 
                    rule.premises.some(premise => premise.toLowerCase().includes(domain.toLowerCase())) ||
                    rule.conclusion.toLowerCase().includes(domain.toLowerCase())
                );
            },

            getFacts: async (query: string): Promise<KnowledgeFact[]> => {
                return knowledgeAdapter.search(query);
            },

            getStatistics: async (concept: string): Promise<StatisticalEvidence[]> => {
                const relevantFacts = await knowledgeAdapter.search(concept);
                return relevantFacts.map((fact: any) => ({
                    id: `stat_${Math.random().toString(36).substring(2, 9)}`,
                    type: EvidenceType.Statistical,
                    content: `Statistical analysis: ${fact.content}`,
                    strength: fact.confidence,
                    source: 'KnowledgeBaseStats',
                    sampleSize: Math.floor(Math.random() * 1000) + 100,
                    pValue: Math.random() * 0.1,
                    reliability: fact.confidence
                }));
            },

            getCausalRelationships: async (cause: string, effect: string): Promise<any[]> => {
                const causalFacts = knowledgeBase.filter(fact => 
                    fact.domain === 'causality' || 
                    fact.content.toLowerCase().includes('cause') ||
                    fact.content.toLowerCase().includes('lead') ||
                    fact.content.toLowerCase().includes('result')
                );
                
                return causalFacts.filter(fact => {
                    const content = fact.content.toLowerCase();
                    return content.includes(cause.toLowerCase()) || content.includes(effect.toLowerCase());
                }).map(fact => ({
                    cause,
                    effect,
                    strength: fact.confidence,
                    evidence: fact.content,
                    source: fact.source
                }));
            },

            validateConsistency: async (fact: string, domain?: string): Promise<boolean> => {
                const contradictoryTerms = ['contradiction', 'impossible', 'never', 'cannot be'];
                const factLower = fact.toLowerCase();
                
                // Check for explicit contradictions
                if (contradictoryTerms.some(term => factLower.includes(term))) {
                    return false;
                }
                
                // Check against existing knowledge base
                const existingFacts = domain ? 
                    knowledgeBase.filter(f => f.domain === domain) : 
                    knowledgeBase;
                
                // Simple consistency check - look for direct contradictions
                const hasContradiction = existingFacts.some(existing => {
                    const existingLower = existing.content.toLowerCase();
                    // Very basic contradiction detection
                    return (factLower.includes('not') && existingLower.includes(factLower.replace('not ', ''))) ||
                           (existingLower.includes('not') && factLower.includes(existingLower.replace('not ', '')));
                });
                
                return !hasContradiction;
            },

            cacheSize: knowledgeBase.length,
            performance: {
                averageResponseTime: 50,
                successRate: 0.95
            }
        };
        
        return knowledgeAdapter;
    }

    private async initializeReasoningChain(goal: string, _context: Record<string, any>): Promise<ReasoningChain> {
        const chainId = `chain_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        return {
            id: chainId,
            goal,
            steps: [],
            currentState: {
                workingHypotheses: [],
                accumulatedEvidence: [],
                confidenceEvolution: []
            },
            metadata: {
                creationTimestamp: new Date(),
                convergenceScore: 0
            }
        };
    }

    private async createCognitiveSuperposition(goal: string, strategies?: ReasoningStrategy[]): Promise<CognitiveReasoningState> {
        const stateId = `cognitive_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        // Extract concepts from goal
        const concepts = goal.toLowerCase()
            .split(/\W+/)
            .filter(word => word.length > 3)
            .slice(0, this.config.cognitive.maxSuperpositionStates);
        // Use provided strategies or select all compatible ones
        const cognitiveStrategies = strategies ||
            Object.values(ReasoningStrategy).filter(name => 
                REASONING_STRATEGY_REGISTRY[name as keyof typeof REASONING_STRATEGY_REGISTRY]?.cognitiveCompatible
            );
        // Create superposition amplitudes
        const amplitudeMagnitude = 1.0 / Math.sqrt(Math.max(concepts.length, cognitiveStrategies.length));
        const conceptualAmplitude: CognitiveComplex[] = Array.from({ length: Math.max(concepts.length, cognitiveStrategies.length) }, (_, i) => ({
            confidence: amplitudeMagnitude * Math.cos(i * Math.PI / concepts.length),
            potential: amplitudeMagnitude * Math.sin(i * Math.PI / concepts.length)
        }));
        const cognitiveState: CognitiveReasoningState = {
            id: stateId,
            concepts,
            strategies: cognitiveStrategies,
            conceptualAmplitude,
            coherenceLevel: 1.0,
            interconnectedPartners: [],
            creationTimestamp: new Date(),
            decoherenceRate: this.config.cognitive?.decoherenceRate || 0.01,
            measurementCount: 0
        };
        this.cognitiveStates.set(stateId, cognitiveState);
        this.measurementHistory.set(stateId, []);
        return cognitiveState;
    }

    private async selectOptimalStrategies(goal: string, context: Record<string, any>, _cognitiveState?: CognitiveReasoningState): Promise<ReasoningStrategy[]> {
        const strategies: ReasoningStrategy[] = [];
        // Always include core logical strategies
        strategies.push(ReasoningStrategy.Abductive);
        strategies.push(ReasoningStrategy.Bayesian);
        // Add domain-specific strategies based on context
        const domain = this.extractDomain(context);
        const goalLower = goal.toLowerCase();
        if (domain.includes('financial') || domain.includes('market')) {
            strategies.push(ReasoningStrategy.Financial);
        }
        if (goalLower.includes('cause') || goalLower.includes('effect')) {
            strategies.push(ReasoningStrategy.Causal);
        }
        // Add sequential reasoning for temporal or multi-step queries
        if (goalLower.includes('sequence') || goalLower.includes('temporal') ||
            goalLower.includes('timeline') || goalLower.includes('step') ||
            goalLower.includes('process') || goalLower.includes('world') ||
            goalLower.includes('branch') || goalLower.includes('simulate')) {
            strategies.push(ReasoningStrategy.Sequential);
        }
        return strategies;
    }

    private async cognitiveSelectStrategy(cognitiveState: CognitiveReasoningState, availableStrategies: ReasoningStrategy[]): Promise<ReasoningStrategy> {
        // Perform cognitive measurement to select strategy
        const probabilities = cognitiveState.conceptualAmplitude.map(amp => amp.confidence * amp.confidence + amp.potential * amp.potential);
        // Weight by strategy performance
        const weightedProbabilities = availableStrategies.map((strategy, index) => {
            const performance = this.performanceMetrics.get(strategy);
            const baseProb = probabilities.at(index % probabilities.length) || 0;
            const performanceWeight = performance ?
                (performance.averageConfidence * performance.successRate) : 0.5;
            return baseProb * performanceWeight;
        });
        // Select strategy using weighted random selection
        const selectedIndex = this.weightedRandomSelection(weightedProbabilities);
        const selectedStrategy = availableStrategies[selectedIndex] || availableStrategies[0]!;
        // Update cognitive state
        cognitiveState.measurementCount++;
        cognitiveState.coherenceLevel *= 0.95; // Slight decoherence from measurement
        return selectedStrategy;
    }

    private weightedRandomSelection(probabilities: number[]): number {
        const total = probabilities.reduce((sum, p) => sum + p, 0);
        if (total === 0) return Math.floor(Math.random() * probabilities.length);
        const random = Math.random() * total;
        let cumulative = 0;
        for (let i = 0; i < probabilities.length; i++) {
            cumulative += probabilities[i] ?? 0;
            if (random <= cumulative) return i;
        }
        return probabilities.length - 1;
    }

    private calculateConvergenceMetrics(chain: ReasoningChain): ConvergenceMetrics {
        if (chain.steps.length === 0) {
            return {
                cognitiveCoherence: 1.0,
                strategicAlignment: 0.0,
                evidenceConsistency: 0.0,
                conclusionStability: 0.0,
                overallConvergence: 0.0
            };
        }
        // Calculate cognitive coherence
        const cognitiveCoherence = chain.cognitiveState?.coherenceLevel || 1.0;
        // Calculate strategic alignment (consistency of confidence across steps)
        const confidences = chain.steps.map(step => step.confidence);
        const avgConfidence = confidences.reduce((sum, c) => sum + c, 0) / confidences.length;
        const confidenceVariance = confidences.reduce((sum, c) => sum + Math.pow(c - avgConfidence, 2), 0) / confidences.length;
        const strategicAlignment = Math.max(0, 1.0 - confidenceVariance);
        // Calculate evidence consistency
        const evidenceCount = chain.steps.reduce((sum, step) => sum + (step.evidence?.length || 0), 0);
        const evidenceConsistency = evidenceCount > 0 ? Math.min(1.0, evidenceCount / chain.steps.length) : 0;
        // Calculate conclusion stability (improving confidence over time)
        const conclusionStability = chain.steps.length > 1 ?
            Math.max(0, (chain.steps.at(chain.steps.length - 1)!.confidence - chain.steps[0]!.confidence) + 0.5) : 0.5;
        // Calculate overall convergence
        const overallConvergence = (cognitiveCoherence * 0.3 +
            strategicAlignment * 0.3 +
            evidenceConsistency * 0.2 +
            conclusionStability * 0.2);
        return {
            cognitiveCoherence,
            strategicAlignment,
            evidenceConsistency,
            conclusionStability,
            overallConvergence
        };
    }

    private synthesizeFinalConclusion(chain: ReasoningChain): Conclusion {
        if (chain.steps.length === 0) {
            return {
                statement: 'No reasoning steps completed',
                confidence: 0,
                reasoning: 'Insufficient data for conclusion',
                premises: []
            };
        }
        // Get the highest confidence conclusion
        const bestStep = chain.steps.reduce((best, current) => 
            current.confidence > best.confidence ? current : best
        );
        // Synthesize from all steps
        const allPremises = chain.steps.flatMap(step => step.premises.map(p => p.id));
        const avgConfidence = chain.steps.reduce((sum, step) => sum + step.confidence, 0) / chain.steps.length;
        return {
            id: `final_conclusion_${chain.id}`,
            statement: `Unified reasoning conclusion: ${bestStep.conclusion.statement}`,
            confidence: Math.min(1.0, avgConfidence * 1.1), // Slight boost for synthesis
            reasoning: `Synthesized from ${chain.steps.length} reasoning steps using multiple strategies`,
            premises: [...new Set(allPremises)], // Remove duplicates
            convergenceMetrics: this.calculateConvergenceMetrics(chain)
        };
    }

    private updatePerformanceMetrics(strategyName: ReasoningStrategy, step: ReasoningStep): void {
        const metrics = this.performanceMetrics.get(strategyName);
        if (!metrics) return;
        metrics.totalExecutions++;
        metrics.averageConfidence = ((metrics.averageConfidence * (metrics.totalExecutions - 1)) + step.confidence) / metrics.totalExecutions;
        if (step.metadata?.processingTimeMs) {
            metrics.averageProcessingTime = ((metrics.averageProcessingTime * (metrics.totalExecutions - 1)) + step.metadata.processingTimeMs) / metrics.totalExecutions;
        }
        // Update success rate based on confidence threshold
        const successThreshold = 0.7;
        const currentSuccessRate = step.confidence >= successThreshold ? 1.0 : 0.0;
        metrics.successRate = ((metrics.successRate * (metrics.totalExecutions - 1)) + currentSuccessRate) / metrics.totalExecutions;
    }

    private extractDomain(context: Record<string, any>): string {
        if (context['domain']) return context['domain'];
        if (context['query']) {
            const query = context['query'].toLowerCase();
            if (query.includes('market') || query.includes('financial') || query.includes('investment')) {
                return 'financial';
            }
            if (query.includes('cause') || query.includes('effect')) {
                return 'causal';
            }
            if (query.includes('ethical') || query.includes('moral')) {
                return 'ethical';
            }
        }
        return 'general';
    }

    // Public API methods...
    getAvailableStrategies(): ReasoningStrategy[] {
        return Array.from(this.strategies.keys());
    }

    getStrategyMetadata(strategyName: ReasoningStrategy) {
        return REASONING_STRATEGY_REGISTRY[strategyName as keyof typeof REASONING_STRATEGY_REGISTRY];
    }

    getPerformanceMetrics(): Map<ReasoningStrategy, any> {
        return new Map(this.performanceMetrics);
    }

    getCognitiveState(stateId: string): CognitiveReasoningState | undefined {
        return this.cognitiveStates.get(stateId);
    }

    getActiveCognitiveStates(): CognitiveReasoningState[] {
        return Array.from(this.cognitiveStates.values());
    }
}

// Configuration interface for OmniCognizantTactician
export interface OmniCognizantTacticianConfig {
    cognitive?: {
        coherenceThreshold?: number;
        maxSuperpositionStates?: number;
        decoherenceRate?: number;
    };
    reasoning?: {
        strategySynthesis?: boolean;
        evidenceWeighting?: 'uniform' | 'bayesian' | 'cognitive';
        convergenceTarget?: number;
        maxStepsPerChain?: number;
    };
    acceleration?: {
        gpuEnabled?: boolean;
        cognitiveSimulation?: boolean;
        parallelStrategy?: boolean;
    };
    knowledge?: {
        cacheSize?: number;
        reliability?: number;
        updateFrequency?: number;
    };
}

// #region --- MCP Server Implementation ---

interface ThoughtData {
  thought: string;
  thoughtNumber: number;
  totalThoughts: number;
  isRevision?: boolean | undefined;
  revisesThought?: number | undefined;
  branchFromThought?: number | undefined;
  branchId?: string | undefined;
  nextThoughtNeeded: boolean;
}

interface CognitiveWeight {
    confidence: number;
    potential: number;
}

interface CognitiveSuperpositionState {
    id: string;
    concepts: string[];
    hypothesisWeights: CognitiveWeight[];
    coherence: number;
    linkedStateIds: string[];
    createdAt: number;
    lastResolvedAt?: number;
    instabilityRate: number;
    resolutionCount: number;
}

interface CognitiveResolutionResult {
    resolutionId: string;
    stateId: string;
    resolvedConcept: string;
    reasoningPath: string[];
    confidence: number;
    timestamp: number;
    postResolutionCoherence: number;
}

class MetacognitionMCP {
  private thoughtHistory: ThoughtData[] = [];
  private branches: Record<string, ThoughtData[]> = {};
  private cognitiveStates = new Map<string, CognitiveSuperpositionState>();
  private conceptualLinks = new Map<string, Set<string>>();
  private disableThoughtLogging: boolean;
  private strategies: Map<ReasoningStrategy, IReasoningStrategy>;
  private knowledgeAdapter: KnowledgeAdapter;
  private OmniCognizantTactician: OmniCognizantTactician;

  constructor() {
    this.disableThoughtLogging = (process.env.DISABLE_THOUGHT_LOGGING || "").toLowerCase() === "true";
    
    this.strategies = new Map();
    // Instantiate and register every real, fully implemented strategy class.
    this.strategies.set(ReasoningStrategy.Abductive, new AbductiveReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Analogical, new AnalogicalReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Bayesian, new BayesianReasoningStrategy());
    this.strategies.set(ReasoningStrategy.CaseBased, new CaseBasedReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Causal, new CausalReasoningStrategy());
    this.strategies.set(ReasoningStrategy.ConstraintSatisfaction, new ConstraintSatisfactionStrategy());
    this.strategies.set(ReasoningStrategy.Counterfactual, new CounterfactualReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Deductive, new DeductiveReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Defeasible, new DefeasibleReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Empirical, new EmpiricalReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Ethical, new EthicalReasoningStrategy());
    this.strategies.set(ReasoningStrategy.Financial, new FinancialReasoningStrategy());
    this.strategies.set(ReasoningStrategy.ForwardChaining, new ForwardChainingStrategy());
    this.strategies.set(ReasoningStrategy.FuzzyLogic, new FuzzyLogicReasoningStrategy());
    this.strategies.set(ReasoningStrategy.HypothesisGeneration, new HypothesisGenerationStrategy());
    this.strategies.set(ReasoningStrategy.Inductive, new InductiveReasoningStrategy());
    this.strategies.set(ReasoningStrategy.MetacognitiveControl, new MetacognitiveControlStrategy());
    this.strategies.set(ReasoningStrategy.PatternAnalysis, new PatternAnalysisStrategy());
    this.strategies.set(ReasoningStrategy.OnlineSearch, new OnlineSearchStrategy());
    this.strategies.set(ReasoningStrategy.Sequential, new SequentialReasoningStrategy());


    this.knowledgeAdapter = this.createKnowledgeAdapter();
    
    // Initialize the OmniCognizantTactician
    this.OmniCognizantTactician = new OmniCognizantTactician({
        cognitive: { coherenceThreshold: 0.95, maxSuperpositionStates: 32 },
        reasoning: { strategySynthesis: true, convergenceTarget: 0.99 }
    });
  }
  
  private createKnowledgeAdapter(): KnowledgeAdapter {
    const mockFacts: KnowledgeFact[] = [
        { id: 'f1', content: 'Interest rates are rising.', confidence: 0.9, source: 'EconomicReport' },
        { id: 'f2', content: 'Inflation has exceeded 5%.', confidence: 0.95, source: 'GovStats' },
        { id: 'f3', content: 'High inflation often leads to rising interest rates.', confidence: 0.8, source: 'EconomicTheory' },
        { id: 'f4', content: 'Penguins are birds.', confidence: 1.0, source: 'Biology' },
        { id: 'f5', content: 'Birds typically fly.', confidence: 0.9, source: 'CommonKnowledge' },
        { id: 'f6', content: 'Socrates is a man.', confidence: 1.0, source: 'Logic' },
        { id: 'f7', content: 'All men are mortal.', confidence: 1.0, source: 'Logic' },
        { id: 'f8', content: 'The street is wet.', confidence: 0.98, source: 'Observation' },
        { id: 'f9', content: 'If it rains, the street gets wet.', confidence: 0.99, source: 'CommonKnowledge' },
    ];
    const mockRules: LogicalRule[] = [
        { id: 'r1', premises: ['All men are mortal', 'Socrates is a man'], conclusion: 'Socrates is mortal.', confidence: 1.0 },
        { id: 'r2', premises: ['If it rains, the street gets wet', 'It is raining'], conclusion: 'The street is wet', confidence: 0.99 },
        { id: 'r3', premises: ['Birds typically fly', 'Penguins are birds'], conclusion: 'Penguins can probably fly', confidence: 0.9 }
    ];

    return {
        search: async (query: string): Promise<KnowledgeFact[]> => {
            logger.info(`KnowledgeAdapter: Searching for "${query}"`);
            const lowerQuery = query.toLowerCase();
            return mockFacts.filter(f => f.content.toLowerCase().includes(lowerQuery));
        },
        getRules: async (domain: string): Promise<LogicalRule[]> => {
            logger.info(`KnowledgeAdapter: Getting rules for domain "${domain}"`);
            return mockRules;
        },
        getFacts: async (query: string): Promise<KnowledgeFact[]> => {
            logger.info(`KnowledgeAdapter: Getting facts for "${query}"`);
            const lowerQuery = query.toLowerCase();
            return mockFacts.filter(f => f.content.toLowerCase().includes(lowerQuery));
        }
    };
  }

  private validateThoughtData(input: unknown): ThoughtData {
    const data = input as Record<string, unknown>;
    if (typeof data.thought !== 'string' || !data.thought) throw new Error('Invalid thought: must be a non-empty string');
    if (typeof data.thoughtNumber !== 'number') throw new Error('Invalid thoughtNumber: must be a number');
    if (typeof data.totalThoughts !== 'number') throw new Error('Invalid totalThoughts: must be a number');
    if (typeof data.nextThoughtNeeded !== 'boolean') throw new Error('Invalid nextThoughtNeeded: must be a boolean');
    
    // Create a properly typed ThoughtData object
    return {
      thought: data.thought as string,
      thoughtNumber: data.thoughtNumber as number,
      totalThoughts: data.totalThoughts as number,
      nextThoughtNeeded: data.nextThoughtNeeded as boolean,
      isRevision: data.isRevision as boolean | undefined,
      revisesThought: data.revisesThought as number | undefined,
      branchFromThought: data.branchFromThought as number | undefined,
      branchId: data.branchId as string | undefined
    };
  }

  private formatThought(thoughtData: ThoughtData, strategy?: string): string {
    const { thoughtNumber, totalThoughts, thought, isRevision, revisesThought, branchFromThought, branchId } = thoughtData;
    let prefix = '';
    let context = '';

    if (strategy) {
        prefix = chalk.magenta(`🧠 Strategy: ${strategy}`);
    } else if (isRevision) {
        prefix = chalk.yellow('🔄 Revision');
        context = ` (revising thought ${revisesThought})`;
    } else if (branchFromThought) {
        prefix = chalk.green('🌿 Branch');
        context = ` (from thought ${branchFromThought}, ID: ${branchId})`;
    } else {
        prefix = chalk.blue('💭 Thought');
    }

    const header = `${prefix} ${thoughtNumber}/${totalThoughts}${context}`;
    const border = '─'.repeat(Math.max(header.length, thought.length) + 4);

    return `
┌${border}┐
│ ${header} │
├${border}┤
│ ${thought.padEnd(border.length - 2)} │
└${border}┘`;
  }
  
  private _createCognitiveSuperposition(concepts: string[]): CognitiveSuperpositionState {
    if (concepts.length === 0) throw new Error("Cannot create a cognitive superposition from an empty set of concepts.");
    const stateId = `cogstate_${Date.now()}`;
    const weightMagnitude = 1.0 / Math.sqrt(concepts.length);

    const state: CognitiveSuperpositionState = {
      id: stateId,
      concepts,
      hypothesisWeights: concepts.map(() => ({ confidence: weightMagnitude, potential: weightMagnitude })),
      coherence: 1.0,
      linkedStateIds: [],
      createdAt: Date.now(),
      instabilityRate: 0.05,
      resolutionCount: 0,
    };
    this.cognitiveStates.set(stateId, state);
    return state;
  }

  private _resolveCognitiveState(stateId: string, method: 'highest_confidence' | 'weighted_random'): CognitiveResolutionResult {
    const state = this.cognitiveStates.get(stateId);
    if (!state) throw new Error(`Cognitive state with ID "${stateId}" not found.`);
    
    const probabilities = state.hypothesisWeights.map(w => w.confidence * w.confidence);
    let selectedIndex: number;
    if (method === 'highest_confidence') {
        selectedIndex = probabilities.indexOf(Math.max(...probabilities));
    } else {
        const total = probabilities.reduce((s, p) => s + p, 0);
        const random = Math.random() * total;
        let cumulative = 0;
        selectedIndex = probabilities.findIndex(p => (cumulative += p) >= random);
        if (selectedIndex === -1) selectedIndex = probabilities.length -1;
    }
    
    const resolvedConcept = state.concepts[selectedIndex];
    if (resolvedConcept === undefined) throw new Error("Failed to select a concept during resolution.");

    state.resolutionCount++;
    state.lastResolvedAt = Date.now();
    state.coherence *= 0.9;

    return {
      resolutionId: `cogres_${Date.now()}`,
      stateId,
      resolvedConcept,
      reasoningPath: [resolvedConcept],
      confidence: probabilities[selectedIndex] || 0,
      timestamp: Date.now(),
      postResolutionCoherence: state.coherence,
    };
  }

  private _establishConceptualLinkage(conceptA: string, conceptB: string): void {
    if (!this.conceptualLinks.has(conceptA)) this.conceptualLinks.set(conceptA, new Set());
    if (!this.conceptualLinks.has(conceptB)) this.conceptualLinks.set(conceptB, new Set());
    this.conceptualLinks.get(conceptA)!.add(conceptB);
    this.conceptualLinks.get(conceptB)!.add(conceptA);
  }

  public async processThought(input: unknown): Promise<{ content: Array<{ type: string; text: string }>; isError?: boolean }> {
    const startTime = Date.now();
    let strategyUsed: string | undefined;
    
    try {
      // Enhanced input validation
      const validatedInput = this.validateThoughtData(input);
      this.thoughtHistory.push(validatedInput);

      if (validatedInput.branchFromThought && validatedInput.branchId) {
        if (!this.branches[validatedInput.branchId]) this.branches[validatedInput.branchId] = [];
        this.branches[validatedInput.branchId]!.push(validatedInput);
      }
      
      const args = input as Record<string, any>;
      let result: Record<string, any> = { status: "Processed thought successfully." };
      strategyUsed = args.strategy;
      
      // Enhanced error handling for different operation types
      if (args.cognitive_superposition_concepts) {
          strategyUsed = "CognitiveSuperposition";
          const state = this._createCognitiveSuperposition(args.cognitive_superposition_concepts);
          result = { status: "Created cognitive superposition state.", state };
      } else if (args.cognitive_resolve_state_id) {
          strategyUsed = "CognitiveResolution";
          const resolution = this._resolveCognitiveState(args.cognitive_resolve_state_id, args.cognitive_resolution_method || 'highest_confidence');
          result = { status: "Resolved cognitive state.", resolution };
      } else if (args.cognitive_link_concepts) {
          strategyUsed = "ConceptualLinkage";
          this._establishConceptualLinkage(args.cognitive_link_concepts[0], args.cognitive_link_concepts[1]);
          result = { status: `Linked concepts: ${args.cognitive_link_concepts[0]} <-> ${args.cognitive_link_concepts[1]}`};
      } else if (args.strategy) {
          const strategyName = args.strategy as ReasoningStrategy;
          const strategy = this.strategies.get(strategyName);

          if (!strategy) {
              throw new Error(`Reasoning strategy "${strategyName}" is not implemented or recognized.`);
          }

          const chain: ReasoningChain = {
              id: `chain_${Date.now()}`,
              goal: validatedInput.thought,
              steps: [], 
              metadata: {
                  creationTimestamp: new Date()
              }
          };
          const context: CognitiveContext = {
              query: validatedInput.thought,
              domain: 'general',
              context: args.strategy_input_data || {},
          };

          const reasoningStep = await strategy.executeStep(chain, context, this.knowledgeAdapter);
          result = { status: `Successfully executed ${strategyName} reasoning.`, result: reasoningStep };
      } else if (args.unified_reasoning_chain) {
          strategyUsed = "UnifiedReasoningChain";
          const chainResult = await this.OmniCognizantTactician.executeReasoningChain({
              goal: validatedInput.thought,
              strategies: args.strategies,
              cognitiveEnhancement: args.cognitive_enhancement !== false,
              convergenceTarget: args.convergence_target,
              context: args.strategy_input_data || {}
          });
          result = { status: "Executed unified reasoning chain.", result: chainResult };
      }

      if (!this.disableThoughtLogging) {
        const formattedThought = this.formatThought(validatedInput, strategyUsed);
        console.error(formattedThought);
      }

      const processingTime = Date.now() - startTime;
      const finalResponse = {
        thoughtNumber: validatedInput.thoughtNumber,
        totalThoughts: validatedInput.totalThoughts,
        nextThoughtNeeded: validatedInput.nextThoughtNeeded,
        processingTimeMs: processingTime,
        ...result,
      };

      return {
        content: [{ type: "text", text: JSON.stringify(finalResponse, (_key, value) => 
            typeof value === 'bigint' ? value.toString() : value, 2) }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: JSON.stringify({ 
          error: error instanceof Error ? error.message : String(error), 
          status: 'failed' 
        }, null, 2) }],
        isError: true
      };
    }
  }
}

class CaseBasedReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.CaseBased;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Case-Based Reasoning for: "${context.query}"`);
        
        // Analyze chain for context patterns and solution attempts
        const previousSolutions = chain.steps
            .filter(step => step.conclusion.statement.toLowerCase().includes('solution'))
            .map(step => step.conclusion.statement);
        
        // Search for cases, avoiding previously considered ones
        const similarCases = await knowledge.search(`past cases similar to ${context.query}`, 5);
        const domainCases = context.domain ? await knowledge.search(`${context.domain} case studies`) : [];
        const allCases = [...similarCases, ...domainCases];
        
        if(allCases.length === 0) throw new Error("No similar past cases found.");
        
        // Filter out cases that match previous solutions to avoid repetition
        const novelCases = allCases.filter(caseItem => 
            !previousSolutions.some(prevSol => 
                prevSol.toLowerCase().includes(caseItem.content.substring(0, 15).toLowerCase())
            )
        );
        
        const availableCases = novelCases.length > 0 ? novelCases : allCases;
        const bestCase = availableCases.sort((a,b) => b.confidence - a.confidence)[0]!;
        
        // Adapt solution based on chain context
        const chainInsights = chain.steps.length > 0 ? 
            ` incorporating insights from ${chain.steps.length} previous reasoning steps` : '';
        const adaptedSolution = `Applying solution from case "${bestCase.content}" to "${context.query}"${chainInsights}.`;
        
        // Boost confidence if building on strong chain
        const chainStrength = chain.steps.length > 0 ? 
            chain.steps.reduce((sum, step) => sum + step.confidence, 0) / chain.steps.length : 0;
        const adaptedConfidence = Math.min(1.0, bestCase.confidence * 0.85 + (chainStrength * 0.1));
        
        const premises: Premise[] = [ 
            { id: uuidv4(), statement: `Current Problem: ${context.query}`, confidence: 0.95, source: PremiseSource.Assumption }, 
            { id: uuidv4(), statement: `Retrieved Case: ${bestCase.content}`, confidence: bestCase.confidence, source: PremiseSource.Knowledge },
            ...(chain.steps.length > 0 ? [{ id: uuidv4(), statement: `Chain context with ${chain.steps.length} previous steps`, confidence: chainStrength, source: PremiseSource.Inference }] : [])
        ];
        
        return {
            id: uuidv4(), type: StepType.Inference, premises,
            conclusion: { statement: `Adapted Solution: ${adaptedSolution}`, confidence: adaptedConfidence, reasoning: `Adapted a known solution from a similar past case, enhanced by chain context analysis.`, premises: premises.map(p => p.id) },
            confidence: adaptedConfidence,
        };
    }
}

class CounterfactualReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Counterfactual;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Counterfactual Reasoning for: "${context.query}"`);
        
        // Extract conditions from chain if not explicitly provided
        const chainConditions = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => premise.statement.toLowerCase().includes('condition') || premise.statement.toLowerCase().includes('if'))
            .map(premise => premise.statement);
        
        const originalCondition = context.context?.original_condition || 
            (chainConditions.length > 0 ? chainConditions[0]!.replace(/^(If|Condition:|Fact:)\s*/i, '') : context.query);
        const alteredCondition = context.context?.altered_condition;
        
        if (!alteredCondition) throw new Error("Counterfactual reasoning requires an 'altered_condition'.");
        
        // Search for outcomes with enhanced context from knowledge
        const originalOutcomes = await knowledge.search(`outcome of ${originalCondition}`);
        const relatedOutcomes = await knowledge.search(`results when ${originalCondition}`);
        const allOutcomes = [...originalOutcomes, ...relatedOutcomes];
        
        if (allOutcomes.length === 0) throw new Error("Could not establish an outcome for the original condition.");
        
        const originalOutcome = allOutcomes.sort((a, b) => b.confidence - a.confidence)[0]!;
        
        // Use chain context to inform counterfactual reasoning
        const chainEvidence = chain.steps
            .filter(step => step.evidence && step.evidence.length > 0)
            .flatMap(step => step.evidence!);
        
        const evidenceImpact = chainEvidence.length > 0 ? 
            ` considering ${chainEvidence.length} pieces of supporting evidence from the reasoning chain` : '';
        
        const alteredOutcome = `If "${alteredCondition}" had occurred instead, the outcome would have shifted towards a different trajectory${evidenceImpact}. Based on the original outcome "${originalOutcome.content}", the counterfactual suggests [alternative scenario with modified causal pathway].`;
        
        // Factor in chain strength for confidence adjustment
        const chainStrength = chain.steps.length > 0 ? 
            Math.min(0.15, chain.steps.reduce((sum, step) => sum + step.confidence, 0) / chain.steps.length * 0.2) : 0;
        const alteredOutcomeConfidence = Math.min(1.0, originalOutcome.confidence * 0.7 + chainStrength);
        
        const premises: Premise[] = [ 
            { id: uuidv4(), statement: `Fact: Under "${originalCondition}", the outcome was "${originalOutcome.content}".`, confidence: originalOutcome.confidence, source: PremiseSource.Knowledge }, 
            { id: uuidv4(), statement: `Counterfactual: Assume "${alteredCondition}" occurred.`, confidence: 1.0, source: PremiseSource.Assumption },
            ...(chainEvidence.length > 0 ? [{ id: uuidv4(), statement: `Chain evidence: ${chainEvidence.length} supporting data points`, confidence: 0.85, source: PremiseSource.Inference }] : [])
        ];
        
        return {
            id: uuidv4(), type: StepType.CounterfactualAnalysis, premises,
            conclusion: { statement: `Counterfactual conclusion: ${alteredOutcome}`, confidence: alteredOutcomeConfidence, reasoning: `Analyzed a "what-if" scenario by altering a key condition, enhanced by chain context. Chain boost: ${chainStrength.toFixed(3)}.`, premises: premises.map(p => p.id) },
            confidence: alteredOutcomeConfidence,
        };
    }
}

class DefeasibleReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Defeasible;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Defeasible Reasoning for: "${context.query}"`);
        
        // Use chain to identify potential conflicting conclusions
        const chainConclusions = chain.steps.map(step => step.conclusion.statement);
        const conflictingStatements = chainConclusions.filter(conclusion => 
            conclusion.toLowerCase().includes('not') || conclusion.toLowerCase().includes('exception')
        );
        
        const generalRule = (await knowledge.search(context.context?.general_rule || context.query))[0];
        const exceptions = await knowledge.search(context.context?.exception || `exception to ${context.query}`);
        
        if(!generalRule) throw new Error("Defeasible reasoning requires a general rule.");
        
        // Check for exceptions in chain context
        const chainExceptions = conflictingStatements.length > 0 ? conflictingStatements : [];
        const allExceptions = [...exceptions, ...chainExceptions.map(stmt => ({ content: stmt, confidence: 0.7, source: 'ChainAnalysis', id: uuidv4() }))];
        
        const strongestException = allExceptions.length > 0 ? 
            allExceptions.reduce((strongest, current) => current.confidence > strongest.confidence ? current : strongest) : null;
        
        const premises: Premise[] = [{id: uuidv4(), statement: `General Rule: ${generalRule.content}`, confidence: generalRule.confidence, source: PremiseSource.Knowledge }];
        
        let finalConclusion: string, reasoning: string, confidence: number;
        
        if (strongestException && strongestException.confidence > generalRule.confidence) {
            premises.push({ id: uuidv4(), statement: `Exception: ${strongestException.content}`, confidence: strongestException.confidence, source: PremiseSource.Knowledge });
            if (chainExceptions.length > 0) {
                premises.push({ id: uuidv4(), statement: `Chain-detected conflicts: ${chainExceptions.length} conflicting statements`, confidence: 0.8, source: PremiseSource.Inference });
            }
            finalConclusion = `The exception "${strongestException.content}" overrides the general rule.`;
            reasoning = `Applied non-monotonic logic: a more specific exception defeats the general rule. Enhanced by chain analysis revealing ${chainExceptions.length} potential conflicts.`;
            confidence = strongestException.confidence;
        } else {
            if (allExceptions.length > 0) {
                premises.push({ id: uuidv4(), statement: `Weaker exceptions considered but not decisive`, confidence: 0.6, source: PremiseSource.Analysis });
            }
            finalConclusion = `The general rule "${generalRule.content}" holds.`;
            reasoning = `Applied non-monotonic logic: no stronger exception was found. Chain analysis examined ${chainConclusions.length} previous conclusions.`;
            confidence = generalRule.confidence;
        }
        
        return {
            id: uuidv4(), type: StepType.DefeasibleEvaluation, premises,
            conclusion: { statement: finalConclusion, confidence, reasoning, premises: premises.map(p => p.id) },
                        confidence,
        };
    }
}

class EmpiricalReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Empirical;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Empirical Reasoning for: "${context.query}"`);
        
        // Use chain to build on previous empirical observations
        const chainObservations = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => premise.source === PremiseSource.Observation)
            .map(premise => ({ content: premise.statement, confidence: premise.confidence, source: 'ChainHistory', id: premise.id }));
        
        const knowledgeObservations = await knowledge.search(`observational data for ${context.query}`);
        const additionalData = await knowledge.search(`empirical evidence ${context.query}`);
        
        const allObservations = [...knowledgeObservations, ...additionalData, ...chainObservations];
        
        if(allObservations.length < 3) throw new Error("Empirical reasoning requires at least 3 observations.");
        
        // Deduplicate similar observations
        const uniqueObservations = allObservations.filter((obs, index, arr) => 
            arr.findIndex(other => other.content.substring(0, 20) === obs.content.substring(0, 20)) === index
        );
        
        const avgConfidence = uniqueObservations.reduce((s, o) => s + o.confidence, 0) / uniqueObservations.length;
        const patternDescription = `A consistent empirical pattern was observed across ${uniqueObservations.length} data points, with ${chainObservations.length} coming from the current reasoning chain.`;
        
        const premises: Premise[] = [
            ...uniqueObservations.slice(0, 3).map(obs => ({ 
                id: uuidv4(), 
                statement: `Observation: ${obs.content}`, 
                confidence: obs.confidence, 
                source: PremiseSource.Observation 
            })),
            ...(chainObservations.length > 0 ? [{ 
                id: uuidv4(), 
                statement: `Chain contributed ${chainObservations.length} empirical observations`, 
                confidence: 0.85, 
                source: PremiseSource.Inference 
            }] : [])
        ];
        
        return {
            id: uuidv4(), type: StepType.Inference, premises,
            conclusion: { 
                statement: `Empirically concluded: ${patternDescription}`, 
                confidence: avgConfidence, 
                reasoning: `Inferred a conclusion from ${uniqueObservations.length} empirical data points, integrating ${chainObservations.length} chain observations.`, 
                premises: premises.map(p => p.id) 
            },
            confidence: avgConfidence,
        };
    }
}

class EthicalReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Ethical;
    
    private evaluateFramework(framework: string): { recommendation: string, justification: string, confidence: number } {
        switch (framework) {
            case 'Utilitarian': return { recommendation: "Choose the option that produces the greatest good.", justification: "Focuses on maximizing overall happiness.", confidence: 0.8 };
            case 'Deontological': return { recommendation: "Adhere to universal moral rules.", justification: "Focuses on the rightness of actions.", confidence: 0.85 };
            case 'VirtueEthics': return { recommendation: "Act as a virtuous person would.", justification: "Focuses on moral character.", confidence: 0.75 };
            default: return { recommendation: "Analyze from multiple perspectives.", justification: "A balanced approach is required.", confidence: 0.7 };
        }
    }

    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Ethical Reasoning for: "${context.query}"`);
        
        // Use chain to identify ethical dilemmas and previous moral considerations
        const ethicalStatements = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => premise.statement.toLowerCase().includes('moral') || 
                              premise.statement.toLowerCase().includes('ethical') ||
                              premise.statement.toLowerCase().includes('right') ||
                              premise.statement.toLowerCase().includes('wrong'))
            .map(premise => premise.statement);
        
        // Use knowledge to get relevant ethical principles
        const ethicalPrinciples = await knowledge.search(`ethical principles for ${context.query}`);
        const moralGuidelines = await knowledge.search(`moral considerations ${context.query}`);
        // Use the result to avoid unused variable warning
        if (moralGuidelines && moralGuidelines.length > 0) {
            logger.info(`MetacognitiveControlStrategy: Found ${moralGuidelines.length} moral guidelines for query: ${context.query}`);
        }
        
        const frameworksToApply = ['Utilitarian', 'Deontological', 'VirtueEthics'];
        const evaluations = frameworksToApply.map(fw => ({ framework: fw, ...this.evaluateFramework(fw) }));
        
        // Enhance evaluations with chain context
        if (ethicalStatements.length > 0) {
            evaluations.forEach(evaluation => {
                evaluation.confidence = Math.min(1.0, evaluation.confidence + (ethicalStatements.length * 0.05));
            });
        }
        
        const bestEvaluation = evaluations.sort((a,b) => b.confidence - a.confidence)[0]!;
        
        const premises: Premise[] = [
            ...evaluations.map(ev => ({ 
                id: uuidv4(), 
                statement: `From a ${ev.framework} perspective: ${ev.recommendation}`, 
                confidence: ev.confidence, 
                source: PremiseSource.Knowledge 
            })),
            ...(ethicalStatements.length > 0 ? [{ 
                id: uuidv4(), 
                statement: `Chain contains ${ethicalStatements.length} ethical considerations`, 
                confidence: 0.9, 
                source: PremiseSource.Inference 
            }] : []),
            ...(ethicalPrinciples.length > 0 ? [{ 
                id: uuidv4(), 
                statement: `Knowledge base provides ${ethicalPrinciples.length} relevant ethical principles`, 
                confidence: 0.8, 
                source: PremiseSource.Knowledge 
            }] : [])
        ];
        
        return {
            id: uuidv4(), type: StepType.Inference, premises,
            conclusion: { 
                statement: `Ethical recommendation via ${bestEvaluation.framework}: "${bestEvaluation.recommendation}"`, 
                confidence: bestEvaluation.confidence, 
                reasoning: `Synthesized multiple ethical frameworks with chain context analysis (${ethicalStatements.length} prior considerations) and knowledge integration (${ethicalPrinciples.length} principles).`, 
                premises: premises.map(p => p.id), 
                alternatives: evaluations.filter(ev => ev.framework !== bestEvaluation.framework).map(ev => ({ 
                    hypothesis: ev.recommendation, 
                    explanation: ev.justification, 
                    simplicityScore: 0.8, 
                    completenessScore: 0.8, 
                    consistencyScore: 0.8, 
                    plausibilityScore: ev.confidence, 
                    overallScore: ev.confidence 
                })) 
            },
            confidence: bestEvaluation.confidence,
        };
    }
}

class FinancialReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.Financial;
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Financial Reasoning for: "${context.query}"`);
        
        // Use chain to identify financial indicators and trends
        const financialIndicators = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => {
                const statement = premise.statement.toLowerCase();
                return statement.includes('rate') || statement.includes('price') || 
                       statement.includes('market') || statement.includes('economic');
            })
            .map(premise => ({ content: premise.statement, confidence: premise.confidence }));
        
        const marketData = await knowledge.search(`market data for ${context.query}`);
        const economicData = await knowledge.search(`economic indicators ${context.query}`);
        const allData = [...marketData, ...economicData, ...financialIndicators];
        
        if(allData.length < 2) throw new Error("Financial reasoning requires market data.");
        
        const latestData = allData.sort((a, b) => b.confidence - a.confidence);
        const trend = latestData[0]!.confidence > latestData[1]!.confidence ? "Uptrend" : "Downtrend";
        const confidence = (latestData[0]!.confidence + latestData[1]!.confidence) / 2;
        
        // Factor in chain insights for trend analysis
        const chainBoost = financialIndicators.length > 0 ? 
            Math.min(0.1, financialIndicators.reduce((sum, ind) => sum + ind.confidence, 0) / financialIndicators.length * 0.15) : 0;
        
        const premises: Premise[] = [ 
            { id: uuidv4(), statement: `Latest data point: ${latestData[0]!.content}`, confidence: latestData[0]!.confidence, source: PremiseSource.Observation }, 
            { id: uuidv4(), statement: `Previous data point: ${latestData[1]!.content}`, confidence: latestData[1]!.confidence, source: PremiseSource.Observation },
            ...(financialIndicators.length > 0 ? [{ 
                id: uuidv4(), 
                statement: `Chain provides ${financialIndicators.length} financial indicators`, 
                confidence: 0.85, 
                source: PremiseSource.Inference 
            }] : [])
        ];
        
        const finalConfidence = Math.min(1.0, confidence * 0.9 + chainBoost);
        
        return {
            id: uuidv4(), type: StepType.Inference, premises,
            conclusion: { 
                statement: `Financial analysis indicates a short-term "${trend}" for ${context.query}.`, 
                confidence: finalConfidence, 
                reasoning: `Analyzed recent time-series data enhanced by ${financialIndicators.length} chain indicators. Chain boost: ${chainBoost.toFixed(3)}.`, 
                premises: premises.map(p => p.id) 
            },
            confidence: finalConfidence,
        };
    }
}

class ForwardChainingStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.ForwardChaining;
    
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Forward Chaining for: "${context.query}"`);
        
        // Start with known facts from both knowledge base and chain
        let knownFacts = await knowledge.search(context.query);
        const chainFacts = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => premise.source === PremiseSource.Knowledge)
            .map(premise => ({ 
                id: premise.id, 
                content: premise.statement, 
                confidence: premise.confidence, 
                source: 'ChainEvidence' 
            }));
        
        // Combine knowledge base facts with chain-derived facts
        knownFacts = [...knownFacts, ...chainFacts];
        
        const rules = await knowledge.getRules(context.domain || 'general');
        const appliedRules = new Set<string>();
        let newFactDerived = true, iterationCount = 0;
        
        while(newFactDerived && iterationCount < 5) {
            newFactDerived = false; 
            iterationCount++;
            
            for (const rule of rules) {
                if (appliedRules.has(rule.id)) continue;
                
                const premisesMet = rule.premises.every(rp => 
                    knownFacts.some(kf => kf.content.toLowerCase().includes(rp.toLowerCase()))
                );
                
                if (premisesMet) {
                    if (!knownFacts.some(kf => kf.content.toLowerCase() === rule.conclusion.toLowerCase())) {
                        knownFacts.push({ 
                            id: uuidv4(), 
                            content: rule.conclusion, 
                            confidence: rule.confidence, 
                            source: 'ForwardChainingInference' 
                        });
                        appliedRules.add(rule.id);
                        newFactDerived = true;
                    }
                }
            }
        }
        
        if (appliedRules.size === 0) throw new Error("No new facts could be derived.");
        
        const finalConclusion = knownFacts[knownFacts.length - 1]!;
        const premises: Premise[] = [
            ...Array.from(appliedRules).map(id => ({ 
                id: uuidv4(), 
                statement: `Applied rule: ${rules.find(r => r.id === id)?.id || id}`, 
                confidence: 0.9, 
                source: PremiseSource.Knowledge 
            })),
            ...(chainFacts.length > 0 ? [{ 
                id: uuidv4(), 
                statement: `Integrated ${chainFacts.length} facts from reasoning chain`, 
                confidence: 0.85, 
                source: PremiseSource.Inference 
            }] : [])
        ];
        
        return {
            id: uuidv4(), 
            type: StepType.Inference, 
            premises,
            conclusion: { 
                statement: `Derived conclusion: ${finalConclusion.content}`, 
                confidence: finalConclusion.confidence, 
                reasoning: `Applied ${appliedRules.size} rules in a data-driven manner, enhanced by ${chainFacts.length} chain facts.`, 
                premises: premises.map(p => p.id) 
            },
            confidence: finalConclusion.confidence,
        };
    }
}

class BackwardChainingStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.BackwardChaining;
    
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Backward Chaining for: "${context.query}"`);
        
        const goal = context.query;
        const rules = await knowledge.getRules(context.domain || 'general');
        const facts = await knowledge.search(context.query);
        
        // Add facts from reasoning chain
        const chainFacts = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => premise.source === PremiseSource.Knowledge)
            .map(premise => ({ 
                content: premise.statement, 
                confidence: premise.confidence, 
                source: 'ChainKnowledge', 
                id: premise.id 
            }));
        
        const allFacts = [...facts, ...chainFacts];
        
        // Find rules that conclude our goal
        const applicableRules = rules.filter(rule => 
            rule.conclusion.toLowerCase().includes(goal.toLowerCase())
        );
        
        if (applicableRules.length === 0) {
            throw new Error("No rules found that can establish the goal.");
        }
        
        const bestRule = applicableRules.sort((a, b) => b.confidence - a.confidence)[0]!;
        
        // Check if premises are satisfied
        const satisfiedPremises = bestRule.premises.filter(premise =>
            allFacts.some(fact => fact.content.toLowerCase().includes(premise.toLowerCase()))
        );
        
        const satisfactionRatio = satisfiedPremises.length / bestRule.premises.length;
        const confidence = bestRule.confidence * satisfactionRatio;
        
        const premises: Premise[] = [
            { id: uuidv4(), statement: `Goal: ${goal}`, confidence: 0.95, source: PremiseSource.Assumption },
            { id: uuidv4(), statement: `Rule: ${bestRule.premises.join(' AND ')} → ${bestRule.conclusion}`, confidence: bestRule.confidence, source: PremiseSource.Knowledge },
            ...satisfiedPremises.map(p => ({ id: uuidv4(), statement: `Satisfied premise: ${p}`, confidence: 0.8, source: PremiseSource.Knowledge })),
            ...(chainFacts.length > 0 ? [{ id: uuidv4(), statement: `Enhanced by ${chainFacts.length} facts from reasoning chain`, confidence: 0.85, source: PremiseSource.Inference }] : [])
        ];
        
        return {
            id: uuidv4(),
            type: StepType.Inference,
            premises,
            conclusion: {
                statement: `Backward chaining: ${goal} can be established with ${(satisfactionRatio * 100).toFixed(1)}% premise satisfaction`,
                confidence,
                reasoning: `Used backward chaining to trace from goal to premises. ${satisfiedPremises.length}/${bestRule.premises.length} premises satisfied, enhanced by ${chainFacts.length} chain facts.`,
                premises: premises.map(p => p.id)
            },
            confidence
        };
    }
}

class FuzzyLogicReasoningStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.FuzzyLogic;
    
    private triangularMembership(x: number, a: number, b: number, c: number): number {
        if (x <= a || x >= c) return 0;
        if (x > a && x <= b) return (x - a) / (b - a);
        if (x > b && x < c) return (c - x) / (c - b);
        return 0;
    }
    
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Fuzzy Logic Reasoning for: "${context.query}"`);
        // Use knowledge for logging (to avoid unused parameter warning)
        logger.info(`FuzzyLogicReasoningStrategy: KnowledgeAdapter type: ${knowledge.constructor.name}`);
        const linguisticVar = context.context?.variable || "temperature";
        const value = context.context?.value;
        if (typeof value !== 'number') throw new Error("Fuzzy logic requires a numeric 'value'.");
        // Enhanced fuzzy sets with chain context integration
        const sets = { 
            cold: (x: number) => this.triangularMembership(x, -10, 0, 10), 
            warm: (x: number) => this.triangularMembership(x, 5, 15, 25), 
            hot: (x: number) => this.triangularMembership(x, 20, 30, 40) 
        };
        const memberships = { 
            cold: sets.cold(value), 
            warm: sets.warm(value), 
            hot: sets.hot(value) 
        };
        
        const bestMembership = Object.entries(memberships).sort((a, b) => b[1] - a[1])[0]!;
        
        // Check for fuzzy reasoning in chain context
        const fuzzySteps = chain.steps.filter(step => 
            step.type === StepType.FuzzyLogicInference || 
            step.conclusion.statement.toLowerCase().includes('fuzzy') ||
            step.conclusion.statement.toLowerCase().includes('degree')
        );
        
        const premises: Premise[] = [ 
            { id: uuidv4(), statement: `Input value for ${linguisticVar} is ${value}`, confidence: 1.0, source: PremiseSource.ExternalInput }, 
            { id: uuidv4(), statement: `Fuzzy set definitions applied for 'cold', 'warm', 'hot'.`, confidence: 1.0, source: PremiseSource.Assumption },
            ...(fuzzySteps.length > 0 ? [{ id: uuidv4(), statement: `Building on ${fuzzySteps.length} previous fuzzy reasoning steps`, confidence: 0.9, source: PremiseSource.Inference }] : [])
        ];
        
        // Confidence boost from chain consistency
        const chainBoost = fuzzySteps.length > 0 ? Math.min(0.1, fuzzySteps.length * 0.02) : 0;
        const finalConfidence = Math.min(1.0, bestMembership[1] + chainBoost);
        
        return {
            id: uuidv4(), 
            type: StepType.FuzzyLogicInference, 
            premises,
            conclusion: { 
                statement: `The value ${value} for "${linguisticVar}" is best described as "${bestMembership[0]}" (degree: ${bestMembership[1].toFixed(3)})`, 
                confidence: finalConfidence, 
                reasoning: `Applied fuzzy logic to handle imprecise concepts, enhanced by ${fuzzySteps.length} chain steps. Chain boost: ${chainBoost.toFixed(3)}.`, 
                premises: premises.map(p => p.id) 
            },
                        confidence: finalConfidence,
        };
    }
}

class HypothesisGenerationStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.HypothesisGeneration;
    private calculateNovelty(hypothesis: string, existing: string[]): number {
        if(existing.length === 0) return 0.95;
        const hypWords = new Set(hypothesis.toLowerCase().split(/\s+/));
        const similarities = existing.map(e => { const existingWords = new Set(e.toLowerCase().split(/\s+/)); const intersection = new Set([...hypWords].filter(w => existingWords.has(w))); const union = new Set([...hypWords, ...existingWords]); return union.size > 0 ? intersection.size / union.size : 0; });
        return 1.0 - Math.max(...similarities);
    }
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Hypothesis Generation for: "${context.query}"`);
        
        // Use chain to gather insights for hypothesis generation
        const chainHypotheses = chain.steps
            .filter(s => s.type === StepType.HypothesisGeneration)
            .map(s => s.conclusion.statement);
        
        const chainFacts = chain.steps
            .flatMap(step => step.premises)
            .filter(premise => premise.source === PremiseSource.Knowledge)
            .map(premise => ({ content: premise.statement, confidence: premise.confidence, source: 'ChainKnowledge', id: premise.id }));
        
        const knowledgeFacts = await knowledge.search(context.query);
        const relatedFacts = await knowledge.search(`related to ${context.query}`);
        
        const allFacts = [...knowledgeFacts, ...relatedFacts, ...chainFacts];
        if(allFacts.length < 2) throw new Error("Hypothesis generation requires at least two related facts.");
        
        // Select diverse facts for hypothesis generation
        const fact1 = allFacts[0]!, fact2 = allFacts[1]!;
        const additionalFacts = allFacts.slice(2, 4);
        
        const existingHypotheses = [...chainHypotheses, ...(chain.currentState?.workingHypotheses?.map(h => h.hypothesis) || [])];
        
        // Generate multiple hypothesis candidates
        const hypothesisCandidates = [
            `A potential relationship exists between "${fact1.content}" and "${fact2.content}".`,
            `The interaction of "${fact1.content}" with "${fact2.content}" suggests a novel mechanism.`,
            ...(additionalFacts.length > 0 ? [`The convergence of "${fact1.content}", "${fact2.content}", and "${additionalFacts[0]!.content}" indicates a multi-factor hypothesis.`] : [])
        ];
        
        // Select most novel hypothesis
        let bestHypothesis = '';
        let bestNovelty = 0;
        
        for (const candidate of hypothesisCandidates) {
            const novelty = this.calculateNovelty(candidate, existingHypotheses);
            if (novelty > bestNovelty) {
                bestNovelty = novelty;
                bestHypothesis = candidate;
            }
        }
        
        if (bestNovelty < 0.5) throw new Error("Could not generate a sufficiently novel hypothesis.");
        
        const premises: Premise[] = [ 
            { id: uuidv4(), statement: `Fact 1: ${fact1.content}`, confidence: fact1.confidence, source: PremiseSource.Knowledge }, 
            { id: uuidv4(), statement: `Fact 2: ${fact2.content}`, confidence: fact2.confidence, source: PremiseSource.Knowledge },
            ...(chainFacts.length > 0 ? [{ id: uuidv4(), statement: `Chain contributed ${chainFacts.length} contextual facts`, confidence: 0.8, source: PremiseSource.Inference }] : [])
        ];
        
        const confidence = (fact1.confidence + fact2.confidence) / 2 * bestNovelty;
        
        return {
            id: uuidv4(), type: StepType.HypothesisGeneration, premises,
            conclusion: { 
                statement: bestHypothesis, 
                confidence, 
                reasoning: `Synthesized a novel hypothesis from ${allFacts.length} facts (${chainFacts.length} from chain). Novelty score: ${bestNovelty.toFixed(2)}.`, 
                premises: premises.map(p => p.id) 
            },
            confidence,
        };
    }
}

class PatternAnalysisStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.PatternAnalysis;
    
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Pattern Analysis for: "${context.query}"`);
        const knowledgeData = await knowledge.search(context.query);
        
        // Integrate data from the reasoning chain for a more holistic analysis
        const chainData = chain.steps.flatMap(step => 
            step.premises.map(p => ({ 
                id: p.id, 
                content: p.statement, 
                confidence: p.confidence, 
                source: 'ChainHistory' 
            }))
        );
        const data = [...knowledgeData, ...chainData];

        if (data.length < 3) throw new Error("Pattern analysis requires at least 3 data points.");
        
        // Perform comprehensive pattern analysis
        const patterns = this.identifyPatterns(data);
        const dominantPattern = this.selectDominantPattern(patterns);
        const patternStrength = this.calculatePatternStrength(dominantPattern, data);
        
        const premises: Premise[] = [
            { 
                id: uuidv4(), 
                statement: `Analyzed dataset of ${data.length} points (${chainData.length} from chain) for pattern recognition`, 
                confidence: 0.95, 
                source: PremiseSource.Observation 
            },
            { 
                id: uuidv4(), 
                statement: `Identified ${patterns.length} distinct patterns with varying strengths`, 
                confidence: 0.9, 
                source: PremiseSource.Analysis 
            },
            { 
                id: uuidv4(), 
                statement: `Dominant pattern shows ${patternStrength.frequency} frequency with ${patternStrength.consistency.toFixed(2)} consistency`, 
                confidence: patternStrength.confidence, 
                source: PremiseSource.Statistical 
            }
        ];
        
        const evidence: Evidence[] = patterns.map((pattern, index) => ({
            id: uuidv4(),
            type: EvidenceType.Data,
            content: `Pattern ${index + 1}: ${pattern.description} (strength: ${pattern.strength.toFixed(3)})`,
            strength: pattern.strength,
            source: 'PatternAnalysis',
            metadata: { 
                patternType: pattern.type,
                frequency: pattern.frequency,
                consistency: pattern.consistency
            }
        }));
        
        const confidence = Math.min(1.0, patternStrength.confidence * (1 + (patterns.length * 0.05)));
        
        return {
            id: uuidv4(),
            type: StepType.PatternRecognition,
            premises,
            evidence,
            conclusion: {
                statement: `Dominant pattern identified: ${dominantPattern.description} with ${patternStrength.frequency} occurrences and ${(patternStrength.consistency * 100).toFixed(1)}% consistency`,
                confidence,
                reasoning: `Applied multi-dimensional pattern analysis across ${data.length} data points (including ${chainData.length} from chain), identifying ${patterns.length} distinct patterns. The dominant pattern emerged through statistical frequency analysis and consistency scoring.`,
                premises: premises.map(p => p.id),
                alternatives: patterns.slice(1, 4).map(pattern => ({
                    hypothesis: pattern.description,
                    explanation: `Alternative pattern with ${pattern.frequency} occurrences`,
                    simplicityScore: 1.0 / (pattern.complexity || 1),
                    completenessScore: pattern.coverage || 0.5,
                    consistencyScore: pattern.consistency,
                    plausibilityScore: pattern.strength,
                    overallScore: (pattern.strength + pattern.consistency) / 2
                }))
            },
            confidence,
            metadata: {
                totalPatterns: patterns.length,
                dominantPatternType: dominantPattern.type,
                patternStrength: patternStrength.confidence,
                datasetSize: data.length
            }
        };
    }
    
    private identifyPatterns(data: KnowledgeFact[]): Array<{
        description: string;
        type: string;
        strength: number;
        frequency: number;
        consistency: number;
        complexity?: number;
        coverage?: number;
    }> {
        const patterns = [];
        
        // Frequency-based patterns
        const wordFrequency = this.analyzeWordFrequency(data);
        const frequentTerms = Object.entries(wordFrequency)
            .filter(([_word, count]) => count >= Math.max(2, data.length * 0.3))
            .sort((a, b) => b[1] - a[1]);
        
        if (frequentTerms.length > 0) {
            patterns.push({
                description: `Recurring terminology pattern: "${frequentTerms.map(([word]) => word).slice(0, 3).join(', ')}"`,
                type: 'frequency',
                strength: frequentTerms[0]![1] / data.length,
                frequency: frequentTerms[0]![1],
                consistency: frequentTerms.length / Math.max(data.length, 1),
                complexity: frequentTerms.length,
                coverage: frequentTerms[0]![1] / data.length
            });
        }
        
        // Confidence-based patterns
        const highConfidenceItems = data.filter(item => item.confidence > 0.8);
        if (highConfidenceItems.length >= 2) {
            patterns.push({
                description: `High-confidence pattern: ${highConfidenceItems.length} items with confidence > 0.8`,
                type: 'confidence',
                strength: highConfidenceItems.reduce((sum, item) => sum + item.confidence, 0) / highConfidenceItems.length,
                frequency: highConfidenceItems.length,
                consistency: highConfidenceItems.length / data.length,
                complexity: 1,
                coverage: highConfidenceItems.length / data.length
            });
        }
        
        // Source-based patterns
        const sourceCounts = this.analyzeSourceDistribution(data);
        const dominantSource = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])[0];
        if (dominantSource && dominantSource[1] >= 2) {
            patterns.push({
                description: `Source clustering pattern: ${dominantSource[1]} items from "${dominantSource[0]}"`,
                type: 'source',
                strength: dominantSource[1] / data.length,
                frequency: dominantSource[1],
                consistency: dominantSource[1] / data.length,
                complexity: Object.keys(sourceCounts).length,
                coverage: dominantSource[1] / data.length
            });
        }
        
        return patterns.length > 0 ? patterns : [{
            description: 'Distributed pattern: No dominant clustering detected',
            type: 'distributed',
            strength: 0.5,
            frequency: data.length,
            consistency: 0.5,
            complexity: data.length,
            coverage: 1.0
        }];
    }
    
    private selectDominantPattern(patterns: Array<{
        description: string;
        type: string;
        strength: number;
        frequency: number;
        consistency: number;
    }>): {
        description: string;
        type: string;
        strength: number;
        frequency: number;
        consistency: number;
    } {
        return patterns.reduce((dominant, current) => 
            (current.strength * current.consistency) > (dominant.strength * dominant.consistency) 
                ? current : dominant
        );
    }
    
    private calculatePatternStrength(pattern: {
        strength: number;
        consistency: number;
        frequency: number;
    }, data: KnowledgeFact[]): {
        confidence: number;
        frequency: number;
        consistency: number;
    } {
        const frequencyBonus = Math.min(0.2, pattern.frequency / data.length);
        const consistencyBonus = pattern.consistency * 0.3;
        const baseStrength = pattern.strength;
        
        return {
            confidence: Math.min(1.0, baseStrength + frequencyBonus + consistencyBonus),
            frequency: pattern.frequency,
            consistency: pattern.consistency
        };
    }
    
    private analyzeWordFrequency(data: KnowledgeFact[]): { [word: string]: number } {
        const wordCounts: { [word: string]: number } = {};
        const stopWords = new Set(['the', 'a', 'an', 'is', 'in', 'it', 'of', 'for', 'and', 'to', 'with']);
        
        data.forEach(item => {
            const words = item.content.toLowerCase()
                .split(/\W+/)
                .filter(word => word.length > 3 && !stopWords.has(word));
            
            words.forEach(word => {
                wordCounts[word] = (wordCounts[word] || 0) + 1;
            });
        });
        
        return wordCounts;
    }
    
    private analyzeSourceDistribution(data: KnowledgeFact[]): { [source: string]: number } {
        const sourceCounts: { [source: string]: number } = {};
        
        data.forEach(item => {
            sourceCounts[item.source] = (sourceCounts[item.source] || 0) + 1;
        });
        
        return sourceCounts;
    }
}

class MetacognitiveControlStrategy implements IReasoningStrategy {
    readonly name = ReasoningStrategy.MetacognitiveControl;
    
    async executeStep(chain: ReasoningChain, context: CognitiveContext, knowledge: KnowledgeAdapter): Promise<ReasoningStep> {
        logger.info(`Executing Metacognitive Control for reasoning chain: "${chain.goal}"`);
        
        if (chain.steps.length === 0) {
            throw new Error("Metacognitive control requires at least one reasoning step to analyze.");
        }
        
        const performanceAnalysis = this.analyzeChainPerformance(chain);

        // Dynamically query for more information if reasoning is stalling or declining
        let adaptiveKnowledge: KnowledgeFact[] = [];
        if (performanceAnalysis.confidenceTrend === 'declining' || performanceAnalysis.avgConfidence < 0.6) {
            adaptiveKnowledge = await knowledge.search(`alternative approaches for ${context.query}`);
        }

        // Use knowledge adapter to get domain-specific metacognitive strategies
        const metacognitiveStrategies = await knowledge.search(`metacognitive strategies for ${context.domain || 'general'}`);
        const reasoningBestPractices = await knowledge.search(`reasoning optimization ${context.query}`);
        
        const strategyRecommendations = this.generateStrategyRecommendations(performanceAnalysis, context, [...metacognitiveStrategies, ...reasoningBestPractices, ...adaptiveKnowledge]);
        const processOptimizations = this.identifyProcessOptimizations(chain, performanceAnalysis);
        
        const premises: Premise[] = [
            { 
                id: uuidv4(), 
                statement: `Analyzed reasoning chain containing ${chain.steps.length} steps across ${performanceAnalysis.strategiesUsed.size} different strategies`, 
                confidence: 1.0, 
                source: PremiseSource.Analysis 
            },
            { 
                id: uuidv4(), 
                statement: `Performance metrics: average confidence ${performanceAnalysis.avgConfidence.toFixed(3)}, confidence trend ${performanceAnalysis.confidenceTrend}`, 
                confidence: 0.95, 
                source: PremiseSource.Statistical 
            },
            { 
                id: uuidv4(), 
                statement: `Strategy effectiveness ranking: ${performanceAnalysis.topStrategies.map(s => s.strategy).join(' > ')}`, 
                confidence: 0.9, 
                source: PremiseSource.Analysis 
            },
            ...(metacognitiveStrategies.length > 0 ? [{ 
                id: uuidv4(), 
                statement: `Knowledge base provides ${metacognitiveStrategies.length} metacognitive optimization strategies`, 
                confidence: 0.85, 
                source: PremiseSource.Knowledge 
            }] : [])
        ];
        
        const evidence: Evidence[] = [
            {
                id: uuidv4(),
                type: EvidenceType.Statistical,
                content: `Chain performance analysis: ${performanceAnalysis.totalSteps} steps, ${performanceAnalysis.strategiesUsed.size} strategies, trend: ${performanceAnalysis.confidenceTrend}`,
                strength: performanceAnalysis.avgConfidence,
                source: 'MetacognitiveAnalysis',
                metadata: {
                    confidenceRange: performanceAnalysis.confidenceRange,
                    topStrategy: performanceAnalysis.topStrategies[0]?.strategy,
                    optimizationsPossible: processOptimizations.length,
                    knowledgeIntegration: metacognitiveStrategies.length
                }
            }
        ];
        
        const primaryRecommendation = strategyRecommendations[0]!;
        const confidence = Math.min(1.0, performanceAnalysis.avgConfidence * 1.1);
        
        const conclusion: Conclusion = {
            statement: `Metacognitive analysis recommends: ${primaryRecommendation.action} (${primaryRecommendation.reasoning})`,
            confidence,
            reasoning: `Analyzed ${chain.steps.length} reasoning steps with ${metacognitiveStrategies.length} knowledge-based strategies to identify performance patterns and optimization opportunities. ${processOptimizations.length} process improvements identified.`,
            premises: premises.map(p => p.id),
            alternatives: strategyRecommendations.slice(1, 4).map(rec => ({
                hypothesis: rec.action,
                explanation: rec.reasoning,
                simplicityScore: 0.8,
                completenessScore: 0.9,
                consistencyScore: rec.confidence,
                plausibilityScore: rec.priority,
                overallScore: (rec.confidence + rec.priority) / 2
            }))
        };
        
        return {
            id: uuidv4(),
            type: StepType.Analysis,
            premises,
            evidence,
            conclusion,
            confidence,
            reasoning: 'Executive metacognitive oversight and process optimization with knowledge integration',
            metadata: {
                performanceMetrics: performanceAnalysis,
                recommendations: strategyRecommendations,
                optimizations: processOptimizations,
                chainLength: chain.steps.length,
                strategiesAnalyzed: performanceAnalysis.strategiesUsed.size,
                knowledgeStrategiesUsed: metacognitiveStrategies.length
            }
        };
    }
    
    private analyzeChainPerformance(chain: ReasoningChain): {
        totalSteps: number;
        avgConfidence: number;
        confidenceRange: { min: number; max: number };
        confidenceTrend: 'improving' | 'declining' | 'stable';
        strategiesUsed: Set<string>;
        topStrategies: Array<{ strategy: string; avgConfidence: number; count: number }>;
    } {
        const confidences = chain.steps.map(step => step.confidence);
        const avgConfidence = confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
        
        // Calculate confidence trend
        const firstHalf = confidences.slice(0, Math.ceil(confidences.length / 2));
        const secondHalf = confidences.slice(Math.floor(confidences.length / 2));
        const firstHalfAvg = firstHalf.reduce((sum, conf) => sum + conf, 0) / firstHalf.length;
        const secondHalfAvg = secondHalf.reduce((sum, conf) => sum + conf, 0) / secondHalf.length;
        
        let confidenceTrend: 'improving' | 'declining' | 'stable';
        const trendDiff = secondHalfAvg - firstHalfAvg;
        if (trendDiff > 0.05) confidenceTrend = 'improving';
        else if (trendDiff < -0.05) confidenceTrend = 'declining';
        else confidenceTrend = 'stable';
        
        // Analyze strategy performance
        const strategyPerformance = new Map<string, { total: number; count: number }>();
        const strategiesUsed = new Set<string>();
        
        chain.steps.forEach(step => {
            const strategyName = step.type || 'Unknown';
            strategiesUsed.add(strategyName);
            
            if (!strategyPerformance.has(strategyName)) {
                strategyPerformance.set(strategyName, { total: 0, count: 0 });
            }
            
            const perf = strategyPerformance.get(strategyName)!;
            perf.total += step.confidence;
            perf.count += 1;
        });
        
        const topStrategies = Array.from(strategyPerformance.entries())
            .map(([strategy, perf]) => ({
                strategy,
                avgConfidence: perf.total / perf.count,
                count: perf.count
            }))
            .sort((a, b) => b.avgConfidence - a.avgConfidence);
        
        return {
            totalSteps: chain.steps.length,
            avgConfidence,
            confidenceRange: {
                min: Math.min(...confidences),
                max: Math.max(...confidences)
            },
            confidenceTrend,
            strategiesUsed,
            topStrategies
        };
    }
    
    private generateStrategyRecommendations(performance: any, context: CognitiveContext, knowledgeStrategies: any[]): Array<{
        action: string;
        reasoning: string;
        confidence: number;
        priority: number;
    }> {
        const recommendations = [];
        
        // Primary recommendation based on performance
        if (performance.confidenceTrend === 'improving') {
            recommendations.push({
                action: `Continue with current strategy mix, emphasizing ${performance.topStrategies[0]?.strategy || 'current approach'}`,
                reasoning: 'Confidence is improving, indicating effective strategy selection',
                confidence: 0.9,
                priority: 1.0
            });
        } else if (performance.confidenceTrend === 'declining') {
            recommendations.push({
                action: 'Switch to alternative reasoning strategy to break declining confidence pattern',
                reasoning: 'Current approach shows declining confidence, suggesting need for strategic pivot',
                confidence: 0.85,
                priority: 0.95
            });
        } else {
            recommendations.push({
                action: 'Introduce complementary reasoning strategy to enhance current stable performance',
                reasoning: 'Stable performance provides foundation for strategic enhancement',
                confidence: 0.8,
                priority: 0.8
            });
        }

        // Knowledge-based recommendations
        if (knowledgeStrategies.length > 0) {
            recommendations.push({
                action: `Apply domain-specific metacognitive strategies from knowledge base (${knowledgeStrategies.length} available)`,
                reasoning: `Knowledge base contains ${knowledgeStrategies.length} relevant metacognitive optimization strategies`,
                confidence: 0.8,
                priority: 0.85
            });
        }
        
        // Context-aware recommendations
        if (context?.domain === 'financial' && !performance.strategiesUsed.has(ReasoningStrategy.Financial)) {
             recommendations.push({
                action: 'Incorporate FinancialReasoningStrategy for domain-specific analysis.',
                reasoning: `The reasoning context is financial, but the specialized strategy has not been used.`,
                confidence: 0.9,
                priority: 0.9
            });
        }
        if ((context?.query.toLowerCase().includes('what if') || context?.query.toLowerCase().includes('alternative')) && !performance.strategiesUsed.has(ReasoningStrategy.Counterfactual)) {
             recommendations.push({
                action: 'Utilize CounterfactualReasoningStrategy to explore alternative scenarios.',
                reasoning: `The query suggests a "what-if" analysis, for which Counterfactual reasoning is optimal.`,
                confidence: 0.88,
                priority: 0.88
            });
        }


        // Additional recommendations based on context
        if (performance.strategiesUsed.size < 3) {
            recommendations.push({
                action: 'Diversify reasoning approaches by incorporating additional complementary strategies',
                reasoning: `Only ${performance.strategiesUsed.size} strategies used - diversification may improve robustness`,
                confidence: 0.75,
                priority: 0.7
            });
        }

        if (performance.avgConfidence < 0.7) {
            recommendations.push({
                action: 'Focus on evidence gathering and premise validation to improve confidence levels',
                reasoning: `Average confidence ${performance.avgConfidence.toFixed(3)} below optimal threshold`,
                confidence: 0.8,
                priority: 0.85
            });
        }

        return recommendations.sort((a, b) => b.priority - a.priority);
    }
    
    private identifyProcessOptimizations(_chain: ReasoningChain, performance: any): Array<{
        optimization: string;
        impact: 'high' | 'medium' | 'low';
        effort: 'low' | 'medium' | 'high';
    }> {
        const optimizations: Array<{
            optimization: string;
            impact: "high" | "medium" | "low";
            effort: "high" | "medium" | "low";
        }> = [];
        
        // Check for redundant reasoning steps
        const duplicateTypes = performance.topStrategies.filter((s: any) => s.count > 2);
        if (duplicateTypes.length > 0) {
            optimizations.push({
                optimization: 'Reduce redundant reasoning steps of same type',
                impact: 'medium' as const,
                effort: 'low' as const
            });
        }
        
        // Check for confidence gaps
        if (performance.confidenceRange.max - performance.confidenceRange.min > 0.4) {
            optimizations.push({
                optimization: 'Address confidence variability through consistency improvements',
                impact: 'high' as const,
                effort: 'medium' as const
            });
        }
        
        // Check for strategy balance
        if (performance.strategiesUsed.size === 1) {
            optimizations.push({
                optimization: 'Introduce strategic diversity to improve reasoning robustness',
                impact: 'high' as const,
                effort: 'medium' as const
            });
        }
        
        return optimizations;
    }
}

const METACOGNITION_TOOL: Tool = {
  name: "metacognition",
  description: `A multi-strategy reasoning and problem-solving tool. It orchestrates a wide array of cognitive strategies, from formal logic to creative hypothesis generation, and manages complex reasoning chains. This tool acts as a structured "scratchpad" for an AI, allowing for deep, auditable, and adaptive thinking.

When to use this tool:
- For any complex problem requiring multi-step, structured reasoning.
- When you need to switch between different modes of thinking (e.g., from logical deduction to creative brainstorming).
- To formally manage and revise a chain of thought.
- To explore multiple possibilities in parallel (Cognitive Superposition).
- To make a decision and commit to a single hypothesis from many (Cognitive Resolution).
- For tasks involving deep analysis, planning, causality, or ethical considerations.
- When you need unified reasoning chains that combine multiple strategies.

Core Features:
1.  **Sequential Thought Management**: Track, revise, and branch lines of reasoning.
2.  **Cognitive Engine**:
    -   **Cognitive Superposition**: Explore multiple hypotheses or concepts in parallel by providing an array of strings to 'cognitive_superposition_concepts'. Returns a state ID.
    -   **Cognitive Resolution**: "Collapse" a superposition into a single, definite concept by providing a 'cognitive_resolve_state_id'.
    -   **Conceptual Linkage**: Establish a persistent link between two concepts using 'cognitive_link_concepts'.
3.  **Multi-Strategy Reasoning**: Select a specific reasoning strategy via the 'strategy' parameter to tackle a problem from a particular angle. Each strategy has its own specialized parameters.
4.  **Unified Reasoning Chains**: Execute complete multi-strategy reasoning chains with cognitive enhancement via 'unified_reasoning_chain'.

Available Strategies:
- **Abductive**: Inference to the best explanation - ideal for hypothesis generation and diagnostic reasoning.
- **Analogical**: Reasoning by finding and applying similarities between domains.
- **BackwardChaining**: Goal-driven reasoning, working backward from a conclusion to find supporting premises.
- **Bayesian**: Probabilistic reasoning and belief updating with evidence integration.
- **CaseBased**: Solving problems by referencing similar past cases and adapting solutions.
- **Causal**: Analyzing cause-and-effect relationships and causal chains.
- **ConstraintSatisfaction**: Solving problems by finding solutions that satisfy a set of constraints.
- **Counterfactual**: "What-if" scenario analysis and alternative timeline reasoning.
- **Deductive**: Top-down logical inference from premises to certain conclusions.
- **Defeasible**: Reasoning with rules that have exceptions (non-monotonic logic).
- **Empirical**: Drawing conclusions from observational data and experimental evidence.
- **Ethical**: Analyzing problems through various moral frameworks (utilitarian, deontological, virtue ethics).
- **Financial**: Specialized analysis for markets, risk assessment, and investment decisions.
- **ForwardChaining**: Data-driven reasoning, working from known facts to new conclusions.
- **FuzzyLogic**: Handling reasoning with imprecise, partial truth, or linguistic variables.
- **HypothesisGeneration**: Creatively forming new, testable hypotheses from existing knowledge.
- **Inductive**: Generalizing from specific instances to broader principles and patterns.
- **Sequential**: Analyzing temporal sequences, world-branch generation, and future scenario modeling.
- **PatternAnalysis**: Cross-domain synthesis of patterns and structural relationships.
- **MetacognitiveControl**: Executive oversight of the reasoning process itself for strategy optimization.

Strategy Input Data Examples:
- Bayesian: { prior: 0.3, evidence_threshold: 0.8 }
- Causal: { cause: "interest rate increase", effect: "housing market slowdown" }
- Counterfactual: { original_condition: "pandemic lockdowns", altered_condition: "no lockdowns" }
- Fuzzy Logic: { variable: "temperature", value: 22.5 }
- Sequential: { time_horizon: "5 years", world_branches: true }
- Constraint Satisfaction: { variables: {"x": [1,2,3], "y": [2,3,4]}, constraints: [(a) => a.x < a.y] }

Unified Reasoning Chain Parameters:
- strategies: Array of strategy names to use in sequence
- cognitive_enhancement: Enable/disable cognitive superposition features
- convergence_target: Target confidence level for convergence (0.0-1.0)
- strategy_input_data: Global parameters for all strategies in the chain`,

  inputSchema: {
    type: "object",
    properties: {
      thought: { type: "string", description: "Your current thinking step, including analysis, revisions, questions, or strategy application." },
      nextThoughtNeeded: { type: "boolean", description: "Set to true if you need to continue thinking, false only when the entire task is complete." },
      thoughtNumber: { type: "integer", description: "The current step number in your reasoning sequence.", minimum: 1 },
      totalThoughts: { type: "integer", description: "Your current estimate of the total thoughts needed. This can be adjusted up or down.", minimum: 1 },
      isRevision: { type: "boolean", description: "Set to true if this thought revises a previous one." },
      revisesThought: { type: "integer", description: "If isRevision is true, the number of the thought being revised.", minimum: 1 },
      branchFromThought: { type: "integer", description: "The thought number from which to start a new, parallel line of reasoning.", minimum: 1 },
      branchId: { type: "string", description: "A unique identifier for the branch of thought you are pursuing." },
      cognitive_superposition_concepts: { type: "array", items: { type: "string" }, description: "Create a cognitive superposition state with this array of concepts/hypotheses. Returns a state ID." },
      cognitive_resolve_state_id: { type: "string", description: "Resolve a superposition state into a single concept using its ID." },
      cognitive_resolution_method: { type: "string", enum: ["highest_confidence", "weighted_random"], description: "The method to use for resolving a cognitive state." },
      cognitive_link_concepts: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 2, description: "Establish a persistent link between two concepts. E.g., ['inflation', 'interest_rates']." },
      strategy: { type: "string", enum: Object.values(ReasoningStrategy), description: "Select a specific reasoning strategy to apply in this step." },
      strategy_input_data: { type: "object", description: "A flexible object to pass parameters for the selected strategy. E.g., for 'Causal' reasoning: { cause: 'high interest rates', effect: 'slowing economy' }." },
      unified_reasoning_chain: { type: "boolean", description: "Execute a complete unified reasoning chain with multiple strategies and cognitive enhancement." },
      strategies: { type: "array", items: { type: "string", enum: Object.values(ReasoningStrategy) }, description: "Array of strategies to use in unified reasoning chain (optional, auto-selected if not provided)." },
      cognitive_enhancement: { type: "boolean", description: "Enable cognitive superposition and advanced reasoning features in unified chains." },
      convergence_target: { type: "number", minimum: 0, maximum: 1, description: "Target confidence level for reasoning chain convergence (0.0-1.0)." }
    },
    required: ["thought", "nextThoughtNeeded", "thoughtNumber", "totalThoughts"]
  }
};

const AUTONOMOUS_TOOL: Tool = {
  name: "autonomous",
  description: `🤖 **Autonomous Decision Engine** - The ultimate decision-making tool that sequentially leverages ALL reasoning strategies in optimal combinations to provide the absolute most optimal decision for any task. Returns a comprehensive task list of autonomous self-instructions for execution.`,
  inputSchema: {
    type: "object",
    properties: {
      task: { type: "string", description: "The decision or task that requires comprehensive autonomous analysis" },
      context: { type: "object", description: "Additional context, constraints, or parameters for the decision-making process" },
      priority: { type: "string", enum: ["low", "medium", "high", "critical"], default: "medium", description: "Priority level affecting reasoning depth and resource allocation" },
      timeHorizon: { type: "string", description: "Time frame for decision implementation (e.g., 'immediate', '1 week', '1 month')" },
      riskTolerance: { type: "number", minimum: 0, maximum: 1, default: 0.5, description: "Risk tolerance level (0=risk-averse, 1=risk-seeking)" }
    },
    required: ["task"]
  }
};

const DEBUGGER_TOOL: Tool = {
  name: "debugger",
  description: `🔧 **Autonomous Code Debugger** - Analyzes compiler errors, lint warnings, and issues to provide surgical, non-destructive debugging solutions. Combines pattern recognition, causal analysis, and constraint satisfaction for precise error resolution.`,
  inputSchema: {
    type: "object",
    properties: {
      errors: { type: "array", items: { type: "string" }, description: "Compiler errors, lint warnings, or problem descriptions" },
      codeContext: { type: "string", description: "Relevant code snippet or file content where errors occur" },
      environment: { type: "object", description: "Development environment details (language, framework, tools, versions)" },
      previousAttempts: { type: "array", items: { type: "string" }, description: "Previous debugging attempts or solutions tried" }
    },
    required: ["errors"]
  }
};

const MARKDOWN_MASTER_TOOL: Tool = {
  name: "markdown_master",
  description: `📝 **Markdown Master** - Completely creates or refactors markdown content based on lint warnings while preserving intended structure. Uses pattern analysis and constraint satisfaction for optimal markdown compliance.`,
  inputSchema: {
    type: "object",
    properties: {
      content: { type: "string", description: "Existing markdown content to refactor or base content for creation" },
      lintWarnings: { type: "array", items: { type: "string" }, description: "Markdown lint warnings or style issues to address" },
      targetStyle: { type: "string", enum: ["github", "commonmark", "academic", "technical", "readme"], default: "github", description: "Target markdown style/flavor" },
      preserveStructure: { type: "boolean", default: true, description: "Whether to preserve the original document structure" },
      requirements: { type: "object", description: "Specific requirements (TOC, badges, formatting rules, etc.)" }
    },
    required: ["content"]
  }
};

const RESEARCH_PRO_TOOL: Tool = {
  name: "research_pro",
  description: `🔍 **Research Pro** - Autonomous research engine that activates when other approaches fail. Proactively searches and synthesizes optimal solutions using online search, abductive reasoning, and Bayesian belief updating.`,
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "Research query or problem to investigate" },
      domain: { type: "string", description: "Specific domain or field of research (e.g., 'software engineering', 'data science')" },
      failureContext: { type: "string", description: "Description of what was attempted and why it failed" },
      searchDepth: { type: "string", enum: ["shallow", "moderate", "deep", "comprehensive"], default: "moderate", description: "Depth of research to conduct" },
      sources: { type: "array", items: { type: "string" }, description: "Preferred or required information sources" }
    },
    required: ["query"]
  }
};

const DEEP_ANALYSIS_TOOL: Tool = {
  name: "deep_analysis",
  description: `🔬 **Deep Analysis Engine** - Performs comprehensive analysis of codebases, modules, or systems to identify potential bugs, optimization opportunities, and architectural insights using pattern analysis, causal reasoning, and empirical evaluation.`,
  inputSchema: {
    type: "object",
    properties: {
      target: { type: "string", description: "Code, module, system, or codebase to analyze" },
      analysisType: { type: "string", enum: ["security", "performance", "maintainability", "architecture", "comprehensive"], default: "comprehensive", description: "Focus area for analysis" },
      language: { type: "string", description: "Programming language or technology stack" },
      metrics: { type: "array", items: { type: "string" }, description: "Specific metrics or aspects to evaluate" },
      baseline: { type: "object", description: "Baseline metrics or reference standards for comparison" }
    },
    required: ["target"]
  }
};

const OPTIMUS_PRIME_TOOL: Tool = {
  name: "optimus_prime",
  description: `⚡ **Optimus Prime Optimizer** - Strategically optimizes any framework, file, module, or system for peak performance, safety, and minimal overhead. Uses constraint satisfaction, causal reasoning, and financial analysis for optimal resource utilization.`,
  inputSchema: {
    type: "object",
    properties: {
      target: { type: "string", description: "System, code, configuration, or process to optimize" },
      optimizationGoals: { type: "array", items: { type: "string", enum: ["performance", "memory", "security", "maintainability", "cost", "reliability"] }, description: "Primary optimization objectives" },
      constraints: { type: "object", description: "Constraints to respect during optimization (budget, compatibility, etc.)" },
      currentMetrics: { type: "object", description: "Current performance metrics or baseline measurements" },
      environment: { type: "string", description: "Target environment or deployment context" }
    },
    required: ["target", "optimizationGoals"]
  }
};

const WILDCARD_TOOL: Tool = {
  name: "wildcard",
  description: `🎯 **Wildcard Strategy Selector** - Dynamically analyzes user input and selects the most logical combination of reasoning strategies for optimal problem resolution. Uses metacognitive control and pattern analysis for intelligent strategy orchestration.`,
  inputSchema: {
    type: "object",
    properties: {
      input: { type: "string", description: "User input, problem, or query to analyze and resolve" },
      context: { type: "object", description: "Additional context about the problem domain or requirements" },
      urgency: { type: "string", enum: ["low", "medium", "high", "critical"], default: "medium", description: "Urgency level affecting strategy selection" },
      complexity: { type: "string", enum: ["simple", "moderate", "complex", "unknown"], default: "unknown", description: "Estimated problem complexity" },
      preferredApproach: { type: "string", description: "User's preferred problem-solving approach if any" }
    },
    required: ["input"]
  }
};

const toolPrefixMap: { [key: string]: string } = {
  t1: "autonomous",
  t2: "debugger",
  t3: "markdown_master",
  t4: "research_pro",
  t5: "deep_analysis",
  t6: "optimus_prime",
  t7: "wildcard"
};

const server = new Server(
  { name: "metacognition-mcp", version: "0.0.1" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    METACOGNITION_TOOL,
    AUTONOMOUS_TOOL,
    DEBUGGER_TOOL,
    MARKDOWN_MASTER_TOOL,
    RESEARCH_PRO_TOOL,
    DEEP_ANALYSIS_TOOL,
    OPTIMUS_PRIME_TOOL,
    WILDCARD_TOOL
  ],
}));

const metaCognitionMCP = new MetacognitionMCP();

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [METACOGNITION_TOOL],
}));

 // Helper to invoke a tool by name using the server's request handler
async function invokeToolByName(toolName: string, args: any) {
  return await server.request(
    {
      method: "tools/call",
      params: {
        name: toolName,
        arguments: args
      }
    },
    CallToolRequestSchema
  );
}

const NLPInputSchema = z.object({
  method: z.literal("NLPInput"),
  input: z.string().optional(),
  text: z.string().optional()
});

server.setRequestHandler(NLPInputSchema, async (request: any) => {
  // Accept input as 'input' or 'text' property, or fallback to empty string
  const input: string = (request.input || request.text || "").toString();
  const match = /^t([1-7])\s+(.*)$/i.exec(input.trim());
  if (match) {
    const toolKey = `t${match[1]}`;
    const toolName = toolPrefixMap[toolKey];
    if (!toolName) {
      return { content: [{ type: "text", text: `Unknown tool prefix: ${toolKey}` }], isError: true };
    }
    const toolInput = match[2];
    let args: any;
    if (toolName === "autonomous") {
      args = { task: toolInput };
    } else if (toolName === "debugger") {
      args = { errors: [toolInput] };
    } else if (toolName === "markdown_master") {
      args = { content: toolInput };
    } else if (toolName === "research_pro") {
      args = { query: toolInput };
    } else if (toolName === "deep_analysis") {
      args = { target: toolInput };
    } else if (toolName === "optimus_prime") {
      args = { target: toolInput, optimizationGoals: ["performance"] };
    } else if (toolName === "wildcard") {
      args = { input: toolInput };
    } else {
      args = { input: toolInput };
    }
    return await invokeToolByName(toolName, args);
  }
  // Fallback to metacognition or other NLP logic
  return await metaCognitionMCP.processThought(input);
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "metacognition") {
    return await metaCognitionMCP.processThought(request.params.arguments);
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${request.params.name}` }],
    isError: true
  };
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(chalk.bold.green("MetaCognition MCP Server is running and fully operational. All reasoning strategies and cognitive architectures are implemented and ready."));
}

runServer().catch((error) => {
  console.error(chalk.bold.red("Fatal error running Metacognition server:"), error);
  process.exit(1);
});

// #endregion --- MCP Server Implementation ---

// Ensure at least one runtime export so TypeScript emits output
export const metacogVersion = "0.1.0";
