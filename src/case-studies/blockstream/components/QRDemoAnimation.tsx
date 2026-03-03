import React, { useState, useEffect } from 'react';
import { Smartphone, Check, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QRDemoAnimationProps {
  autoPlay?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
type AnimationStep = 'scan' | 'verify' | 'approve' | 'complete';
export const QRDemoAnimation: React.FC<QRDemoAnimationProps> = ({
  autoPlay = true,
  size = 'md'
}) => {
  const [step, setStep] = useState<AnimationStep>('scan');
  useEffect(() => {
    if (!autoPlay) return;
    const sequence = ['scan', 'verify', 'approve', 'complete'] as AnimationStep[];
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sequence.length;
      setStep(sequence[currentIndex]);
    }, 2000);
    return () => clearInterval(interval);
  }, [autoPlay]);
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };
  const iconSize = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };
  return (
    <div className={`${sizeClasses[size]} relative mx-auto`}>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full" />
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-lg p-2">
                  <div className="w-full h-full grid grid-cols-4 gap-0.5">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="bg-slate-900 rounded-sm" style={{ opacity: Math.random() > 0.3 ? 1 : 0 }} />
                    ))}
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 border-2 border-cyan-400 rounded-lg"
                  animate={{ scale: [1, 1.1, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <span className="text-xs font-semibold text-cyan-400">Scanning QR...</span>
            </motion.div>
          )}
          {step === 'verify' && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <Smartphone className={`${iconSize[size]} text-slate-400`} />
                <motion.div
                  className="absolute -right-1 -top-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <span className="text-xs font-bold text-slate-900">!</span>
                </motion.div>
              </div>
              <span className="text-xs font-semibold text-yellow-400">Verify on device</span>
            </motion.div>
          )}
          {step === 'approve' && (
            <motion.div
              key="approve"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative">
                <Smartphone className={`${iconSize[size]} text-emerald-400`} />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              </div>
              <span className="text-xs font-semibold text-emerald-400">Approved!</span>
            </motion.div>
          )}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <span className="text-xs font-semibold text-emerald-400">Transaction Signed</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
        {['scan', 'verify', 'approve', 'complete'].map((s) => (
          <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-6 bg-cyan-400' : 'w-1 bg-slate-700'}`} />
        ))}
      </div>
    </div>
  );
};

export const QRDemoCompact: React.FC = () => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-cyan-500/20 p-2 rounded-lg">
          <QrCode className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">How It Works</h4>
          <p className="text-xs text-slate-400">Air-gapped signing demo</p>
        </div>
      </div>
      <QRDemoAnimation size="sm" autoPlay />
      <div className="mt-8 space-y-2 text-xs text-slate-400">
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
          <span>Scan transaction QR code with Jade</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
          <span>Verify details on device screen</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
          <span>Approve with physical button press</span>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
          <span>Scan signed transaction back to app</span>
        </div>
      </div>
    </div>
  );
};
