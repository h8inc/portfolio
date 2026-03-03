import React, { useState, useEffect } from 'react';
import { Shield, Wallet, TrendingUp, History, ExternalLink, ChevronRight, Plus, Send, Download, ArrowUpRight, ArrowDownLeft, Lock, Settings, Eye, QrCode, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const btcData = [
  { price: 62000 }, { price: 61500 }, { price: 63000 }, { price: 62800 }, { price: 64500 }, { price: 64000 },
  { price: 65200 }, { price: 66100 }, { price: 65800 }, { price: 67200 }, { price: 68500 }, { price: 67900 }, { price: 69514 },
];

const recentTransactions = [
  { type: 'received' as const, amount: 0.05, usd: 3475.7, date: '2024-01-15', status: 'confirmed' },
  { type: 'sent' as const, amount: 0.02, usd: 1390.28, date: '2024-01-14', status: 'confirmed' },
  { type: 'received' as const, amount: 0.1, usd: 6951.4, date: '2024-01-12', status: 'confirmed' },
];

export interface WalletDashboardProps {
  setupType?: 'software' | 'jade';
  userName?: string;
  isEmpty?: boolean;
}

export const WalletDashboard: React.FC<WalletDashboardProps> = ({ setupType = 'software', userName = 'there', isEmpty = true }) => {
  const [balance] = useState(isEmpty ? 0 : 0.15);
  const [, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const usdBalance = balance * 69514;

  return (
    <div className="flex flex-col h-full w-full bg-[#0f1419] text-white overflow-y-auto overflow-x-hidden font-sans pb-24">
      <header className="px-6 pt-8 pb-6 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-sm text-slate-400">Welcome back,</span>
            <h1 className="text-2xl font-bold tracking-tight">{userName}</h1>
          </div>
          <div className="flex items-center gap-2">
            {setupType === 'jade' && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
            )}
            <button type="button" className="bg-slate-800/50 p-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors">
              <Settings className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-br rounded-2xl p-6 border relative overflow-hidden ${isEmpty ? 'from-slate-800/20 to-slate-900/20 border-slate-800/50' : 'from-cyan-500/10 to-purple-500/10 border-cyan-500/20'}`}
        >
          {!isEmpty && (
            <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
          )}
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Total Balance</span>
              {!isEmpty && (
                <button type="button" className="text-slate-400 hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="mb-2">
              <h2 className={`text-4xl font-bold mb-1 ${isEmpty ? 'text-slate-500' : ''}`}>
                ${usdBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${isEmpty ? 'text-slate-600' : 'text-slate-300'}`}>{balance.toFixed(8)} BTC</span>
                {!isEmpty && (
                  <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
                    <TrendingUp className="w-3 h-3" />
                    <span>+2.28%</span>
                  </div>
                )}
              </div>
            </div>
            {!isEmpty && (
              <div className="h-16 w-full -mx-2 mt-4 opacity-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={btcData}>
                    <Line type="monotone" dataKey="price" stroke="#22d3ee" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {isEmpty && (
              <div className="h-16 w-full -mx-2 mt-4 flex items-center justify-center">
                <div className="text-slate-600 text-xs italic">No transaction history yet</div>
              </div>
            )}
          </div>
        </motion.div>
      </header>

      <main className="px-6 space-y-6">
        {isEmpty ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
              <div className="relative z-10">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full mb-6 border border-cyan-500/30">
                  <Sparkles className="w-10 h-10 text-cyan-400" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Get Started with Bitcoin</h2>
                <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">Your wallet is ready! Receive your first Bitcoin to start building your portfolio.</p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 py-5 rounded-xl font-bold text-lg shadow-xl shadow-cyan-500/30 mb-4 flex items-center justify-center gap-3 transition-all">
                  <Download className="w-6 h-6" />
                  Receive Bitcoin
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all">
                  <Plus className="w-5 h-5" />
                  Buy Bitcoin
                </motion.button>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <p className="text-xs text-slate-500">
                    Need help? Check out our{' '}
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 font-medium">
                      getting started guide
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:bg-slate-900/60 transition-colors cursor-pointer">
                <div className="bg-cyan-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <QrCode className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="text-sm font-semibold mb-1">Scan QR Code</h4>
                <p className="text-xs text-slate-500">Send from another wallet</p>
              </div>
              <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 hover:bg-slate-900/60 transition-colors cursor-pointer">
                <div className="bg-purple-500/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Wallet className="w-5 h-5 text-purple-400" />
                </div>
                <h4 className="text-sm font-semibold mb-1">Your Address</h4>
                <p className="text-xs text-slate-500">Share to receive funds</p>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-3 gap-3">
              <button type="button" className="bg-cyan-500 hover:bg-cyan-400 transition-colors text-slate-950 py-4 rounded-xl font-semibold flex flex-col items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95">
                <Send className="w-5 h-5" />
                <span className="text-sm">Send</span>
              </button>
              <button type="button" className="bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700 py-4 rounded-xl font-semibold flex flex-col items-center gap-2 active:scale-95">
                <Download className="w-5 h-5" />
                <span className="text-sm">Receive</span>
              </button>
              <button type="button" className="bg-slate-800/50 hover:bg-slate-800 transition-colors border border-slate-700 py-4 rounded-xl font-semibold flex flex-col items-center gap-2 active:scale-95">
                <QrCode className="w-5 h-5" />
                <span className="text-sm">Scan</span>
              </button>
            </motion.div>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#1a2128] rounded-2xl p-5 border border-slate-800">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-[#F7931A] p-1 rounded-full">
                      <Wallet className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm text-slate-400 font-medium">Bitcoin Price</span>
                  </div>
                  <h3 className="text-2xl font-bold">$69,514.00</h3>
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
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/50">
                <div className="flex gap-2">
                  {['1D', '1W', '1M', '1Y'].map((t) => (
                    <button key={t} type="button" className={`text-[10px] px-2 py-1 rounded ${t === '1D' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <button type="button" className="text-xs text-cyan-400 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  Details <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.section>
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Recent Activity</h3>
                <button type="button" className="text-xs text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-2">
                {recentTransactions.map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-4 flex items-center justify-between hover:bg-slate-900/60 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'received' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                        {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white capitalize">{tx.type}</p>
                        <p className="text-xs text-slate-500">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${tx.type === 'received' ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.type === 'received' ? '+' : '-'}{tx.amount} BTC
                      </p>
                      <p className="text-xs text-slate-500">${tx.usd.toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}

        {setupType === 'jade' && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isEmpty ? 0.6 : 0.8 }}
            className="bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 rounded-xl p-5"
          >
            <div className="flex items-start gap-3">
              <div className="bg-emerald-500/20 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white mb-1">Jade Protected</h4>
                <p className="text-xs text-slate-400 leading-relaxed">All transactions require approval on your hardware device. Your keys are secured offline.</p>
              </div>
            </div>
          </motion.section>
        )}

        <section className="pt-2 pb-4">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Links</h4>
          <div className="space-y-2">
            {[
              { title: 'Backup your wallet', link: '#' },
              { title: 'Security settings', link: '#' },
              { title: 'Transaction history', link: '#' },
            ].map((item, i) => (
              <a key={i} href={item.link} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/30 border border-slate-800/30 text-sm text-slate-300 hover:text-white hover:bg-slate-900/50 transition-colors group">
                <span>{item.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </a>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#0f1419]/90 backdrop-blur-xl border-t border-slate-800 flex justify-around items-center py-3 px-4 safe-area-bottom">
        <div className="flex flex-col items-center gap-1 text-cyan-400">
          <Wallet className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <History className="w-6 h-6" />
          <span className="text-[10px] font-medium">History</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <Shield className="w-6 h-6" />
          <span className="text-[10px] font-medium">Security</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <Lock className="w-6 h-6" />
          <span className="text-[10px] font-medium">Settings</span>
        </div>
      </nav>
    </div>
  );
};
