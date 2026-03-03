import React, { useState } from 'react';
import { Shield, Zap, ChevronRight, ChevronUp, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SetupChoiceScreenProps {
  onChoiceSelect?: (choice: 'software' | 'jade') => void;
}

export const SetupChoiceScreen: React.FC<SetupChoiceScreenProps> = ({ onChoiceSelect }) => {
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  return (
    <div className="flex flex-col h-full w-full bg-[#0f1419] text-white overflow-hidden font-sans">
      <header className="px-6 pt-6 pb-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold tracking-tight mb-1">Choose Your Setup</h1>
          <p className="text-sm text-slate-400">Select how you want to secure your Bitcoin.</p>
        </motion.div>
      </header>

      <main className="flex-1 px-6 pb-6 space-y-4 overflow-y-auto">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => onChoiceSelect?.('software')}
          className="w-full bg-slate-900/30 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl p-6 text-left transition-all active:scale-[0.98] group"
        >
          <div className="flex items-start justify-between mb-4">
            <Zap className="w-6 h-6 text-cyan-400" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Quick Start</span>
              <ChevronRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">Software Wallet</h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">Perfect for everyday Bitcoin</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Check className="w-4 h-4 text-slate-500" />
              <span>Set up in seconds</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Check className="w-4 h-4 text-slate-500" />
              <span>Perfect for daily use</span>
            </div>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => onChoiceSelect?.('jade')}
          className="w-full bg-slate-900/30 border border-slate-700/50 hover:border-emerald-500/50 rounded-2xl p-6 text-left transition-all active:scale-[0.98] group"
        >
          <div className="flex items-start justify-between mb-4">
            <Shield className="w-6 h-6 text-emerald-400" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Max Security</span>
              <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">Jade Hardware Wallet</h3>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">Protection for your capital nest</p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Check className="w-4 h-4 text-slate-500" />
              <span>Fully offline security</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-300">
              <Check className="w-4 h-4 text-slate-500" />
              <span>QR air-gapped signing</span>
            </div>
          </div>
        </motion.button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center py-0">
          <p className="text-sm text-slate-400">
            <span className="text-white font-medium">Not sure?</span> Start with Software Wallet — upgrade to Jade anytime.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={() => setIsComparisonOpen(true)}
          className="w-full py-3 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-400 transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Compare Options</span>
          <ChevronUp className="w-4 h-4" />
        </motion.button>

        <AnimatePresence>
          {isComparisonOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsComparisonOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="fixed inset-x-0 bottom-0 z-50 bg-[#0f1419] rounded-t-3xl border-t border-slate-800 shadow-2xl max-h-[80vh] overflow-hidden"
              >
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 bg-slate-700 rounded-full" />
                </div>
                <div className="flex items-center justify-between px-6 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">Wallet Comparison</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Choose what&apos;s right for you</p>
                  </div>
                  <button onClick={() => setIsComparisonOpen(false)} className="p-2 rounded-full hover:bg-slate-800/50 transition-colors">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                <div className="px-6 pb-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                  <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-800">
                          <th className="text-left p-3 text-xs font-semibold text-slate-400 w-1/3">Feature</th>
                          <th className="text-center p-3 text-xs font-semibold text-cyan-400 w-1/3">Software</th>
                          <th className="text-center p-3 text-xs font-semibold text-emerald-400 w-1/3">Jade</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr className="border-b border-slate-800/50">
                          <td className="p-3 text-slate-300">Setup Time</td>
                          <td className="p-3 text-center text-slate-400">5 minutes</td>
                          <td className="p-3 text-center text-slate-400">10 minutes</td>
                        </tr>
                        <tr className="border-b border-slate-800/50">
                          <td className="p-3 text-slate-300">Security Level</td>
                          <td className="p-3 text-center text-slate-400">High</td>
                          <td className="p-3 text-center text-slate-400">Maximum</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-slate-300">Requires Hardware</td>
                          <td className="p-3 text-center text-slate-400">No</td>
                          <td className="p-3 text-center text-slate-400">Yes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};
