'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Zap, Volume2 } from 'lucide-react';

interface ControlsProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onSimulateNormal?: () => void;
  onSimulateLeak?: () => void;
  loading?: boolean;
}

export function AdvancedControls({
  isSimulating,
  onToggleSimulation,
  loading = false,
}: ControlsProps) {
  const [noiseLevel, setNoiseLevel] = useState(30);
  const [leakIntensity, setLeakIntensity] = useState(50);

  const handleSimulateNormal = () => {
    setLeakIntensity(0);
    onToggleSimulation();
  };

  const handleSimulateLeak = () => {
    setLeakIntensity(80);
    onToggleSimulation();
  };

  const handleReset = () => {
    setNoiseLevel(30);
    setLeakIntensity(0);
  };

  return (
    <div className="neon-border rounded-lg p-6 bg-card/50">
      <div className="mb-6">
        <h3 className="text-lg font-bold neon-glow mb-2">Simulation Control</h3>
        <p className="text-xs text-muted-foreground">
          Simulation mode - Safe testing environment
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <button
          onClick={handleSimulateNormal}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-4 py-3 font-semibold text-sm
            transition-all duration-300 flex items-center justify-center gap-2
            ${
              isSimulating
                ? 'neon-border border-2 text-green-400'
                : 'bg-green-400/20 border border-green-400/50 text-green-400 hover:border-green-400'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <CheckCircle className="w-4 h-4" />
          Normal Flow
        </button>
        <button
          onClick={handleSimulateLeak}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-4 py-3 font-semibold text-sm
            transition-all duration-300 flex items-center justify-center gap-2
            ${
              isSimulating
                ? 'neon-border border-2 text-red-500'
                : 'bg-red-500/20 border border-red-500/50 text-red-500 hover:border-red-500'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <AlertTriangle className="w-4 h-4" />
          Simulate Leak
        </button>
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-6 p-4 neon-border rounded bg-secondary/30">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Volume2 className="w-3 h-3" />
              NOISE LEVEL
            </label>
            <span className="text-sm font-mono text-cyan-400">{noiseLevel}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(Number(e.target.value))}
            className="w-full h-1 bg-secondary rounded-full accent-green-400"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
              <Zap className="w-3 h-3" />
              LEAK INTENSITY
            </label>
            <span className="text-sm font-mono text-red-500">{leakIntensity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={leakIntensity}
            onChange={(e) => setLeakIntensity(Number(e.target.value))}
            className="w-full h-1 bg-secondary rounded-full accent-red-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onToggleSimulation}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-4 py-2 font-semibold text-sm
            transition-all duration-300 flex items-center justify-center gap-2
            ${
              isSimulating
                ? 'bg-green-500/30 border border-green-400 text-green-400 neon-border'
                : 'bg-primary/30 border border-primary text-primary hover:bg-primary/50'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Play className="w-4 h-4" />
          {isSimulating ? 'ACTIVE' : 'START'}
        </button>
        <button
          onClick={handleReset}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-4 py-2 font-semibold text-sm
            transition-all duration-300 flex items-center justify-center gap-2
            border border-muted-foreground/50 text-muted-foreground hover:border-muted-foreground
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <RotateCcw className="w-4 h-4" />
          RESET
        </button>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 p-3 rounded border neon-border bg-secondary/30">
        <p className="text-xs text-muted-foreground mb-1">SIMULATION STATUS</p>
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-400 animate-pulse' : 'bg-muted-foreground'}`}
          />
          <span className="text-sm font-mono font-semibold text-foreground">
            {isSimulating ? 'RUNNING' : 'IDLE'}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper icons
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  );
}

function AlertTriangle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
