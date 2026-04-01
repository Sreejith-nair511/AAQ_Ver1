import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertPanelProps {
  leakDetected: boolean;
  confidence: number;
  lastUpdate: number | null;
}

export function AlertPanel({
  leakDetected,
  confidence,
  lastUpdate,
}: AlertPanelProps) {
  const timeAgo = lastUpdate
    ? Math.floor((Date.now() - lastUpdate) / 1000)
    : null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Status Alert */}
      <Card
        className={`${
          leakDetected
            ? 'bg-red-950 border-red-700'
            : 'bg-green-950 border-green-700'
        }`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            {leakDetected ? (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                System Alert
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                All Clear
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={leakDetected ? 'text-red-200' : 'text-green-200'}>
            {leakDetected
              ? 'POTENTIAL LEAK DETECTED - Immediate inspection recommended'
              : 'System operating normally. No anomalies detected.'}
          </p>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="bg-slate-900 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">System Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Status</span>
            <span className={leakDetected ? 'text-red-400' : 'text-green-400'}>
              {leakDetected ? 'ALERT' : 'NORMAL'}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Confidence</span>
            <span className="text-white">
              {(confidence * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Last Update</span>
            <span className="text-slate-300">
              {timeAgo !== null ? `${timeAgo}s ago` : 'N/A'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
