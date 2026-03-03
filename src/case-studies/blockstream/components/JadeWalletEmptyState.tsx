import React, { useState, useEffect } from 'react';
import { Shield, Wallet, ArrowRight, ShieldCheck, Lock, TrendingUp, History, ExternalLink, ChevronRight, Plus, RefreshCw, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { QRDemoCompact } from './QRDemoAnimation';

const btcData = [
  { price: 62000 },
  { price: 61500 },
  { price: 63000 },
  { price: 62800 },
  { price: 64500 },
  { price: 64000 },
  { price: 65200 },
  { price: 66100 },
  { price: 65800 },
  { price: 67200 },
  { price: 68500 },
  { price: 67900 },
  { price: 69514 },
];

const ONBOARDING_SLIDES = [
  {
    title: 'Self-Custody Simplified',
    description: 'Take full control of your Bitcoin. No middleman, no third-party risk. Just you and your keys.',
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    fact: 'Jade keeps your private keys entirely offline.',
  },
  {
    title: 'Always In Sync',
    description: 'Monitor your portfolio value in real-time. Connect your Jade to sign transactions securely.',
    icon: <TrendingUp className="w-8 h-8 text-cyan-400" />,
    fact: 'BTC is up 2.4% in the last 24 hours.',
  },
  {
    title: 'Air-Gapped Security',
    description: 'Use QR codes to interact with your wallet without ever connecting to a computer.',
    icon: <Lock className="w-8 h-8 text-cyan-400" />,
    fact: 'Fully open-source hardware & firmware.',
  },
];

export interface JadeWalletEmptyStateProps {
  onPairJade?: () => void;
}

export const JadeWalletEmptyState: React.FC<JadeWalletEmptyStateProps> = ({ onPairJade }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ONBOARDING_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#0f1419] text-white overflow-y-auto overflow-x-hidden font-sans pb-10">
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">Jade</h1>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-1">Status: Unpaired</p>
        </div>
        <div className="bg-slate-800/50 p-2 rounded-full border border-slate-700">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
        </div>
      </header>

      <main className="flex-1 px-6 space-y-6">
        <div className="bg-slate-900/40 rounded-xl p-4 border border-slate-800/50">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-medium text-slate-400">Setup Progress</span>
            <span className="text-sm font-bold text-cyan-400">0%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '8%' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            />
          </div>
        </div>

        <section className="bg-[#1a2128] rounded-2xl p-5 border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-[#F7931A] p-1 rounded-full">
                  <Wallet className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm text-slate-400 font-medium">Bitcoin Price</span>
              </div>
              <h2 className="text-3xl font-bold">$69,514.00</h2>
              <div className="flex items-center gap-1 mt-1 text-emerald-400 text-sm font-medium">
                <TrendingUp className="w-3 h-3" />
                <span>+2.28%</span>
                <span className="text-slate-500 ml-1">(24h)</span>
              </div>
            </div>
            <div className="bg-slate-800/80 rounded-lg px-2 py-1 flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400">LIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            </div>
          </div>
          <div className="h-24 w-full -mx-5 mb-2 opacity-50">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={btcData}>
                <YAxis hide domain={['dataMin', 'dataMax']} />
                <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={2} dot={false} animationDuration={1500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              {['1D', '1W', '1M', '1Y'].map((t) => (
                <button key={t} className={`text-[10px] px-2 py-1 rounded ${t === '1D' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500'}`}>
                  {t}
                </button>
              ))}
            </div>
            <button className="text-xs text-cyan-400 font-semibold flex items-center gap-1">
              Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        <section className="relative h-48 bg-cyan-500/5 rounded-2xl border border-cyan-500/10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 p-5 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-3">
                <div className="p-2 bg-cyan-500/10 rounded-lg w-fit">{ONBOARDING_SLIDES[currentSlide].icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{ONBOARDING_SLIDES[currentSlide].title}</h3>
                  <p className="text-sm text-slate-400 leading-tight mt-1">{ONBOARDING_SLIDES[currentSlide].description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-cyan-400/80 bg-cyan-400/5 py-1.5 px-3 rounded-full w-fit border border-cyan-400/10">
                <Info className="w-3 h-3" />
                <span>{ONBOARDING_SLIDES[currentSlide].fact}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {ONBOARDING_SLIDES.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-4 bg-cyan-400' : 'w-1 bg-slate-700'}`} />
            ))}
          </div>
        </section>

        <section>
          <QRDemoCompact />
        </section>

        <section className="space-y-3 pt-2">
          <button
            onClick={onPairJade}
            className="w-full bg-cyan-500 hover:bg-cyan-400 transition-colors text-slate-950 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            <span>Pair Your Jade</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700 py-3.5 rounded-xl text-sm font-semibold flex flex-col items-center gap-2 group">
              <RefreshCw className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              <span>Restore Seed</span>
            </button>
            <button className="bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700 py-3.5 rounded-xl text-sm font-semibold flex flex-col items-center gap-2 group">
              <History className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              <span>Watch-Only</span>
            </button>
          </div>
        </section>

        <footer className="pt-4 border-t border-slate-800/50 pb-8">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Learn More</h4>
          <div className="space-y-2">
            {[
              { title: 'What is a hardware wallet?', link: '#' },
              { title: 'The benefits of self-custody', link: '#' },
              { title: 'How to update Jade firmware', link: '#' },
            ].map((item, i) => (
              <a key={i} href={item.link} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 border border-slate-800/30 text-sm text-slate-300 hover:text-white transition-colors group">
                <span>{item.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400" />
              </a>
            ))}
          </div>
        </footer>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f1419]/90 backdrop-blur-xl border-t border-slate-800 flex justify-around items-center py-3 px-4 safe-area-bottom">
        <div className="flex flex-col items-center gap-1 text-cyan-400">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500">
          <History className="w-6 h-6" />
          <span className="text-[10px] font-medium">History</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500">
          <Shield className="w-6 h-6" />
          <span className="text-[10px] font-medium">Security</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500">
          <Lock className="w-6 h-6" />
          <span className="text-[10px] font-medium">Settings</span>
        </div>
      </nav>
    </div>
  );
};
