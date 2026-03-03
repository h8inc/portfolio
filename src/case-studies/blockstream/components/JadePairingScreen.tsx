import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bluetooth, Smartphone, Check, Shield, Wifi, ChevronRight, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface JadePairingScreenProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

type PairingStep = 'scanning' | 'device-list' | 'pairing-code';
interface JadeDevice {
  id: string;
  name: string;
  signal: number;
  battery?: number;
}

const MOCK_DEVICES: JadeDevice[] = [
  { id: '1', name: 'Jade 7A3F', signal: 95, battery: 87 },
  { id: '2', name: 'Jade 2B91', signal: 72, battery: 45 },
  { id: '3', name: 'Jade CF04', signal: 58, battery: 92 },
];
const PAIRING_CODE = '749-01';

export const JadePairingScreen: React.FC<JadePairingScreenProps> = ({ onSuccess, onBack }) => {
  const [currentStep, setCurrentStep] = useState<PairingStep>('scanning');
  const [discoveredDevices, setDiscoveredDevices] = useState<JadeDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<JadeDevice | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [pairingProgress, setPairingProgress] = useState(0);

  useEffect(() => {
    if (currentStep === 'scanning' && isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            MOCK_DEVICES.forEach((device, index) => {
              setTimeout(() => {
                setDiscoveredDevices((d) => [...d, device]);
              }, index * 600);
            });
            setTimeout(() => setCurrentStep('device-list'), 2000);
            return 100;
          }
          return prev + 3;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [currentStep, isScanning]);

  useEffect(() => {
    if (currentStep !== 'pairing-code') return;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setPairingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onSuccess?.(), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [currentStep, onSuccess]);

  const handleDeviceSelect = (device: JadeDevice) => {
    setSelectedDevice(device);
    setCurrentStep('pairing-code');
  };
  const handleRescan = () => {
    setDiscoveredDevices([]);
    setScanProgress(0);
    setIsScanning(true);
    setCurrentStep('scanning');
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0f1419] text-white overflow-y-auto overflow-x-hidden font-sans">
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="px-6 pt-6 pb-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </motion.header>

      <main className="flex-1 px-6 pb-20">
        <AnimatePresence mode="wait">
          {currentStep === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <motion.div className="relative mb-8">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border-2 border-emerald-400 rounded-full"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2 + i, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: 'easeOut' }}
                    style={{ width: 128, height: 128, left: -16, top: -16 }}
                  />
                ))}
                <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                    <Bluetooth className="w-16 h-16 text-emerald-400" />
                  </motion.div>
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Scanning for Jade</h2>
              <p className="text-sm text-slate-400 mb-8 text-center max-w-sm">Make sure your Jade is powered on and Bluetooth is enabled</p>
              <div className="w-full max-w-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-400">Scanning nearby devices...</span>
                  <span className="text-sm font-bold text-emerald-400">{scanProgress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500" initial={{ width: 0 }} animate={{ width: `${scanProgress}%` }} transition={{ duration: 0.3 }} />
                </div>
                {discoveredDevices.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                      <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Found {discoveredDevices.length} device{discoveredDevices.length !== 1 ? 's' : ''}</p>
                      <p className="text-xs text-slate-400">Completing scan...</p>
                    </div>
                  </motion.div>
                )}
              </div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 text-center">
                <p className="text-xs text-slate-500 mb-2">Not finding your device?</p>
                <button type="button" className="text-xs text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                  View Troubleshooting Guide →
                </button>
              </motion.div>
            </motion.div>
          )}

          {currentStep === 'device-list' && (
            <motion.div key="device-list" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6 pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Bluetooth className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Select Your Jade</h2>
                  <p className="text-xs text-slate-400">{discoveredDevices.length} device{discoveredDevices.length !== 1 ? 's' : ''} found</p>
                </div>
              </div>
              <div className="space-y-3">
                {discoveredDevices.map((device, index) => (
                  <motion.button
                    key={device.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleDeviceSelect(device)}
                    className="w-full bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-500/20 p-3 rounded-xl group-hover:bg-emerald-500/30 transition-colors">
                        <Smartphone className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{device.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <div className="flex items-center gap-1">
                            <Wifi className="w-3 h-3" />
                            <span>{device.signal}% signal</span>
                          </div>
                          {device.battery != null && (
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              <span>{device.battery}% battery</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>
                ))}
              </div>
              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={handleRescan} className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                <RefreshCw className="w-4 h-4" />
                <span>Scan Again</span>
              </motion.button>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <span className="font-semibold text-white">Tip:</span> Select the Jade device you want to pair with. The device name is shown on your Jade screen.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {currentStep === 'pairing-code' && selectedDevice && (
            <motion.div key="pairing-code" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6 pt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-cyan-500/20 p-2 rounded-lg">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Verify Pairing Code</h2>
                  <p className="text-xs text-slate-400">Connecting to {selectedDevice.name}</p>
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30 rounded-2xl p-8 text-center">
                <div className="mb-4">
                  <p className="text-sm text-slate-400 mb-2">Check your Jade screen for this code:</p>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="inline-block">
                    <div className="bg-[#0f1419] px-8 py-6 rounded-xl border-2 border-cyan-400">
                      <span className="text-5xl font-bold font-mono tracking-wider text-cyan-400">{PAIRING_CODE}</span>
                    </div>
                  </motion.div>
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Waiting for confirmation on Jade...</span>
                  </div>
                </div>
              </motion.div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-cyan-400" />
                  <span>Pairing Instructions</span>
                </h4>
                <div className="space-y-3">
                  {[
                    'Check that the pairing code on your Jade screen matches the code above',
                    "If the codes match, press the checkmark button on your Jade",
                    "If they don't match, press the X button and try again",
                  ].map((instruction, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-2 text-xs text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-cyan-400">{i + 1}</span>
                      </div>
                      <span className="leading-relaxed">{instruction}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              {pairingProgress > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-emerald-500/20 p-2 rounded-lg">
                      <Check className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">Pairing Confirmed</p>
                      <p className="text-xs text-slate-400">Establishing secure connection...</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div className="h-full bg-emerald-400" initial={{ width: 0 }} animate={{ width: `${pairingProgress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
