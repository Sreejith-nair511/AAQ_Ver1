# AQUA-SENSE CORE 🚰⚡

### *Smart Infrastructure Monitoring & Real-Time Leak Detection*

![AQUA-SENSE Banner](https://img.shields.io/badge/Status-Active-00FF88?style=for-the-badge&logo=stackshare)
![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.2-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 🌊 Overview

**AQUA-SENSE CORE** is a next-generation IoT platform designed for high-precision water infrastructure monitoring. Leveraging advanced **Digital Signal Processing (DSP)** and real-time vibration analysis, the system identifies pipeline anomalies and leak signatures before they become critical failures.

---

## 🛠️ High-Performance Architecture

### 📊 Real-Time Signal Processing
- **10kHz Sampling**: High-fidelity vibration data capture at the edge.
- **FFT Analysis**: Instantaneous Fast Fourier Transform for frequency domain fingerprinting.
- **Leak Detection Algorithm**: Multi-variance analysis checking for high-frequency (150-200Hz) anomalies.
- **95% Confidence Level**: AI-calculated confidence score based on signal-to-noise ratios.

### 🌐 Scalable Tech Stack
- **Dashboard**: Next.js 16 (App Router) + React 19.
- **Styling**: Custom **Futuristic Neon UI** with CSS Glassmorphism.
- **Visualization**: Non-blocking **Recharts** implementation for smooth 60fps data streaming.
- **Edge Simulation**: Integrated real-time signal generator for testing "Leak" vs "Normal" scenarios.

---

## 🚀 Key Features

- **Neon Alert Interface**: Instant visual feedback for leak detection with synchronized pulsing animations.
- **Interactive Flow Map**: Visualize the data journey from **Edge (NodeMCU)** to **Cloud (AI Engine)**.
- **Dynamic Simulation Engine**: Inject noise or trigger leak scenarios to test system resilience.
- **Analytics Dashboard**: Live waveform and frequency spectrum analysis side-by-side.

---

## 🔧 Getting Started

1. **Install Core Dependencies**
   ```bash
   npm install
   ```

2. **Launch the Real-time Environment**
   ```bash
   npm run dev
   ```

3. **Monitor System Health**
   Access the dashboard at `http://localhost:3000`.

---

## 📦 System Assets

| Asset | Description |
|---|---|
| `/api/sensor-data` | High-frequency signal processing backend. |
| `/components/signal-charts` | Advanced Recharts waveform visualization. |
| `/hooks/use-sensor-data` | Optimized SWR-inspired data polling stream. |
| `/public/icon.svg` | Premium custom AQUA-SENSE branding. |

---

### *AQUA-SENSE - Smart Water Infrastructure for the Future.*
