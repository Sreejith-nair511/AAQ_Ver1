import { useEffect, useState, useCallback, useRef } from 'react';

export interface SensorData {
  timestamp: number;
  isLeakActive: boolean;
  leakDetected: boolean;
  timeDomain: {
    signal: number[];
    rms: number;
    variance: number;
    energy: number;
  };
  frequencyDomain: {
    spectrum: Array<{ frequency: number; magnitude: number }>;
  };
  confidence: number;
}

interface UseSensorDataOptions {
  enabled?: boolean;
  pollInterval?: number;
}

export function useSensorData(options: UseSensorDataOptions = {}) {
  const { enabled = true, pollInterval = 500 } = options;
  const [data, setData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/sensor-data');
      if (!response.ok) throw new Error('Failed to fetch sensor data');
      const newData = await response.json();
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Initial fetch
    fetchData();

    // Set up polling
    intervalRef.current = setInterval(fetchData, pollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [enabled, pollInterval, fetchData]);

  return { data, loading, error };
}

export function useLeakSimulation() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleSimulation = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sensor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle-leak' }),
      });
      if (!response.ok) throw new Error('Failed to toggle leak simulation');
      const result = await response.json();
      setIsSimulating(result.isLeakActive);
      return result;
    } catch (err) {
      console.error('Error toggling leak simulation:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const simulateNormal = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sensor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'simulate-normal' }),
      });
      if (!response.ok) throw new Error('Failed to switch to normal mode');
      const result = await response.json();
      setIsSimulating(result.isLeakActive);
      return result;
    } catch (err) {
      console.error('Error in simulateNormal:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const simulateLeak = useCallback(async (intensity?: number) => {
    setLoading(true);
    try {
      const response = await fetch('/api/sensor-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'simulate-leak', intensity }),
      });
      if (!response.ok) throw new Error('Failed to switch to leak mode');
      const result = await response.json();
      setIsSimulating(result.isLeakActive);
      return result;
    } catch (err) {
      console.error('Error in simulateLeak:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateParams = useCallback(
    async (noiseLevel?: number, leakIntensity?: number) => {
      setLoading(true);
      try {
        const response = await fetch('/api/sensor-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'update-params', noiseLevel, leakIntensity }),
        });
        if (!response.ok) throw new Error('Failed to update parameters');
        return await response.json();
      } catch (err) {
        console.error('Error in updateParams:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { isSimulating, toggleSimulation, simulateNormal, simulateLeak, updateParams, loading };
}
