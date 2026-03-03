import React from 'react';
import { Shield, QrCode, ShoppingCart, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export interface JadeSetupOptionsProps {
  onOptionSelect?: (option: 'pair' | 'skip' | 'buy') => void;
}

export const JadeSetupOptions: React.FC<JadeSetupOptionsProps> = ({ onOptionSelect }) => {
  return (
    <div className="flex flex-col h-full w-full bg-[#0f1419] text-white overflow-hidden font-sans">
      <header className="px-6 pt-6 pb-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-3">
          <div className="p-2 bg-[#00d4ff]/10 rounded-xl">
            <Shield className="w-5 h-5 text-[#00d4ff]" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Jade Hardware Wallet</h1>
            <p className="text-xs text-[#00d4ff] uppercase tracking-wider font-semibold">Max Security Setup</p>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 px-6 pb-6 flex flex-col justify-center space-y-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={() => onOptionSelect?.('pair')}
          className="w-full bg-[#00d4ff] hover:bg-[#33ddff] rounded-2xl p-5 text-left transition-all active:scale-[0.98] shadow-lg shadow-[#00d4ff]/20 group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QrCode className="w-5 h-5 text-[#0f1419]" />
              <div>
                <h3 className="text-lg font-bold text-[#0f1419]">Pair Your Jade</h3>
                <p className="text-xs text-[#0f1419]/80">Connect your Jade hardware wallet now for maximum security</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#0f1419] group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] font-bold text-[#0f1419]/80 uppercase tracking-widest">Recommended</span>
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onClick={() => onOptionSelect?.('skip')}
          className="w-full bg-slate-900/30 border border-slate-700/50 hover:border-slate-600 rounded-2xl p-5 text-left transition-all active:scale-[0.98] group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-slate-400" />
              <div>
                <h3 className="text-lg font-bold group-hover:text-white transition-colors">Set Up Later</h3>
                <p className="text-xs text-slate-400">Explore the app without pairing. You can connect your Jade anytime.</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => onOptionSelect?.('buy')}
          className="w-full bg-slate-900/30 border border-slate-700/50 hover:border-slate-600 rounded-2xl p-5 text-left transition-all active:scale-[0.98] group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-5 h-5 text-slate-400" />
              <div>
                <h3 className="text-lg font-bold group-hover:text-white transition-colors">Explore Jade Benefits</h3>
                <p className="text-xs text-slate-400">Learn more about Jade features and get yours today</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Don&apos;t have one?</span>
          </div>
        </motion.button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-center pt-2">
          <p className="text-xs text-slate-500">
            Need help? Check our <span className="text-slate-400 underline">setup guide</span>
          </p>
        </motion.div>
      </main>
    </div>
  );
};
