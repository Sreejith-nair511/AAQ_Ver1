'use client';

import React from 'react';
import { AlertCircle, CheckCircle, Activity } from 'lucide-react';

interface SensorData {
  rms?: number;
  variance?: number;
  energy?: number;
  confidence?: number;
  leakDetected?: boolean;
}

export function SystemIntelligence({ data }: { data: SensorData | null }) {
  const confidence = (data?.confidence || 0) * 100;
  const leakDetected = data?.leakDetected || false;

  const getClassification = () => {
    if (!leakDetected) return 'NORMAL';
    if (confidence < 50) return 'MINOR LEAK';
    if (confidence < 85) return 'MODERATE LEAK';
    return 'MAJOR LEAK';
  };

  const getSeverityColor = () => {
    if (!leakDetected) return 'text-green-400';
    if (confidence < 50) return 'text-yellow-400';
    if (confidence < 85) return 'text-orange-400';
    return 'text-red-500';
  };

  const getSeverityBorder = () => {
    if (!leakDetected) return 'border-green-400';
    if (confidence < 50) return 'border-yellow-400';
    if (confidence < 85) return 'border-orange-400';
    return 'border-red-500';
  };

  const classification = getClassification();
  const severityColor = getSeverityColor();
  const severityBorder = getSeverityBorder();

  return (
    <div className={`neon-border rounded-lg p-6 bg-card/50 border-2 ${severityBorder}`}>
      <div className="mb-6">
        <h3 className="text-lg font-bold neon-glow mb-2">System Intelligence</h3>
        <p className="text-xs text-muted-foreground">
          AI classification & confidence metrics
        </p>
      </div>

      {/* Status Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">CURRENT STATUS</p>
          <div className={`flex items-center gap-2 ${severityColor}`}>
            {leakDetected ? (
              <AlertCircle className="w-6 h-6 animate-pulse" />
            ) : (
              <CheckCircle className="w-6 h-6" />
            )}
            <span className="text-xl font-bold neon-glow">
              {leakDetected ? 'ALERT' : 'NORMAL'}
            </span>
          </div>
        </div>
        <Activity className={`w-8 h-8 ${severityColor} opacity-60`} />
      </div>

      {/* Classification */}
      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground mb-2">AI CLASSIFICATION</p>
          <div className={`border-2 rounded px-3 py-2 font-mono text-sm font-bold ${severityBorder} ${severityColor} text-center`}>
            {classification}
          </div>
        </div>

        {/* Confidence Score */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xs text-muted-foreground">CONFIDENCE</p>
            <span className={`text-sm font-bold ${severityColor}`}>
              {confidence.toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden border neon-border">
            <div
              className={`h-full transition-all duration-300 ${
                !leakDetected
                  ? 'bg-green-500'
                  : confidence < 50
                    ? 'bg-yellow-500'
                    : confidence < 85
                      ? 'bg-orange-500'
                      : 'bg-red-500'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Feature Values */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">ENERGY</p>
            <p className="font-mono text-sm font-bold text-cyan-400">
              {(data?.energy || 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">VARIANCE</p>
            <p className="font-mono text-sm font-bold text-cyan-400">
              {(data?.variance || 0).toFixed(2)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">RMS</p>
            <p className="font-mono text-sm font-bold text-cyan-400">
              {(data?.rms || 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
