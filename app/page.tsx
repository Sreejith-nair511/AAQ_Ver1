'use client';

import { useState, useEffect } from 'react';
import { useSensorData, useLeakSimulation } from '@/hooks/use-sensor-data';
import { SignalCharts } from '@/components/signal-charts';
import { SystemFlow } from '@/components/system-flow';
import { DecisionReasoning } from '@/components/decision-reasoning';
import { EventTimeline } from '@/components/event-timeline';
import { EnhancedSimulation } from '@/components/enhanced-simulation';
import { Droplet, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const [isClient, setIsClient] = useState(false);
  const { data: sensorData, loading: dataLoading } = useSensorData({
    pollInterval: 500,
  });
  const { isSimulating, toggleSimulation, simulateNormal, simulateLeak, updateParams, loading: simLoading } =
    useLeakSimulation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const leakDetected = sensorData?.leakDetected || false;
  const confidence = sensorData?.confidence || 0;
  const timestamp = sensorData?.timestamp || Date.now();

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border bg-card/40 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-full px-3 py-3 sm:px-4 md:py-4 lg:px-8">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="flex items-center justify-center h-8 sm:h-10 w-8 sm:w-10 rounded-lg bg-primary/10 border border-primary/30 neon-border flex-shrink-0 overflow-hidden">
                <img src="/icon.svg" alt="AQUA-SENSE Logo" className="h-6 w-6 sm:h-7 sm:w-7 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 neon-glow truncate">
                  AQUA-SENSE
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Smart Infrastructure Monitoring
                </p>
              </div>
            </div>
            {leakDetected && (
              <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded border-2 border-red-500 bg-red-500/10 pulse-alert flex-shrink-0">
                <AlertTriangle className="w-4 sm:w-5 h-4 sm:h-5 text-red-500 animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-red-500 neon-glow-red whitespace-nowrap">
                  LEAK!
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-full px-3 py-4 sm:px-4 md:px-6 lg:px-8">
        {/* Top Section: System Flow + Signals + Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6 mb-3 md:mb-4 lg:mb-6">
          {/* LEFT: System Flow (25% on lg) */}
          <div className="md:col-span-2 lg:col-span-3">
            <SystemFlow leakDetected={leakDetected} />
          </div>

          {/* CENTER: Live Signal Analysis (50% on lg) */}
          <div className="md:col-span-2 lg:col-span-6">
            <div className="mb-3 md:mb-4">
              <h2 className="text-base md:text-lg font-bold neon-glow mb-1 md:mb-2">
                Live Signal Analysis
              </h2>
              <p className="text-xs text-muted-foreground">
                Real-time vibration monitoring and frequency analysis
              </p>
            </div>
            <SignalCharts data={sensorData} leakDetected={leakDetected} />
          </div>

          {/* RIGHT: Decision Reasoning (25% on lg) */}
          <div className="md:col-span-2 lg:col-span-3">
            <DecisionReasoning
              data={sensorData?.timeDomain}
              leakDetected={leakDetected}
              confidence={confidence}
            />
          </div>
        </div>

        {/* Bottom Section: Event Timeline + Enhanced Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6">
          {/* LEFT: Event Timeline (33% on lg) */}
          <div className="md:col-span-1 lg:col-span-4">
            <EventTimeline leakDetected={leakDetected} lastUpdate={timestamp} />
          </div>

          {/* RIGHT: Enhanced Simulation Control (67% on lg) */}
          <div className="md:col-span-1 lg:col-span-8">
            <EnhancedSimulation
              isLeakActive={leakDetected}
              onSimulateNormal={simulateNormal}
              onSimulateLeak={simulateLeak}
              onUpdateParams={updateParams}
              loading={simLoading}
            />
          </div>
        </div>

        {/* Loading indicator */}
        {dataLoading && (
          <div className="fixed bottom-4 right-4">
            <div className="px-4 py-2 rounded neon-border bg-card/80 backdrop-blur">
              <p className="text-xs text-primary neon-glow">
                • STREAMING DATA
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
