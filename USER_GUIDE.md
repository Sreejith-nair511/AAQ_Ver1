# AQUA-SENSE CORE - User Guide

## Welcome to the Advanced System Interface

AQUA-SENSE CORE is a professional-grade monitoring dashboard for smart water infrastructure. This guide shows you how to use each panel of the system.

---

## Dashboard Layout Overview

The dashboard is organized into 4 main sections:

```
┌──────────────────────────────────────────────────────┐
│  HEADER: AQUA-SENSE CORE + Status Badge             │
├──────────┬──────────────────────┬───────────────────┤
│          │                      │                   │
│  PANEL 1 │   PANEL 2            │  PANEL 3          │
│          │                      │                   │
│ SYSTEM   │ LIVE SIGNAL          │ SYSTEM            │
│          │ ANALYSIS             │ INTELLIGENCE      │
│ (25%)    │ (50%)                │ (25%)             │
│          │                      │                   │
├──────────┴──────────────────────┴───────────────────┤
│         PANEL 4: SIMULATION CONTROL (100%)          │
└──────────────────────────────────────────────────────┘
```

---

## Panel 1: System Architecture (LEFT)

### What It Shows
This panel displays the complete data pipeline from physical sensors to the dashboard.

### The Pipeline
```
[Pipe] → [Sensor] → [ADC] → [NodeMCU] → [Cloud AI] → [Dashboard]
  ↓         ↓         ↓         ↓           ↓            ↓
Water    Vibration  Digital   Signal   Detection    Your
Pipeline   Data    Conversion Processing Algorithm  View
```

### How to Use
1. **View the Pipeline**: See the complete data flow at a glance
2. **Click Any Node**: Select a component to learn what it does
3. **Read Details**: A panel appears below showing more information
4. **Understand the Flow**: Visualize how data moves through the system

### Color Coding
- **Blue**: Physical infrastructure (Pipe)
- **Cyan**: Sensor and signal processing (Sensor, ADC)
- **Green**: Processing units (NodeMCU)
- **Purple**: Cloud AI analysis
- **Pink**: Final dashboard display

### Interactive Features
- Click any node to highlight it
- Animated arrows show data direction
- Hover for quick descriptions
- Click again to deselect

---

## Panel 2: Live Signal Analysis (CENTER)

### What It Shows
Real-time vibration data from the water pipes displayed in two views.

### Time Domain View
Shows the raw vibration signal over time:
- **X-axis**: Time (64 data points)
- **Y-axis**: Vibration amplitude
- **Green line**: Normal operation (smooth, low amplitude)
- **Spiky line**: Leak detected (high peaks, irregular pattern)

### Frequency Domain View (FFT)
Shows which frequencies are dominant:
- **X-axis**: Frequency bins (0-128)
- **Y-axis**: Energy/Power at each frequency
- **Normal**: Smooth, evenly distributed
- **Leak**: Spikes at specific frequencies + high-frequency noise

### How to Use
1. **Watch Real-Time Updates**: Charts update every 500ms
2. **Compare Normal vs Leak**: See the visual differences
3. **Monitor Peaks**: Track when frequencies spike
4. **Analyze Patterns**: Look for anomalies in the waveform

### Visual Indicators
- **Smooth Curves**: Healthy system
- **Sharp Spikes**: Potential issues
- **Increasing Noise**: Environmental disturbance
- **Sudden Changes**: Leak detection event

---

## Panel 3: System Intelligence (RIGHT)

### What It Shows
AI-powered analysis and classification of the detected signals.

### Status Section
Shows current system status with icon:
- **✓ NORMAL**: Green icon, no leak detected
- **⚠ ALERT**: Red icon, leak detected

### Classification Levels
The system classifies leaks into 4 severity tiers:

| Level | Confidence | Color | Action |
|-------|-----------|-------|--------|
| NORMAL | 0-20% | Green | Continue monitoring |
| MINOR LEAK | 20-50% | Yellow | Schedule inspection |
| MODERATE LEAK | 50-85% | Orange | Plan repair soon |
| MAJOR LEAK | 85-100% | Red | Immediate intervention |

### Confidence Score
- **Visual Bar**: Fills from left to right
- **Percentage**: Shows exact confidence level
- **Color Gradient**: Green (safe) → Red (critical)

### Feature Metrics
Three technical measurements:
- **ENERGY**: Total power in the signal (higher = more vibration)
- **VARIANCE**: How spread out the values are (higher = more variation)
- **RMS**: Root Mean Square amplitude (higher = louder signal)

### How to Use
1. **Check Status Indicator**: First thing to look at
2. **Read Classification**: Understand the alert level
3. **Monitor Confidence**: Watch if score increases
4. **Review Metrics**: Dive deeper into technical details

### Alert Visual Effects
When a leak is detected:
- Red pulsing border around the panel
- Rapid text shadow glow effect
- Animated alert icon
- Increasing confidence bar

---

## Panel 4: Simulation Control (BOTTOM)

### What It Shows
Safe testing environment to simulate different scenarios.

### Simulation Mode Buttons

#### "Normal Flow" Button (Green)
- Simulates healthy water pipeline
- No leak detection
- Confidence score stays low
- Use for testing normal operation

#### "Simulate Leak" Button (Red)
- Triggers leak detection algorithm
- Confidence score increases
- Charts show anomalies
- Use for testing alert system

### Parameter Sliders

#### Noise Level (0-100%)
Controls environmental interference:
- **0%**: Clean signal, no noise
- **50%**: Moderate environmental disturbance
- **100%**: High background noise
- **Use**: Test system robustness

#### Leak Intensity (0-100%)
Controls leak severity in simulation:
- **0%**: No leak
- **50%**: Moderate leak simulation
- **100%**: Severe leak scenario
- **Use**: Test different alert thresholds

### Action Buttons

#### START/ACTIVE Button
- **Green text**: Simulation is RUNNING
- **Dim text**: Simulation is IDLE
- Click to toggle simulation on/off
- Shows real-time system response

#### RESET Button
- Clears all parameters
- Returns sliders to default (30% noise, 0% leak)
- Stops simulation
- Use between tests

### Status Indicator
Shows simulation status:
- **Green dot + RUNNING**: Simulation active, data flowing
- **Gray dot + IDLE**: Simulation stopped
- Updates in real-time

### How to Use

**Testing Normal Operation:**
1. Click "Normal Flow"
2. Watch charts for smooth waveform
3. Monitor confidence score (stays low)
4. Observe alert system remains quiet

**Testing Leak Detection:**
1. Click "Simulate Leak"
2. Watch confidence score increase
3. Observe charts show anomalies
4. See right panel turn red
5. Verify alert system activates

**Fine-Tuning Parameters:**
1. Adjust "Noise Level" slider
2. Adjust "Leak Intensity" slider
3. Observe real-time chart changes
4. Monitor how AI responds

**Resetting Tests:**
1. Click "RESET" button
2. All sliders return to defaults
3. Simulation continues with new parameters

---

## Color & Visual Language

### Status Colors
- **Green (#00ff88)**: Success, normal, active
- **Yellow (#ffff00)**: Warning, caution needed
- **Orange (#ffa500)**: Alert, investigation needed
- **Red (#ff1744)**: Critical, immediate action
- **Pink (#ff0080)**: System alert, attention required

### Visual Effects
- **Neon Glow**: Active elements and headers
- **Pulsing Border**: Alert conditions
- **Animated Arrows**: Data flow direction
- **Smooth Transitions**: 300ms animations
- **Grid Pattern**: Subtle background structure

---

## Key Workflows

### Workflow 1: Monitor Normal Operation
1. Check Panel 3 status (should show "NORMAL")
2. Watch Panel 2 charts update smoothly
3. Verify confidence stays below 50%
4. Note steady feature metrics

**Expected Behavior**: Calm, stable signals with low noise

### Workflow 2: Respond to Leak Alert
1. Panel 3 turns red with "ALERT" badge
2. Confidence score jumps above 50%
3. Panel 2 shows spikes in waveform
4. Feature metrics increase significantly
5. Read classification level (MINOR/MODERATE/MAJOR)

**Expected Action**: Investigate location, plan repair

### Workflow 3: Test System Reliability
1. Click "Simulate Leak" in Panel 4
2. Verify all 3 panels respond
3. Adjust noise level to test robustness
4. Increase leak intensity gradually
5. Confirm system detects at appropriate threshold

**Expected Result**: Confident, consistent detection

### Workflow 4: Calibrate Detection Sensitivity
1. Set leak intensity to 30%
2. Observe confidence score
3. Adjust thresholds as needed
4. Test different noise levels
5. Document optimal settings

**Expected Result**: Reliable detection without false alarms

---

## Troubleshooting

### Charts Not Updating
- Check if simulation is running (look for "RUNNING" status)
- Verify browser is showing the preview
- Refresh the page if stuck

### Confidence Score Frozen
- Reset simulation with RESET button
- Toggle simulation off and back on
- Check API is responding at `/api/sensor-data`

### Alert Not Triggering
- Make sure "Simulate Leak" is selected
- Increase leak intensity slider to 70%+
- Verify Panel 3 is fully visible
- Check browser console for errors

### Charts Look Wrong
- Ensure dark theme is applied
- Check browser zoom level (should be 100%)
- Clear browser cache and reload
- Try different browser if issue persists

---

## Key Metrics Reference

### RMS (Root Mean Square)
- Measures average signal strength
- Normal: 0.2-0.5
- Leak: 0.8-1.5+
- Unit: Arbitrary (normalized)

### Variance
- Measures signal variability
- Normal: 0.3-0.6
- Leak: 1.0-2.0+
- Unit: Squared amplitude

### Energy
- Total power in signal
- Normal: 15-25
- Leak: 40-60+
- Unit: Joules (normalized)

### Confidence
- AI certainty of leak detection
- 0-20%: Definitely normal
- 20-50%: Possibly minor leak
- 50-85%: Likely moderate leak
- 85-100%: Definitely major leak

---

## Tips & Tricks

1. **Multi-Monitor Setup**: Maximize each panel on different screens
2. **Full Screen**: Press F11 to maximize dashboard visibility
3. **Take Screenshots**: Document baseline readings for comparison
4. **Test Regularly**: Simulate scenarios weekly to verify system
5. **Monitor Trends**: Track metrics over time for pattern recognition
6. **Archive Data**: Export readings before clearing for analysis

---

## Keyboard Shortcuts

Currently available:
- **F11**: Toggle fullscreen
- **Ctrl+Shift+I**: Open developer tools (if needed)
- **Ctrl+0**: Reset zoom to 100%
- **Ctrl++**: Zoom in on charts
- **Ctrl+-**: Zoom out on charts

---

## Support & Documentation

For more information, see:
- `CORE_IMPLEMENTATION.md` - Technical details
- `UPDATE_SUMMARY.md` - Feature overview
- `IMPLEMENTATION.md` - Complete architecture

---

## Quick Reference Card

| Panel | Purpose | Key Insight |
|-------|---------|------------|
| 1 | Show system architecture | Understand data flow |
| 2 | Display sensor data | See real-time signals |
| 3 | AI classification | Know alert status |
| 4 | Test system | Safe experimentation |

---

Last Updated: April 1, 2026
Version: 1.0 - Professional Release
