import { SensorData } from '@/hooks/use-sensor-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricsPanelProps {
  data: SensorData | null;
  leakDetected?: boolean;
}

export function MetricsPanel({ data, leakDetected = false }: MetricsPanelProps) {
  const metrics = [
    {
      label: 'RMS',
      value: data?.timeDomain.rms.toFixed(3) || '0.000',
      unit: 'm/s²',
    },
    {
      label: 'Variance',
      value: data?.timeDomain.variance.toFixed(3) || '0.000',
      unit: '',
    },
    {
      label: 'Energy',
      value: data?.timeDomain.energy.toFixed(3) || '0.000',
      unit: 'J',
    },
    {
      label: 'Confidence',
      value: data ? `${(data.confidence * 100).toFixed(0)}%` : '0%',
      unit: '',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {metrics.map((metric) => (
        <Card
          key={metric.label}
          className={`${
            leakDetected
              ? 'bg-red-950 border-red-700'
              : 'bg-slate-900 border-slate-700'
          }`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              {metric.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {metric.value}
            </div>
            {metric.unit && (
              <p className="text-xs text-slate-500">{metric.unit}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
