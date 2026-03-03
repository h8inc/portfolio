import React, { useState } from 'react';
import { Shield, Lock, HardDrive, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface JadeUpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when user taps "Buy Jade Wallet" (e.g. open store, close modal). */
  onBuy?: () => void;
  /**
   * When true, the modal is rendered inside a constrained container
   * (e.g. inside a phone frame) instead of full viewport.
   */
  embedded?: boolean;
  /**
   * Hide dim/blur backdrop layer.
   */
  hideBackdrop?: boolean;
}

export const JadeUpsellModal = ({
  isOpen,
  onClose,
  onBuy,
  embedded = false,
  hideBackdrop = false
}: JadeUpsellModalProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Jade wallet images
  const jadeImages = ['https://store.blockstream.com/cdn/shop/files/4_4.jpg?v=1770998693&width=990', 'https://store.blockstream.com/cdn/shop/files/2_3.jpg?v=1770998693&width=990', 'https://store.blockstream.com/cdn/shop/files/1_3.jpg?v=1770998693&width=990'];
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          {!hideBackdrop && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className={`${embedded ? 'absolute' : 'fixed'} inset-0 bg-black/60 backdrop-blur-sm z-40`} />}

          {/* Full Page Modal */}
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
      }} className={`${embedded ? 'absolute' : 'fixed'} inset-0 bg-[#1a1a1a] z-50 flex flex-col`}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2 border-b border-white/10">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Content - No scroll, fills screen */}
            <div className="flex-1 flex flex-col px-6 pb-6 pt-4 overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#00d4ff] to-[#0099ff] rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold font-mono">Blockstream Jade Plus</h2>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {/* Horizontal Scrollable Image Gallery */}
              <div className="relative mb-4">
                <div className="overflow-x-auto scrollbar-hide -mx-6 px-6">
                  <div className="flex gap-3 pb-2">
                    {jadeImages.map((image, index) => <div key={index} className={`flex-shrink-0 w-[280px] h-48 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === index ? 'border-[#00d4ff] shadow-lg shadow-[#00d4ff]/20' : 'border-white/10'}`} onClick={() => setSelectedImage(index)}>
                        <img src={image} alt={`Blockstream Jade Plus ${index + 1}`} className="w-full h-full object-cover bg-gradient-to-br from-[#00d4ff]/20 to-[#0099ff]/20" />
                      </div>)}
                  </div>
                </div>

                {/* Image Indicators */}
                <div className="flex justify-center gap-2 mt-3">
                  {jadeImages.map((_, index) => <button key={index} onClick={() => setSelectedImage(index)} className={`w-2 h-2 rounded-full transition-all ${selectedImage === index ? 'bg-[#00d4ff] w-6' : 'bg-white/20'}`} />)}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-bold text-white mb-2 font-mono">Hardware Wallet</h3>
                <p className="text-sm text-white/60 font-mono leading-relaxed">
                  Blockstream Jade Plus is a fully open-source hardware wallet that keeps your Bitcoin
                  completely offline and secure from hackers.
                </p>
              </div>

              {/* Features - Compact */}
              <div className="space-y-2.5 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-mono">Air-gapped signing</h4>
                    <p className="text-xs text-white/50 font-mono">
                      Complete offline protection from remote attacks
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-mono">Multisig support</h4>
                    <p className="text-xs text-white/50 font-mono">
                      Maximum security with multiple signatures
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#00d4ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HardDrive className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-mono">Premium Metal Design</h4>
                    <p className="text-xs text-white/50 font-mono">
                      Elegant construction with vibrant display
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-[#0d0d0d] border border-white/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60 font-mono">Regular price</span>
                  <span className="text-2xl font-bold text-white font-mono">€127,95</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-mono">
                    In Stock
                  </span>
                  <span className="text-[9px] px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full font-mono">
                    Free International Shipping
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-2 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (onBuy ? onBuy() : onClose())}
                  className="w-full bg-gradient-to-r from-[#00d4ff] to-[#0099ff] text-[#0d0d0d] font-bold py-4 rounded-lg text-sm hover:from-[#33ddff] hover:to-[#00aaff] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00d4ff]/20"
                >
                  <HardDrive className="w-5 h-5" />
                  Buy Jade Wallet
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button whileTap={{
              scale: 0.98
            }} onClick={onClose} className="w-full bg-white/5 text-white/70 font-semibold py-3 rounded-lg text-sm hover:bg-white/10 transition-all font-mono">
                  Maybe Later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};