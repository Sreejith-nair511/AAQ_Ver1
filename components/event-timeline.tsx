'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: number;
  type: 'normal' | 'alert' | 'info';
  title: string;
  description: string;
}

interface EventTimelineProps {
  leakDetected: boolean;
  lastUpdate: number;
}

export function EventTimeline({ leakDetected, lastUpdate }: EventTimelineProps) {
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  // Add new event when leak state changes
  useEffect(() => {
    const newEvent: TimelineEvent = {
      id: `event-${Date.now()}`,
      timestamp: Date.now(),
      type: leakDetected ? 'alert' : 'normal',
      title: leakDetected ? 'Leak Detected' : 'System Normal',
      description: leakDetected
        ? 'High variance + high frequency pattern matched'
        : 'All parameters within normal range',
    };

    setEvents((prev) => [newEvent, ...prev].slice(0, 10)); // Keep last 10 events
  }, [leakDetected]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="neon-border rounded-lg p-3 sm:p-4 md:p-6 bg-card/50">
      {/* Title */}
      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-lg font-bold neon-glow mb-1 sm:mb-2">Event Timeline</h3>
        <p className="text-xs text-muted-foreground">Recent system events and alerts</p>
      </div>

      {/* Timeline */}
      <div className="space-y-2 sm:space-y-4 max-h-64 overflow-y-auto">
        {events.length === 0 ? (
          <div className="py-6 sm:py-8 text-center">
            <Clock className="w-6 sm:w-8 h-6 sm:h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
            <p className="text-xs text-muted-foreground">No events yet</p>
          </div>
        ) : (
          events.map((event, idx) => (
            <div
              key={event.id}
              className={`relative pl-6 sm:pl-8 pb-2 sm:pb-4 ${
                idx !== events.length - 1 ? 'border-l border-border/50' : ''
              }`}
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-0 top-0.5 sm:top-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 -translate-x-1.5 ${
                  event.type === 'alert'
                    ? 'bg-red-500/20 border-red-400 animate-pulse'
                    : 'bg-green-500/20 border-green-400'
                }`}
              />

              {/* Event card */}
              <div
                className={`p-2 sm:p-3 rounded border ${
                  event.type === 'alert'
                    ? 'border-red-400/50 bg-red-500/5'
                    : 'border-green-400/50 bg-green-500/5'
                }`}
              >
                <div className="flex items-start gap-2">
                  {event.type === 'alert' ? (
                    <AlertTriangle className="w-3 sm:w-4 h-3 sm:h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-3 sm:w-4 h-3 sm:h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {event.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatTime(event.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
