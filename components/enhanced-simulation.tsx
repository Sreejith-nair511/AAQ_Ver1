'use client';

import React, { useState, useEffect } from 'react';
import { Play, AlertTriangle, Volume2, Zap, RotateCcw } from 'lucide-react';

interface EnhancedSimulationProps {
  isLeakActive: boolean;
  onSimulateNormal: () => Promise<void>;
  onSimulateLeak: (intensity?: number) => Promise<void>;
  onUpdateParams: (noise?: number, intensity?: number) => Promise<void>;
  loading?: boolean;
}

export function EnhancedSimulation({
  isLeakActive,
  onSimulateNormal,
  onSimulateLeak,
  onUpdateParams,
  loading = false,
}: EnhancedSimulationProps) {
  const [noiseLevel, setNoiseLevel] = useState(30);
  const [leakIntensity, setLeakIntensity] = useState(50);

  // Update parameters when sliders change
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdateParams(noiseLevel, leakIntensity);
    }, 300); // Debounce updates

    return () => clearTimeout(timer);
  }, [noiseLevel, leakIntensity, onUpdateParams]);

  const handleSimulateNormal = async () => {
    await onSimulateNormal();
    setLeakIntensity(0);
  };

  const handleSimulateLeak = async () => {
    setLeakIntensity(80);
    await onSimulateLeak(80);
  };

  const handleInjectNoise = async () => {
    setNoiseLevel(100);
    await onUpdateParams(100, leakIntensity);
  };

  const handleReset = () => {
    setNoiseLevel(30);
    setLeakIntensity(0);
    onUpdateParams(30, 0);
  };

  return (
    <div className="neon-border rounded-lg p-3 sm:p-4 md:p-6 bg-card/50">
      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-lg font-bold neon-glow mb-1 sm:mb-2">Simulation Control</h3>
        <p className="text-xs text-muted-foreground">
          Advanced testing parameters for system validation
        </p>
      </div>

      {/* Mode Selection Buttons */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          onClick={handleSimulateNormal}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-2 sm:px-3 py-2 sm:py-3 font-semibold text-xs sm:text-sm
            transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2
            ${
              !isLeakActive
                ? 'neon-border border-2 bg-green-500/10 text-green-400'
                : 'bg-green-400/10 border border-green-400/50 text-green-400 hover:border-green-400'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full" />
          NORMAL
        </button>

        <button
          onClick={handleSimulateLeak}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-2 sm:px-3 py-2 sm:py-3 font-semibold text-xs sm:text-sm
            transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2
            ${
              isLeakActive
                ? 'neon-border border-2 bg-red-500/10 text-red-400'
                : 'bg-red-400/10 border border-red-400/50 text-red-400 hover:border-red-400'
            }
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <AlertTriangle className="w-4 h-4" />
          LEAK
        </button>

        <button
          onClick={handleInjectNoise}
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-2 sm:px-3 py-2 sm:py-3 font-semibold text-xs sm:text-sm
            transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2
            border border-orange-400/50 text-orange-400 hover:border-orange-400
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <Volume2 className="w-4 h-4" />
          NOISE
        </button>
      </div>

      {/* Parameter Sliders */}
      <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-6 p-2 sm:p-4 neon-border rounded bg-secondary/30">
        {/* Noise Level Slider */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1 sm:gap-2">
              <Volume2 className="w-3 h-3 flex-shrink-0" />
              <span className="hidden sm:inline">NOISE LEVEL</span>
              <span className="sm:hidden">NOISE</span>
            </label>
            <span className="text-xs sm:text-sm font-mono font-bold text-cyan-400">
              {noiseLevel}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full accent-cyan-400 cursor-pointer"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Leak Intensity Slider */}
        <div>
          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
            <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1 sm:gap-2">
              <Zap className="w-3 h-3 flex-shrink-0" />
              <span className="hidden sm:inline">LEAK INTENSITY</span>
              <span className="sm:hidden">LEAK</span>
            </label>
            <span className="text-xs sm:text-sm font-mono font-bold text-red-400">
              {leakIntensity}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={leakIntensity}
              onChange={(e) => setLeakIntensity(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-full accent-red-400 cursor-pointer"
              disabled={loading}
            />
            <div className="flex justify-between text-xs text-muted-foreground/50 mt-1">
              <span>Minor</span>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button
          disabled={loading}
          className={`
            relative overflow-hidden rounded-lg px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm
            transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2
            border border-muted-foreground/50 text-muted-foreground hover:border-muted-foreground
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={handleReset}
        >
          <RotateCcw className="w-4 h-4" />
          RESET
        </button>

        <div
          className={`
            rounded-lg px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2
            border neon-border
            ${
              isLeakActive
                ? 'bg-red-500/20 border-red-400 text-red-400'
                : 'bg-green-500/20 border-green-400 text-green-400'
            }
          `}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isLeakActive ? 'bg-red-400 animate-pulse' : 'bg-green-400 animate-pulse'
            }`}
          />
          {isLeakActive ? 'LEAK MODE' : 'NORMAL MODE'}
        </div>
      </div>

      {/* Parameter Info */}
      <div className="p-2 sm:p-3 rounded bg-secondary/20 border border-border/50 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground mb-1 sm:mb-2">PARAMETERS</p>
        <p className="text-xs">Noise: {noiseLevel}% {noiseLevel < 33 ? '(Clean)' : noiseLevel < 67 ? '(Moderate)' : '(High)'}</p>
        <p className="text-xs">Leak: {leakIntensity}% {leakIntensity === 0 ? '(None)' : leakIntensity < 50 ? '(Minor)' : leakIntensity < 80 ? '(Moderate)' : '(Critical)'}</p>
        <p className="text-muted-foreground/70 mt-1 sm:mt-2 text-xs">
          Real-time updates
        </p>
      </div>
    </div>
  );
}
