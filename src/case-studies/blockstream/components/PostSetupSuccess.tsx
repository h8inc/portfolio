import React from 'react';
import { Shield, Check, Lock, Sparkles, ArrowRight, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PostSetupSuccessProps {
  onContinue?: () => void;
  userName?: string;
}

export const PostSetupSuccess: React.FC<PostSetupSuccessProps> = ({ onContinue, userName = 'there' }) => {
  return (
    <div className="flex flex-col h-full w-full bg-[#0f1419] text-white overflow-y-auto overflow-x-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute top-20 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-40 left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
      </div>

      <main className="relative flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative mb-8"
        >
          <motion.div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full blur-2xl" animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
            <div className="w-28 h-28 bg-[#0f1419] rounded-full flex items-center justify-center">
              <Shield className="w-14 h-14 text-emerald-400" />
            </div>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring', stiffness: 200 }} className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-[#0f1419]">
              <Check className="w-6 h-6 text-white" />
            </motion.div>
          </div>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ top: `${20 + Math.sin((i / 6) * Math.PI * 2) * 60}px`, left: `${20 + Math.cos((i / 6) * Math.PI * 2) * 60}px` }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: [0, 180] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">You&apos;re All Set! 🎉</h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Welcome, {userName}! Your Jade is now paired and ready. You&apos;ve unlocked the highest level of Bitcoin security.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="w-full max-w-md bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Achievement Unlocked</h3>
              <p className="text-xs text-slate-400">Offline Signing Master</p>
            </div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 space-y-3">
            {[
              { title: 'Air-Gapped Security', sub: 'Your keys never touch the internet' },
              { title: 'Open-Source Verified', sub: 'Fully auditable hardware & software' },
              { title: 'True Self-Custody', sub: 'You control 100% of your Bitcoin' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="w-full max-w-md bg-slate-900/40 border border-slate-800 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3 mb-3">
            <Lock className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white mb-1">What&apos;s Next?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Every transaction now requires approval on your Jade device. This means:</p>
            </div>
          </div>
          <div className="pl-8 space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <span>No one can spend your Bitcoin without physical access to your Jade</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <span>Malware and hackers can&apos;t steal your funds</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
              <span>You verify every transaction on the device screen</span>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={onContinue}
          className="w-full max-w-md bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
        >
          <span>Continue to Wallet</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="text-xs text-slate-500 text-center mt-6 max-w-sm">
          💡 Pro tip: Keep your Jade&apos;s PIN code private and store your recovery phrase in a secure location.
        </motion.p>
      </main>
    </div>
  );
};
