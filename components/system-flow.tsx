'use client';

import React, { useState } from 'react';
import { Waves, Radio, Cpu, Zap, Brain, CheckCircle, Info } from 'lucide-react';

interface SystemNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  category: 'source' | 'edge' | 'cloud' | 'decision';
}

const nodes: SystemNode[] = [
  {
    id: 'pipe',
    label: 'Water Pipe',
    icon: <Waves className="w-6 h-6" />,
    description: 'Vibrations indicate pipe health',
    category: 'source',
  },
  {
    id: 'sensor',
    label: 'Sensor',
    icon: <Radio className="w-6 h-6" />,
    description: 'Captures vibration signals at 10kHz',
    category: 'edge',
  },
  {
    id: 'adc',
    label: 'ADC',
    icon: <Cpu className="w-6 h-6" />,
    description: 'Converts analog signals to digital data',
    category: 'edge',
  },
  {
    id: 'processing',
    label: 'Edge Processing',
    icon: <Zap className="w-6 h-6" />,
    description: 'FFT analysis & feature extraction (NodeMCU)',
    category: 'edge',
  },
  {
    id: 'ai',
    label: 'AI Engine',
    icon: <Brain className="w-6 h-6" />,
    description: 'ML classification in cloud (TensorFlow)',
    category: 'cloud',
  },
  {
    id: 'decision',
    label: 'Decision',
    icon: <CheckCircle className="w-6 h-6" />,
    description: 'Alert or clear status',
    category: 'decision',
  },
];

interface SystemFlowProps {
  leakDetected: boolean;
  activeStage?: number;
}

export function SystemFlow({ leakDetected, activeStage }: SystemFlowProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const activeNode = nodes.find((n) => n.id === selectedNode);

  // Get color based on category
  const getNodeColor = (category: string) => {
    switch (category) {
      case 'source':
        return 'bg-blue-500/20 border-blue-400 text-blue-300';
      case 'edge':
        return 'bg-cyan-500/20 border-cyan-400 text-cyan-300';
      case 'cloud':
        return 'bg-purple-500/20 border-purple-400 text-purple-300';
      case 'decision':
        return leakDetected
          ? 'bg-red-500/20 border-red-400 text-red-300 animate-pulse'
          : 'bg-green-500/20 border-green-400 text-green-300';
      default:
        return '';
    }
  };

  return (
    <div className="neon-border rounded-lg p-3 sm:p-4 md:p-6 bg-card/50">
      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-lg font-bold neon-glow mb-1 sm:mb-2">System Data Flow</h3>
        <p className="text-xs text-muted-foreground">
          Real-time signal processing pipeline
        </p>
      </div>

      {/* Pipeline Visualization */}
      <div className="relative mb-6 sm:mb-8 overflow-hidden">
        {/* Flow Container */}
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto pb-2 sm:pb-4">
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              {/* Animated Node */}
              <button
                onClick={() =>
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }
                className={`
                  relative flex-shrink-0 cursor-pointer transition-all duration-300
                  flex flex-col items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-lg
                  border-2 ${getNodeColor(node.category)}
                  ${
                    selectedNode === node.id
                      ? 'neon-border-active shadow-lg scale-105 sm:scale-110'
                      : 'neon-border hover:shadow-md'
                  }
                  group
                `}
              >
                {/* Icon */}
                <div className="text-xl sm:text-2xl">{node.icon}</div>

                {/* Label */}
                <span className="text-xs font-semibold text-center mt-0.5 sm:mt-1 px-0.5 sm:px-1 line-clamp-2">
                  {node.label}
                </span>

                {/* Animated pulse for active stages */}
                {activeStage && idx <= activeStage && (
                  <div className="absolute inset-0 rounded-lg border-2 border-primary/50 animate-pulse" />
                )}

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="bg-card border neon-border rounded px-2 py-1 text-xs whitespace-nowrap">
                    {node.description}
                  </div>
                </div>
              </button>

              {/* Animated Arrow */}
              {idx < nodes.length - 1 && (
                <div className="relative flex-shrink-0 w-4 h-1 mx-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent opacity-50 rounded-full" />
                  {/* Animated dot */}
                  <div className="absolute h-1 w-1 bg-primary rounded-full animate-pulse left-0" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Section Labels */}
      <div className="hidden md:grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 text-xs text-center">
        <div className="py-2 px-2 md:px-3 rounded border border-cyan-400/30 bg-cyan-500/10">
          <p className="font-semibold text-cyan-300 text-xs">EDGE</p>
          <p className="text-muted-foreground text-xs">(NodeMCU)</p>
        </div>
        <div className="py-2 px-2 md:px-3 rounded border border-purple-400/30 bg-purple-500/10">
          <p className="font-semibold text-purple-300 text-xs">CLOUD</p>
          <p className="text-muted-foreground text-xs">(AI)</p>
        </div>
        <div className="py-2 px-2 md:px-3 rounded border border-green-400/30 bg-green-500/10">
          <p className="font-semibold text-green-300 text-xs">DECISION</p>
          <p className="text-muted-foreground text-xs">(Result)</p>
        </div>
      </div>

      {/* Details Panel */}
      {activeNode && (
        <div className="p-3 sm:p-4 neon-border rounded-lg bg-secondary/40 border-green-400/50">
          <div className="flex items-start gap-2 sm:gap-3">
            <Info className="w-4 sm:w-5 h-4 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div className="min-w-0">
              <h4 className="font-semibold text-green-400 neon-glow mb-1 text-sm">
                {activeNode.label}
              </h4>
              <p className="text-xs sm:text-sm text-foreground">{activeNode.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
