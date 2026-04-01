'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

interface SimulationControlsProps {
  isSimulating: boolean;
  onToggle: () => void;
  loading?: boolean;
}

export function SimulationControls({
  isSimulating,
  onToggle,
  loading = false,
}: SimulationControlsProps) {
  const [localSimulating, setLocalSimulating] = useState(isSimulating);

  const handleToggle = async () => {
    setLocalSimulating(!localSimulating);
    try {
      await onToggle();
    } catch (err) {
      // Revert on error
      setLocalSimulating(localSimulating);
      console.error('Failed to toggle simulation:', err);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Zap className="h-5 w-5" />
          Simulation Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-sm text-slate-300">
            <span className="font-semibold">Current Status:</span>{' '}
            <span
              className={
                localSimulating ? 'text-red-400' : 'text-green-400'
              }
            >
              {localSimulating ? 'LEAK SIMULATION ACTIVE' : 'Normal Mode'}
            </span>
          </p>
        </div>

        <Button
          onClick={handleToggle}
          disabled={loading}
          className={`w-full ${
            localSimulating
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Loading...' : localSimulating ? 'Stop Leak Simulation' : 'Start Leak Simulation'}
        </Button>

        <p className="text-xs text-slate-500">
          {localSimulating
            ? 'Simulating active leak with high-frequency vibrations'
            : 'Running normal pump operation simulation'}
        </p>
      </CardContent>
    </Card>
  );
}
