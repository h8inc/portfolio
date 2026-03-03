import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Zap, Bitcoin, QrCode, Check, Settings, Loader2, Droplets, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Helper: Format number as currency
const formatUSD = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

// Helper: Detect address/invoice type
const detectAddressType = (input: string): 'lightning' | 'bitcoin' | 'liquid' | null => {
  const trimmed = input.trim().toLowerCase();
  if (trimmed.startsWith('lnbc') || trimmed.startsWith('lnurl')) return 'lightning';
  if (trimmed.startsWith('bc1') || trimmed.startsWith('1') || trimmed.startsWith('3')) return 'bitcoin';
  if (trimmed.startsWith('lq1') || trimmed.startsWith('ex1')) return 'liquid';
  return null;
};

// @component: BlockstreamSendFlow
export const BlockstreamSendFlow = () => {
  // Core State
  const [mode, setMode] = useState<'simple' | 'advanced'>('simple');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  // Advanced Mode State
  const [selectedNetwork, setSelectedNetwork] = useState<'lightning' | 'bitcoin' | 'liquid'>('lightning');

  // Simple Mode Auto-detection
  const [detectedType, setDetectedType] = useState<'lightning' | 'bitcoin' | 'liquid' | null>(null);
  const [needsSwap, setNeedsSwap] = useState(false);

  // UI State
  const [isSending, setIsSending] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [swapProgress, setSwapProgress] = useState(0);

  // Mock balances
  const [balances] = useState({
    bitcoin: 0.05,
    lightning: 0.001,
    liquid: 0.02
  });

  // Auto-detect address type in Simple Mode
  useEffect(() => {
    if (mode === 'simple' && address) {
      const type = detectAddressType(address);
      setDetectedType(type);

      // Check if swap is needed (simplified logic)
      if (type === 'lightning' && balances.lightning < Number(amount)) {
        setNeedsSwap(true);
      } else {
        setNeedsSwap(false);
      }
    }
  }, [address, amount, mode, balances.lightning]);

  // Handle send transaction
  const handleSend = () => {
    setIsSending(true);

    // Simulate swap if needed
    if (needsSwap && mode === 'simple') {
      setIsSwapping(true);

      // Animate swap progress
      const interval = setInterval(() => {
        setSwapProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSwapping(false);
            // Then send
            setTimeout(() => {
              setIsSending(false);
              setShowConfirmation(true);
            }, 800);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      // Direct send
      setTimeout(() => {
        setIsSending(false);
        setShowConfirmation(true);
      }, 2000);
    }
  };
  const resetFlow = () => {
    setAddress('');
    setAmount('');
    setShowConfirmation(false);
    setNeedsSwap(false);
    setSwapProgress(0);
  };

  // Get appropriate icon for detected type
  const getTypeIcon = (type: string | null) => {
    switch (type) {
      case 'lightning':
        return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'bitcoin':
        return <Bitcoin className="w-4 h-4 text-orange-400" />;
      case 'liquid':
        return <Droplets className="w-4 h-4 text-cyan-400" />;
      default:
        return <ArrowUpRight className="w-4 h-4 text-white/40" />;
    }
  };
  const getTypeName = (type: string | null) => {
    switch (type) {
      case 'lightning':
        return 'Lightning';
      case 'bitcoin':
        return 'Bitcoin';
      case 'liquid':
        return 'Liquid';
      default:
        return 'Unknown';
    }
  };

  // @return
  return <div className="w-full h-full bg-[#0f0f0f] text-white font-mono flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </div>
          <h1 className="text-base font-bold">Send</h1>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setMode(mode === 'simple' ? 'advanced' : 'simple')} className={cn("p-2 rounded-full transition-colors", mode === 'advanced' ? "bg-cyan-500/10 text-cyan-400" : "hover:bg-white/5 text-white/40")}>
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-5 flex flex-col gap-3 pb-4 overflow-hidden">
        
        {/* Mode Indicator */}
        <div className="shrink-0">
          <AnimatePresence mode="wait">
            {mode === 'simple' && <motion.div key="simple-banner" initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} className="overflow-hidden">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-cyan-200/90 leading-relaxed">
                      <strong className="font-bold">Simple Mode:</strong> Just paste any address or invoice. We'll automatically detect the type and route your payment optimally.
                    </p>
                  </div>
                </div>
              </motion.div>}
          </AnimatePresence>
        </div>

        {/* Advanced Mode: Network Selection */}
        {mode === 'advanced' && <motion.div initial={{
        opacity: 0,
        y: -10
      }} animate={{
        opacity: 1,
        y: 0
      }} className="shrink-0">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-0.5 mb-2 block">
              Network
            </label>
            <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
              <button onClick={() => setSelectedNetwork('lightning')} className={cn("flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all duration-200", selectedNetwork === 'lightning' ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" : "text-white/40 border border-transparent hover:text-white/60")}>
                <Zap className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Lightning</span>
              </button>

              <button onClick={() => setSelectedNetwork('bitcoin')} className={cn("flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all duration-200", selectedNetwork === 'bitcoin' ? "bg-orange-500/10 text-orange-400 border border-orange-400/20" : "text-white/40 border border-transparent hover:text-white/60")}>
                <Bitcoin className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Bitcoin</span>
              </button>

              <button onClick={() => setSelectedNetwork('liquid')} className={cn("flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all duration-200", selectedNetwork === 'liquid' ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20" : "text-white/40 border border-transparent hover:text-white/60")}>
                <Droplets className="w-4 h-4 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-tight">Liquid</span>
              </button>
            </div>
          </motion.div>}

        {/* Input: Recipient (Simple Mode - Smart Detection) */}
        <div className="space-y-1.5 shrink-0">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-0.5">
            {mode === 'simple' ? 'Send to' : 'Recipient'}
          </label>
          <div className="relative group">
            <input value={address} onChange={e => setAddress(e.target.value)} placeholder={mode === 'simple' ? 'Paste address or invoice...' : selectedNetwork === 'lightning' ? 'lnbc...' : selectedNetwork === 'liquid' ? 'lq1...' : 'bc1q...'} className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] font-mono transition-all" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-cyan-400 transition-colors">
              <QrCode className="w-4 h-4" />
            </button>
          </div>

          {/* Detection Indicator (Simple Mode) */}
          {mode === 'simple' && detectedType && <motion.div initial={{
          opacity: 0,
          y: -5
        }} animate={{
          opacity: 1,
          y: 0
        }} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg">
              {getTypeIcon(detectedType)}
              <span className="text-[10px] text-white/60">
                Detected: <strong className="text-white font-bold">{getTypeName(detectedType)}</strong>
              </span>
            </motion.div>}
        </div>

        {/* Swap Warning (Simple Mode) */}
        {mode === 'simple' && needsSwap && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} className="overflow-hidden shrink-0">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-yellow-200/90 leading-relaxed">
                  We'll automatically swap from your Bitcoin balance to Lightning to complete this payment.
                </p>
              </div>
            </div>
          </motion.div>}

        {/* Input: Amount */}
        <div className="space-y-1.5 shrink-0">
          <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider px-0.5">
            Amount
          </label>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2 focus-within:border-cyan-500/50 transition-all">
            <div className="flex items-center justify-between">
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="bg-transparent text-3xl font-bold w-2/3 focus:outline-none placeholder:text-white/10 font-mono" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white/40 font-mono">BTC</span>
                <button className="px-2.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-bold transition-colors border border-cyan-500/20">
                  MAX
                </button>
              </div>
            </div>
            <div className="text-xs text-white/50 font-mono">
              ≈ {formatUSD(Number(amount) * 65000)}
            </div>
          </div>
        </div>

        {/* Balance Display (Simple Mode) */}
        {mode === 'simple' && <div className="bg-white/5 rounded-xl p-3 shrink-0">
            <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold mb-2">
              Total Balance
            </div>
            <div className="text-xl font-bold font-mono">
              {(balances.bitcoin + balances.lightning + balances.liquid).toFixed(8)} BTC
            </div>
            <div className="text-[10px] text-white/40 font-mono mt-1">
              ≈ {formatUSD((balances.bitcoin + balances.lightning + balances.liquid) * 65000)}
            </div>
          </div>}

        {/* Advanced Balance Display */}
        {mode === 'advanced' && <div className="bg-white/5 rounded-xl p-3 space-y-2 shrink-0">
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-white/60">Lightning</span>
              </div>
              <span className="font-bold font-mono">{balances.lightning.toFixed(8)} BTC</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <Bitcoin className="w-3 h-3 text-orange-400" />
                <span className="text-white/60">Bitcoin</span>
              </div>
              <span className="font-bold font-mono">{balances.bitcoin.toFixed(8)} BTC</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-2">
                <Droplets className="w-3 h-3 text-cyan-400" />
                <span className="text-white/60">Liquid</span>
              </div>
              <span className="font-bold font-mono">{balances.liquid.toFixed(8)} BTC</span>
            </div>
          </div>}

        {/* Spacer */}
        <div className="flex-1 min-h-0" />

        {/* Send Button */}
        <button disabled={!address || !amount || isSending} onClick={handleSend} className={cn("w-full h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-30 disabled:grayscale shrink-0 text-base", "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.3)]")}>
          {isSending ? <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{isSwapping ? 'Swapping...' : 'Sending...'}</span>
            </> : <>
              <ArrowUpRight className="w-5 h-5" />
              <span>Send Payment</span>
            </>}
        </button>

        {/* Advanced Options Link (Simple Mode) */}
        {mode === 'simple' && <button onClick={() => setMode('advanced')} className="w-full py-2 text-[10px] text-white/40 hover:text-white/60 transition-colors flex items-center justify-center gap-1 shrink-0">
            <Settings className="w-3 h-3" />
            <span>Advanced options</span>
            <ChevronRight className="w-3 h-3" />
          </button>}
      </div>

      {/* Swap Progress Overlay */}
      <AnimatePresence>
        {isSwapping && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="absolute inset-0 z-40 bg-black/90 backdrop-blur-md flex items-center justify-center p-5">
            <motion.div initial={{
          scale: 0.9,
          y: 20
        }} animate={{
          scale: 1,
          y: 0
        }} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-bold uppercase tracking-tight">Auto-Swapping</h2>
                <p className="text-[10px] text-white/40">
                  Converting Bitcoin to Lightning...
                </p>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500" initial={{
              width: 0
            }} animate={{
              width: `${swapProgress}%`
            }} transition={{
              duration: 0.3
            }} />
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-5">
            <motion.div initial={{
          scale: 0.9,
          y: 20
        }} animate={{
          scale: 1,
          y: 0
        }} className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold uppercase tracking-tight">Payment Sent</h2>
                <p className="text-[10px] text-white/40">
                  Your transaction has been broadcast successfully.
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-left space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Amount</span>
                  <span className="font-bold font-mono">{amount} BTC</span>
                </div>
                {mode === 'simple' && detectedType && <div className="flex justify-between text-xs">
                    <span className="text-white/40">Network</span>
                    <span className="font-bold">{getTypeName(detectedType)}</span>
                  </div>}
                {mode === 'advanced' && <div className="flex justify-between text-xs">
                    <span className="text-white/40">Network</span>
                    <span className="font-bold capitalize">{selectedNetwork}</span>
                  </div>}
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Status</span>
                  <span className="text-green-500 font-bold">Success</span>
                </div>
              </div>
              <button onClick={resetFlow} className="w-full py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-white/90 transition-colors">
                DONE
              </button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      {/* Background visual flair */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>;
};