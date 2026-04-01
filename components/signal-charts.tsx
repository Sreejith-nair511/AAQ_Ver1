'use client';

import { SensorData } from '@/hooks/use-sensor-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SignalChartsProps {
  data: SensorData | null;
  leakDetected?: boolean;
}

export function SignalCharts({ data, leakDetected = false }: SignalChartsProps) {
  // Prepare time-domain data
  const timeDomainData = data?.timeDomain.signal.map((val, idx) => ({
    index: idx,
    amplitude: parseFloat(val.toFixed(3)),
  })) || [];

  // Prepare frequency-domain data
  const frequencyData = data?.frequencyDomain.spectrum.map((spec) => ({
    frequency: spec.frequency,
    magnitude: parseFloat(spec.magnitude.toFixed(4)),
  })) || [];

  const chartColor = leakDetected ? '#ef4444' : '#10b981';

  return (
    <div className="grid gap-2 sm:gap-3 md:gap-4 grid-cols-1 md:grid-cols-2">
      {/* Time Domain Chart */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-sm sm:text-base md:text-lg text-white">
            Time Domain Signal
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-400">
            {leakDetected ? 'LEAK DETECTED' : 'Normal Operation'}
          </p>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 md:p-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={timeDomainData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="index"
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
                tick={{ fontSize: 10 }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line
                type="monotone"
                dataKey="amplitude"
                stroke={chartColor}
                dot={false}
                isAnimationActive={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Frequency Domain Chart */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-sm sm:text-base md:text-lg text-white">
            Frequency Spectrum (FFT)
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-400">
            {frequencyData.length > 0
              ? `Peak: ${Math.max(...frequencyData.map((d) => d.magnitude)).toFixed(4)}`
              : 'No data'}
          </p>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 md:p-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={frequencyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                vertical={false}
              />
              <XAxis
                dataKey="frequency"
                stroke="#9ca3af"
                style={{ fontSize: '10px' }}
                tick={{ fontSize: 10 }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: '10px' }} tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '4px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="magnitude" fill={chartColor} isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
