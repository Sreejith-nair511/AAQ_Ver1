import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for simulation state
let simulationState = {
  isLeakActive: false,
  timestamp: Date.now(),
  noiseLevel: 30, // 0-100
  leakIntensity: 0, // 0-100
};

// Helper function to generate realistic water flow signal
function generateNormalSignal(noiseLevel: number): number[] {
  const samples = 256;
  const signal: number[] = [];
  
  // Base frequency around 50 Hz (pump operation)
  const baseFreq = 50;
  
  for (let i = 0; i < samples; i++) {
    const t = i / 256;
    // Fundamental frequency component
    let value = Math.sin(2 * Math.PI * baseFreq * t);
    // Second harmonic (lower amplitude)
    value += 0.3 * Math.sin(2 * Math.PI * 100 * t);
    // Noise component based on noise level
    value += (noiseLevel / 100) * 0.3 * (Math.random() - 0.5);
    signal.push(value);
  }
  
  return signal;
}

// Generate leak signal (high-frequency vibration + variance)
function generateLeakSignal(leakIntensity: number, noiseLevel: number): number[] {
  const samples = 256;
  const signal: number[] = [];
  
  // High-frequency components indicate leak
  const leakFreq = 200; // Higher frequency
  const intensityFactor = leakIntensity / 100;
  
  for (let i = 0; i < samples; i++) {
    const t = i / 256;
    // Primary leak frequency (scaled by intensity)
    let value = 0.8 * intensityFactor * Math.sin(2 * Math.PI * leakFreq * t);
    // Secondary frequency
    value += 0.5 * intensityFactor * Math.sin(2 * Math.PI * 150 * t);
    // Burst-like noise (characteristic of leaks)
    value += (0.4 * intensityFactor + (noiseLevel / 100) * 0.2) * (Math.random() - 0.5);
    signal.push(value);
  }
  
  return signal;
}

// Signal processing: Extract frequency domain features
function processSignal(signal: number[]) {
  // Simple FFT approximation using frequency components
  const fftBins = 128;
  const fft: number[] = new Array(fftBins).fill(0);
  
  // Basic frequency analysis
  for (let k = 0; k < fftBins; k++) {
    for (let n = 0; n < signal.length; n++) {
      const angle = (2 * Math.PI * k * n) / signal.length;
      fft[k] += signal[n] * Math.cos(angle);
    }
    fft[k] = Math.abs(fft[k]) / signal.length;
  }
  
  // Calculate metrics
  const energy = signal.reduce((sum, val) => sum + val * val, 0) / signal.length;
  const mean = signal.reduce((a, b) => a + b, 0) / signal.length;
  const variance = signal.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / signal.length;
  
  // Frequency spectrum (top 20 bins for visualization)
  const spectrum = fft.slice(0, 20).map((val, idx) => ({
    frequency: idx * 25, // Approximate frequency in Hz
    magnitude: val,
  }));
  
  return {
    energy,
    variance,
    rms: Math.sqrt(energy),
    spectrum,
    fft,
  };
}

// Leak detection logic
function detectLeak(timeDomainSignal: number[], processedSignal: ReturnType<typeof processSignal>) {
  // Rule-based detection: high variance + high frequency content
  const highVarianceThreshold = 0.3;
  const highFrequencyThreshold = 0.15;
  
  // Check variance
  const hasHighVariance = processedSignal.variance > highVarianceThreshold;
  
  // Check frequency content (energy in high frequencies)
  const highFrequencyEnergy = processedSignal.fft.slice(30, 64).reduce((a, b) => a + b, 0);
  const hasHighFrequency = highFrequencyEnergy > highFrequencyThreshold;
  
  // Leak detected if both conditions met
  return hasHighVariance && hasHighFrequency;
}

export async function GET(request: NextRequest) {
  try {
    // Generate appropriate signal based on simulation state
    const signal = simulationState.isLeakActive
      ? generateLeakSignal(simulationState.leakIntensity, simulationState.noiseLevel)
      : generateNormalSignal(simulationState.noiseLevel);
    
    // Process the signal
    const processed = processSignal(signal);
    
    // Detect leak
    const leakDetected = detectLeak(signal, processed);
    
    return NextResponse.json({
      timestamp: Date.now(),
      isLeakActive: simulationState.isLeakActive,
      leakDetected,
      timeDomain: {
        signal: signal.slice(0, 64), // Send subset for visualization
        rms: processed.rms,
        variance: processed.variance,
        energy: processed.energy,
      },
      frequencyDomain: {
        spectrum: processed.spectrum,
      },
      confidence: leakDetected ? 0.95 : 0.05,
    });
  } catch (error) {
    console.error('Error in sensor-data API:', error);
    return NextResponse.json({ error: 'Failed to fetch sensor data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Toggle leak simulation
    if (body.action === 'toggle-leak') {
      simulationState.isLeakActive = !simulationState.isLeakActive;
      simulationState.timestamp = Date.now();
      
      return NextResponse.json({
        success: true,
        isLeakActive: simulationState.isLeakActive,
        message: simulationState.isLeakActive ? 'Leak simulation started' : 'Leak simulation stopped',
      });
    }
    
    // Update simulation parameters
    if (body.action === 'update-params') {
      if (typeof body.noiseLevel === 'number') {
        simulationState.noiseLevel = Math.max(0, Math.min(100, body.noiseLevel));
      }
      if (typeof body.leakIntensity === 'number') {
        simulationState.leakIntensity = Math.max(0, Math.min(100, body.leakIntensity));
      }
      
      return NextResponse.json({
        success: true,
        noiseLevel: simulationState.noiseLevel,
        leakIntensity: simulationState.leakIntensity,
      });
    }
    
    // Simulate normal mode
    if (body.action === 'simulate-normal') {
      simulationState.isLeakActive = false;
      simulationState.leakIntensity = 0;
      simulationState.timestamp = Date.now();
      
      return NextResponse.json({
        success: true,
        isLeakActive: false,
        message: 'Switched to normal mode',
      });
    }
    
    // Simulate leak mode
    if (body.action === 'simulate-leak') {
      simulationState.isLeakActive = true;
      simulationState.leakIntensity = body.intensity || 80;
      simulationState.timestamp = Date.now();
      
      return NextResponse.json({
        success: true,
        isLeakActive: true,
        leakIntensity: simulationState.leakIntensity,
        message: 'Switched to leak mode',
      });
    }
    
    // Inject noise
    if (body.action === 'inject-noise') {
      simulationState.noiseLevel = body.noiseLevel || 100;
      simulationState.timestamp = Date.now();
      
      return NextResponse.json({
        success: true,
        noiseLevel: simulationState.noiseLevel,
        message: 'Noise injected',
      });
    }
    
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Error in sensor-data POST:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
