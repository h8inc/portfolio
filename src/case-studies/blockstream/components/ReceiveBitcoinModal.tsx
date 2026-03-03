import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowDownLeft, Copy, Check, Share2, Search, Info, ChevronLeft, AlertCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

// Types
type SpecificAsset = {
  id: string;
  name: string;
  ticker: string;
  icon: string;
  description: string;
  color: string;
};

// Mock Data - Specific Assets (stablecoins, fiat-pegged)
const SPECIFIC_ASSETS: SpecificAsset[] = [{
  id: 'tether',
  name: 'Tether USD',
  ticker: 'USDt',
  icon: '💵',
  description: 'Stablecoin on Liquid',
  color: 'emerald'
}, {
  id: 'liquid-cad',
  name: 'Liquid CAD',
  ticker: 'LCAD',
  icon: '🍁',
  description: 'Canadian Dollar on Liquid',
  color: 'red'
}, {
  id: 'pegx-eur',
  name: 'PEGx EUR',
  ticker: 'EUR',
  icon: '🇪🇺',
  description: 'Euro on Liquid',
  color: 'blue'
}, {
  id: 'jade-token',
  name: 'Blockstream Jade Token',
  ticker: 'JADE',
  icon: '💎',
  description: 'Blockstream ecosystem token',
  color: 'cyan'
}, {
  id: 'any-liquid',
  name: 'Any Liquid Asset',
  ticker: 'ANY',
  icon: '🌍',
  description: 'Universal Liquid address',
  color: 'purple'
}];
const QR_PATTERN_SEED = [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0];

// Unified QR Code (Bitcoin + Lightning + Liquid Bitcoin)
const UnifiedQRCode = () => {
  return <motion.div initial={{
    scale: 0.95,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} transition={{
    type: 'spring',
    stiffness: 400,
    damping: 30
  }} className="relative">
      {/* Subtle glow */}
      <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20 bg-gradient-to-br from-cyan-400 via-blue-400 to-yellow-400" />

      <div className="relative w-64 h-64 bg-white rounded-3xl flex items-center justify-center shadow-2xl border border-black/5">
        {/* Corner accents - multi-color */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-3xl border-cyan-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-3xl border-yellow-400" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-3xl border-orange-400" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-3xl border-blue-400" />

        <div className="text-center">
          <div className="grid grid-cols-7 gap-[3px] mx-auto w-36 h-36 mb-2">
            {QR_PATTERN_SEED.map((filled, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isCorner = row < 3 && col < 3 || row < 3 && col > 3 || row > 3 && col < 3;
            const isFilled = isCorner || filled === 1;
            return <motion.div key={i} initial={{
              opacity: 0,
              scale: 0
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: i * 0.006,
              duration: 0.15
            }} className={cn('rounded-[2px]', isFilled ? 'bg-[#0d0d0d]' : 'bg-transparent')} />;
          })}
          </div>
          <p className="text-[10px] text-gray-400 font-mono font-semibold">Unified Payment</p>
        </div>
      </div>
    </motion.div>;
};

// Specific Asset QR Code
const SpecificAssetQRCode = ({
  asset
}: {
  asset: SpecificAsset;
}) => {
  const getColorClasses = () => {
    const colors = {
      emerald: {
        glow: 'bg-emerald-400',
        border: 'border-emerald-400'
      },
      red: {
        glow: 'bg-red-400',
        border: 'border-red-400'
      },
      blue: {
        glow: 'bg-blue-400',
        border: 'border-blue-400'
      },
      cyan: {
        glow: 'bg-cyan-400',
        border: 'border-cyan-400'
      },
      purple: {
        glow: 'bg-purple-400',
        border: 'border-purple-400'
      }
    };
    return colors[asset.color as keyof typeof colors] || colors.cyan;
  };
  const colorClasses = getColorClasses();
  return <motion.div key={asset.id} initial={{
    scale: 0.95,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} exit={{
    scale: 0.95,
    opacity: 0
  }} transition={{
    type: 'spring',
    stiffness: 400,
    damping: 30
  }} className="relative">
      <div className={cn('absolute inset-0 rounded-3xl blur-2xl opacity-20', colorClasses.glow)} />

      <div className="relative w-64 h-64 bg-white rounded-3xl flex items-center justify-center shadow-2xl border border-black/5">
        <div className={cn('absolute top-0 left-0 w-8 h-8 border-t-[3px] border-l-[3px] rounded-tl-3xl', colorClasses.border)} />
        <div className={cn('absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] rounded-tr-3xl', colorClasses.border)} />
        <div className={cn('absolute bottom-0 left-0 w-8 h-8 border-b-[3px] border-l-[3px] rounded-bl-3xl', colorClasses.border)} />
        <div className={cn('absolute bottom-0 right-0 w-8 h-8 border-b-[3px] border-r-[3px] rounded-br-3xl', colorClasses.border)} />

        <div className="text-center">
          <div className="grid grid-cols-7 gap-[3px] mx-auto w-36 h-36 mb-2">
            {QR_PATTERN_SEED.map((filled, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isCorner = row < 3 && col < 3 || row < 3 && col > 3 || row > 3 && col < 3;
            const isFilled = isCorner || filled === 1;
            return <motion.div key={i} initial={{
              opacity: 0,
              scale: 0
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: i * 0.006,
              duration: 0.15
            }} className={cn('rounded-[2px]', isFilled ? 'bg-[#0d0d0d]' : 'bg-transparent')} />;
          })}
          </div>
          <p className="text-[10px] text-gray-400 font-mono font-semibold">{asset.ticker}</p>
        </div>
      </div>
    </motion.div>;
};

// Info Bottom Sheet
const InfoBottomSheet = ({
  onClose
}: {
  onClose: () => void;
}) => {
  return <>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      <motion.div initial={{
      y: '100%'
    }} animate={{
      y: 0
    }} exit={{
      y: '100%'
    }} transition={{
      type: 'spring',
      damping: 30,
      stiffness: 300
    }} className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl shadow-2xl z-50 max-h-[70vh] flex flex-col border-t border-white/10">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/20 rounded-full" />
        </div>

        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-lg font-bold text-white font-mono">How it works</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⚡</span>
              <span className="text-base">₿</span>
              <span className="text-base">💧</span>
              <p className="text-sm font-semibold text-cyan-400 ml-1 font-mono">
                Works with Bitcoin, Lightning & Liquid
              </p>
            </div>
            <p className="text-sm text-white/60 font-mono leading-relaxed">
              This unified address works with all three networks. The sender's wallet will automatically choose the best method.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white font-mono">Works instantly</p>
                <p className="text-xs text-white/50 font-mono">Payments arrive in seconds via Lightning</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white font-mono">No setup needed</p>
                <p className="text-xs text-white/50 font-mono">Just share this address</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white font-mono">Auto-routing</p>
                <p className="text-xs text-white/50 font-mono">Sender's wallet picks the best network</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/10">
          <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/15 text-white font-semibold py-3.5 rounded-xl transition-all font-mono">
            Got it
          </button>
        </div>
      </motion.div>
    </>;
};

// Asset Picker Bottom Sheet
const AssetPickerBottomSheet = ({
  onSelect,
  onClose
}: {
  onSelect: (asset: SpecificAsset) => void;
  onClose: () => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredAssets = SPECIFIC_ASSETS.filter(asset => asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || asset.ticker.toLowerCase().includes(searchTerm.toLowerCase()));
  return <>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      <motion.div initial={{
      y: '100%'
    }} animate={{
      y: 0
    }} exit={{
      y: '100%'
    }} transition={{
      type: 'spring',
      damping: 30,
      stiffness: 300
    }} className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl shadow-2xl z-50 flex flex-col border-t border-white/10 max-h-[70%]">
        <button type="button" onClick={onClose} className="w-full cursor-pointer text-left flex flex-col shrink-0 hover:bg-white/5 active:bg-white/10 transition-colors rounded-t-3xl">
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
          </div>
          <div className="px-5 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white font-mono">Receive other assets</h2>
          </div>
        </button>

        <div className="px-5 py-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input type="text" placeholder="Search assets..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-500/50 focus:outline-none transition-all font-mono" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 scrollbar-hide">
          <div className="space-y-2 pb-6">
            {filteredAssets.map(asset => <motion.button key={asset.id} whileTap={{
            scale: 0.98
          }} onClick={() => {
            onSelect(asset);
            onClose();
          }} className="w-full p-4 rounded-xl border bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-left flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0 border border-white/10">
                  {asset.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-0.5 font-mono">{asset.name}</p>
                  <p className="text-xs text-white/50 font-mono">{asset.description}</p>
                </div>
              </motion.button>)}
          </div>
        </div>
      </motion.div>
    </>;
};

// Main Component
export const ReceiveBitcoinModal = ({
  onClose
}: {
  onClose?: () => void;
}) => {
  const [selectedAsset, setSelectedAsset] = useState<SpecificAsset | null>(null);
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addressType, setAddressType] = useState<'single' | 'reusable'>('single');
  const isUnified = !selectedAsset;

  // Mock addresses
  const UNIFIED_ADDRESS = 'bitcoin:bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh?lightning=lnbc10u1p3xnhl2pp5...';
  const SPECIFIC_ADDRESS = 'VJLHfYMaHrkYESGqrCbxuQLKKqcKCvELMiP94xgZWSzqbEi2wibKFqxYPxVKuPU8K5QRZHMeqxB9kLeo';
  const currentAddress = isUnified ? UNIFIED_ADDRESS : SPECIFIC_ADDRESS;
  const handleCopy = () => {
    navigator.clipboard.writeText(currentAddress).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleSelectAsset = (asset: SpecificAsset) => {
    setSelectedAsset(asset);
  };
  const handleBackToUnified = () => {
    setSelectedAsset(null);
  };
  return <>
      <div className="w-full h-full bg-[#0f0f0f] text-white font-mono flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {!isUnified && <button onClick={handleBackToUnified} className="p-2 hover:bg-white/5 rounded-lg transition-colors -ml-2">
                <ChevronLeft className="w-5 h-5 text-white/60" />
              </button>}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-green-400" />
              </div>
              <h1 className="text-lg font-bold">Receive</h1>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-white/40" />
          </button>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="flex flex-col">
            {/* Asset Label (if specific asset selected) */}
            {!isUnified && <div className="px-5 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
                  <span className="text-base">{selectedAsset?.icon}</span>
                  <span className="text-sm font-semibold text-white/90">{selectedAsset?.name}</span>
                </div>
              </div>}

            {/* QR Code - Centered */}
            <div className="flex items-center justify-center py-6 px-5">
              <AnimatePresence mode="wait">
                {isUnified ? <UnifiedQRCode key="unified" /> : selectedAsset ? <SpecificAssetQRCode key={selectedAsset.id} asset={selectedAsset} /> : null}
              </AnimatePresence>
            </div>

            {/* Network Fee Info Badge (for unified only) */}
            {isUnified && <div className="px-5 pb-4 flex justify-center">
                <button onClick={() => setShowInfo(true)} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/15 transition-colors border border-green-500/20">
                  <AlertCircle className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-[11px] font-semibold text-green-400">On-chain fee expected</span>
                </button>
              </div>}

            {/* Address Type Toggle - Elegant */}
            <div className="px-5 pb-6">
              <div className="flex items-center justify-center gap-2 p-1 bg-white/5 rounded-full max-w-xs mx-auto border border-white/5">
                <button onClick={() => setAddressType('single')} className={cn('flex-1 px-5 py-2.5 rounded-full text-sm font-semibold transition-all', addressType === 'single' ? 'bg-[#1a1a1a] text-white shadow-md border border-white/10' : 'text-white/40 hover:text-white/60')}>
                  Single use
                </button>
                <button onClick={() => setAddressType('reusable')} className={cn('flex-1 px-5 py-2.5 rounded-full text-sm font-semibold transition-all', addressType === 'reusable' ? 'bg-[#1a1a1a] text-white shadow-md border border-white/10' : 'text-white/40 hover:text-white/60')}>
                  Reusable
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 pb-6 space-y-4">
              {/* Primary Action - Prominent */}
              {isUnified ? <motion.button whileTap={{
              scale: 0.98
            }} onClick={() => setShowAssetPicker(true)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/20">
                  <ArrowDownLeft className="w-5 h-5" />
                  Receive other assets
                </motion.button> : <motion.button whileTap={{
              scale: 0.98
            }} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-500/20">
                  <Share2 className="w-5 h-5" />
                  Share
                </motion.button>}

              {/* Secondary Actions - Smaller, Less Prominent */}
              <div className="flex items-center justify-center gap-6 pt-1">
                <button onClick={handleCopy} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all">
                  {copied ? <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">Copied</span>
                    </> : <>
                      <Copy className="w-4 h-4" />
                      <span className="font-medium">Copy</span>
                    </>}
                </button>

                {isUnified && <button className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-all">
                    <Share2 className="w-4 h-4" />
                    <span className="font-medium">Share</span>
                  </button>}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Subtle background blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      </div>

      {/* Bottom Sheets */}
      <AnimatePresence>
        {showAssetPicker && <AssetPickerBottomSheet onSelect={handleSelectAsset} onClose={() => setShowAssetPicker(false)} />}
        {showInfo && <InfoBottomSheet onClose={() => setShowInfo(false)} />}
      </AnimatePresence>
    </>;
};