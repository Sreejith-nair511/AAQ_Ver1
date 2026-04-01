'use client';

import React, { useState } from 'react';
import {
  Zap,
  Radio,
  Cpu,
  Cloud,
  BarChart3,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ArchitectureNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const nodes: ArchitectureNode[] = [
  {
    id: 'pipe',
    label: 'Water Pipe',
    icon: <Zap className="w-5 h-5" />,
    description: 'Physical pipeline infrastructure',
    color: 'border-blue-500 bg-blue-500/10',
  },
  {
    id: 'sensor',
    label: 'Vibration Sensor',
    icon: <Radio className="w-5 h-5" />,
    description: 'Detects anomalies in pipe vibration',
    color: 'border-cyan-400 bg-cyan-400/10',
  },
  {
    id: 'adc',
    label: 'ADC',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Analog-to-Digital Conversion',
    color: 'border-green-400 bg-green-400/10',
  },
  {
    id: 'nodemcu',
    label: 'NodeMCU',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Signal processing & transmission',
    color: 'border-green-400 bg-green-400/10',
  },
  {
    id: 'cloud',
    label: 'Cloud AI',
    icon: <Cloud className="w-5 h-5" />,
    description: 'ML-based leak detection',
    color: 'border-purple-500 bg-purple-500/10',
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
    description: 'Real-time monitoring interface',
    color: 'border-pink-500 bg-pink-500/10',
  },
];

export function SystemArchitecture() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const activeNode = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="neon-border rounded-lg p-6 bg-card/50">
      <div className="mb-6">
        <h3 className="text-lg font-bold neon-glow mb-2">System Pipeline</h3>
        <p className="text-xs text-muted-foreground">
          Data flow from sensors to intelligent detection
        </p>
      </div>

      {/* Architecture Flow */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-max">
          {nodes.map((node, idx) => (
            <React.Fragment key={node.id}>
              {/* Node */}
              <button
                onClick={() =>
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }
                className={`
                  relative group cursor-pointer transition-all duration-300
                  flex flex-col items-center gap-2 p-3 rounded-lg
                  border-2 ${node.color}
                  ${selectedNode === node.id ? 'neon-border-active shadow-lg' : 'neon-border hover:shadow-md'}
                `}
              >
                <div className="text-lg">{node.icon}</div>
                <span className="text-xs font-semibold whitespace-nowrap">
                  {node.label}
                </span>

                {/* Hover tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
                  <div className="bg-card border neon-border rounded px-2 py-1 text-xs whitespace-nowrap">
                    {node.description}
                  </div>
                </div>
              </button>

              {/* Arrow */}
              {idx < nodes.length - 1 && (
                <div className="flex items-center gap-1 text-muted-foreground">
                  <ChevronRight className="w-4 h-4 text-green-400 data-flow" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Details Panel */}
      {activeNode && (
        <div className="mt-6 p-4 neon-border rounded-lg bg-secondary/40 border-green-400/50">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-400 neon-glow mb-1">
                {activeNode.label}
              </h4>
              <p className="text-sm text-foreground">
                {activeNode.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
