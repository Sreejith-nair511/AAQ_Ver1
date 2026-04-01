'use client';

import React from 'react';
import { TrendingUp, Zap, Radio } from 'lucide-react';

interface DecisionReasoningProps {
  data?: {
    variance: number;
    energy: number;
    rms: number;
  };
  leakDetected: boolean;
  confidence: number;
}

export function DecisionReasoning({
  data,
  leakDetected,
  confidence,
}: DecisionReasoningProps) {
  // Determine metric states
  const peakFrequency = data && data.energy > 0.5 ? 'HIGH' : 'LOW';
  const variance = data && data.variance > 0.3 ? 'HIGH' : 'LOW';
  const pattern = leakDetected ? 'IRREGULAR' : 'STABLE';

  // Get colors for metric indicators
  const getMetricColor = (value: string, isAlert: boolean) => {
    if (isAlert) {
      return value === 'HIGH' || value === 'IRREGULAR'
        ? 'text-red-400 bg-red-500/10 border-red-400/50'
        : 'text-green-400 bg-green-500/10 border-green-400/50';
    }
    return value === 'HIGH' || value === 'IRREGULAR'
      ? 'text-orange-400 bg-orange-500/10 border-orange-400/50'
      : 'text-cyan-400 bg-cyan-500/10 border-cyan-400/50';
  };

  return (
    <div className="neon-border rounded-lg p-6 bg-card/50">
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-lg font-bold neon-glow mb-2">Detection Reasoning</h3>
        <p className="text-xs text-muted-foreground">
          Why the system made this decision
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="space-y-4 mb-6">
        {/* Peak Frequency */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-3 h-3" />
              PEAK FREQUENCY
            </label>
            <span
              className={`text-xs font-mono font-bold px-2 py-1 rounded border neon-border ${getMetricColor(
                peakFrequency,
                leakDetected
              )}`}
            >
              {peakFrequency}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {peakFrequency === 'HIGH'
              ? 'Elevated frequency indicates potential leak'
              : 'Normal frequency range detected'}
          </div>
        </div>

        {/* Variance */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Zap className="w-3 h-3" />
              VARIANCE
            </label>
            <span
              className={`text-xs font-mono font-bold px-2 py-1 rounded border neon-border ${getMetricColor(
                variance,
                leakDetected
              )}`}
            >
              {variance}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {variance === 'HIGH'
              ? 'High variability suggests abnormal patterns'
              : 'Stable signal with normal variations'}
          </div>
        </div>

        {/* Pattern */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Radio className="w-3 h-3" />
              PATTERN
            </label>
            <span
              className={`text-xs font-mono font-bold px-2 py-1 rounded border neon-border ${getMetricColor(
                pattern,
                leakDetected
              )}`}
            >
              {pattern}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            {pattern === 'IRREGULAR'
              ? 'Irregular patterns match leak signature'
              : 'Consistent patterns indicate normal operation'}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50 mb-6" />

      {/* Decision Summary */}
      <div className="p-4 rounded border neon-border bg-secondary/30">
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-3 h-3 rounded-full mt-1 ${
              leakDetected
                ? 'bg-red-500 animate-pulse'
                : 'bg-green-500 animate-pulse'
            }`}
          />
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">
              FINAL DECISION
            </p>
            <p className="text-sm font-semibold text-foreground">
              {leakDetected
                ? 'LEAK DETECTED - Signature matched to known leak patterns'
                : 'SYSTEM NORMAL - All parameters within acceptable range'}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <div className="mt-4 p-3 rounded bg-secondary/20 border border-border/50">
        <p className="text-xs text-muted-foreground mb-1">RECOMMENDATION</p>
        <p className="text-sm text-foreground">
          {leakDetected
            ? 'Dispatch inspection team immediately. Review historical data for leak location.'
            : 'Continue normal monitoring. System operational and healthy.'}
        </p>
      </div>
    </div>
  );
}
