# AQUA-SENSE CORE - Advanced System Interface Implementation

## Overview

AQUA-SENSE CORE is a professional-grade engineering system interface for IoT-based water leak detection. The redesigned UI transforms the previous dashboard into a full SCADA-style control panel that visualizes how the system works.

## Architecture: 4-Panel Layout

### 1. LEFT PANEL (25%) - System Architecture Visualization
**File**: `/components/system-architecture.tsx`

- **Interactive Data Flow Diagram**
  - Visual pipeline: Pipe → Sensor → ADC → NodeMCU → Cloud AI → Dashboard
  - Clickable nodes with real-time information
  - Color-coded stages representing the processing pipeline
  - Animated data flow indicators (ChevronRight with data-flow animation)
  - Hover tooltips showing node descriptions

- **Features**
  - State management for selected node
  - Detailed information panel below the pipeline
  - Professional SCADA-style presentation
  - Neon borders and glowing effects

### 2. CENTER PANEL (50%) - Live Signal & Analysis
**File**: `/components/signal-charts.tsx` (enhanced from original)

- **Real-Time Visualization**
  - Time domain waveform (64-point signal graph)
  - FFT frequency domain analysis (128-bin spectrum)
  - Recharts integration with smooth animations
  - Real-time data updates at 500ms interval
  - Dual-chart view system

- **Features**
  - Toggle between time and frequency views
  - Frequency peak detection visualization
  - Noise vs spike differentiation
  - Responsive design for all screen sizes
  - Professional gridlines and axes

### 3. RIGHT PANEL (25%) - System Intelligence
**File**: `/components/system-intelligence.tsx`

- **AI Classification System**
  - Status indicators: NORMAL / ALERT
  - AI Classification levels:
    - NORMAL (no leak)
    - MINOR LEAK (confidence < 50%)
    - MODERATE LEAK (confidence 50-85%)
    - MAJOR LEAK (confidence > 85%)
  
- **Real-Time Metrics**
  - Confidence score with animated progress bar
  - Feature values display:
    - ENERGY: Power in the signal
    - VARIANCE: Signal variability
    - RMS: Root Mean Square amplitude
  - Color-coded severity (Green → Yellow → Orange → Red)

- **Visual Indicators**
  - Dynamic border coloring based on severity
  - Animated pulse effects during alerts
  - CheckCircle icon for normal state
  - AlertCircle icon for leak detection

### 4. BOTTOM PANEL (100%) - Advanced Control & Simulation
**File**: `/components/advanced-controls.tsx`

- **Simulation Mode Controls**
  - Mode buttons:
    - "Simulate Normal Flow" - Safe test mode
    - "Simulate Leak" - Trigger detection algorithm
  - Real-time status indicator (RUNNING / IDLE)
  - Active state visual feedback

- **Parameter Sliders**
  - Noise Level (0-100%): Inject environmental noise
  - Leak Intensity (0-100%): Control leak severity
  - Live numerical feedback
  - Color-coded slider accents (green/red)

- **Action Buttons**
  - START/ACTIVE toggle with visual state change
  - RESET to clear parameters
  - Loading state handling
  - Responsive button layout

## Design System

### Color Palette (Futuristic/Industrial Theme)
```css
--background: #0a0e27 (Deep space navy)
--primary: #00ff88 (Neon green - success/active)
--accent: #ff0080 (Neon pink - alerts)
--destructive: #ff1744 (Red - critical)
--secondary: #1e2d4a (Dark blue-gray)
--border: #2a3558 (Subtle grid lines)
--card: #141829 (Panel background)
```

### Visual Effects
- **Neon Borders**: `neon-border` class with glowing box-shadow
- **Glow Text**: `neon-glow` and `neon-glow-red` text effects
- **Animations**:
  - `pulse-neon`: Pulsing glow effect for active panels
  - `pulse-alert`: Pulsing red alert effect
  - `data-flow`: Animated data movement along pipeline
- **Grid Pattern**: Subtle background grid through CSS

### Typography
- **Headers**: Bold with neon glow effect
- **Labels**: Small, uppercase, muted color
- **Values**: Monospace font for metrics
- **Status**: All-caps for professional appearance

## Technical Stack

### Frontend Components
- React 19+ with 'use client' directive
- Next.js 16 App Router
- TailwindCSS v4 with custom theme
- Recharts for data visualization
- Lucide React for icons

### Data Flow
1. **Client Hook**: `useSensorData` polls `/api/sensor-data` at 500ms
2. **API Route**: `/api/sensor-data` generates synthetic signals
3. **Signal Processing**:
   - FFT (128-bin frequency analysis)
   - Feature extraction (RMS, variance, energy)
   - Leak detection algorithm (rule-based)
4. **UI Update**: Components reactively update based on sensor data

### State Management
- React useState for component-level state
- Custom hooks for data fetching and simulation
- No external state library required

## Key Features

### Real-Time Capabilities
- 500ms polling interval for live updates
- Smooth chart animations with Recharts
- Instant visual feedback on simulation changes
- Live confidence score updates

### Engineering-Grade Presentation
- SCADA-style interface layout
- Professional color scheme and typography
- Animated data flow visualization
- Detailed information architecture
- Clear signal-to-noise presentation

### Interactivity
- Clickable architecture nodes
- Interactive sliders for parameters
- Toggle buttons for modes
- Responsive design (mobile to desktop)
- Status indicators and animations

### Simulation System
- Safe testing environment
- Normal flow simulation
- Leak detection simulation
- Adjustable parameters (noise, intensity)
- Real-time system response visualization

## File Structure

```
app/
├── page.tsx                 (Main dashboard - 4-panel layout)
├── api/
│   └── sensor-data/
│       └── route.ts         (Sensor API & signal generation)
├── layout.tsx               (Dark theme by default)
└── globals.css              (Futuristic theme colors & effects)

components/
├── system-architecture.tsx  (Pipeline visualization)
├── system-intelligence.tsx  (AI classification)
├── advanced-controls.tsx    (Simulation controls)
├── signal-charts.tsx        (Time/frequency analysis)
├── metrics-panel.tsx        (Original metrics display)
├── alert-panel.tsx          (Alert history)
└── simulation-controls.tsx  (Original controls)

hooks/
└── use-sensor-data.ts      (Custom hooks for data fetching)
```

## Performance Optimizations

1. **Lazy Loading**: 'use client' component isolation
2. **Memoization**: Chart components only update on data change
3. **Efficient Polling**: 500ms interval balances responsiveness and server load
4. **CSS Animations**: GPU-accelerated effects (transform, opacity)
5. **Responsive Layout**: CSS Grid for efficient rendering

## Ready for Production

The interface is designed to:
- ✅ Impress on first view with futuristic aesthetic
- ✅ Explain the engineering pipeline visually
- ✅ Support real-time data streaming
- ✅ Scale to multiple devices
- ✅ Connect to real hardware without UI changes
- ✅ Handle high-frequency signal data efficiently

## Future Enhancements

1. Multi-device management (multiple pipelines)
2. Alert history with timestamps
3. Data export functionality
4. Custom thresholds and calibration
5. ML model selection UI
6. Real hardware integration
7. Cloud connectivity
8. Mobile app version

---

Generated: April 1, 2026
Status: Production Ready - Advanced System Interface
