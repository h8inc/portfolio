import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ArrowDownLeft, Plus, RefreshCw, QrCode, Copy, Check, Bitcoin, Zap, AlertCircle, CreditCard, Building2, Smartphone, Camera } from 'lucide-react';
import { BlockstreamSendFlow } from './BlockstreamSendFlow';

type TransactionType = 'send' | 'receive' | 'buy' | 'sell';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: TransactionType;
  /**
   * When true, render inside a constrained container (e.g. phone frame)
   * instead of using viewport-wide fixed positioning.
   */
  embedded?: boolean;
  /**
   * Hide dim/blur backdrop layer.
   */
  hideBackdrop?: boolean;
}
const NetworkBadge = ({
  network
}: {
  network: 'onchain' | 'lightning';
}) => {
  return <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold ${network === 'lightning' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-blue-500/10 text-blue-400'}`}>
      {network === 'lightning' ? <Zap className="w-3 h-3" /> : <Bitcoin className="w-3 h-3" />}
      <span>{network === 'lightning' ? 'Lightning' : 'On-chain'}</span>
    </div>;
};
const SendContent = () => {
  const [network, setNetwork] = useState<'onchain' | 'lightning'>('lightning');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [feeEstimate, setFeeEstimate] = useState<'low' | 'medium' | 'high'>('medium');
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [showFullSendFlow, setShowFullSendFlow] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment'
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };
  React.useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  const feeOptions = {
    low: {
      time: '~60 min',
      sat: '5 sat/vB',
      usd: '$0.50'
    },
    medium: {
      time: '~30 min',
      sat: '10 sat/vB',
      usd: '$1.00'
    },
    high: {
      time: '~10 min',
      sat: '20 sat/vB',
      usd: '$2.00'
    }
  };
  return <div className="space-y-4">
      {/* Network Toggle */}
      <div className="flex gap-2">
        <button onClick={() => setNetwork('lightning')} className={`flex-1 py-3 rounded-lg border transition-all ${network === 'lightning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-[#0d0d0d] border-white/10 text-white/60'}`}>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-semibold font-mono">Lightning</span>
          </div>
          <span className="text-[9px] text-white/40 font-mono">Fast & Cheap</span>
        </button>
        <button onClick={() => setNetwork('onchain')} className={`flex-1 py-3 rounded-lg border transition-all ${network === 'onchain' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#0d0d0d] border-white/10 text-white/60'}`}>
          <div className="flex items-center justify-center gap-2">
            <Bitcoin className="w-4 h-4" />
            <span className="text-xs font-semibold font-mono">On-chain</span>
          </div>
          <span className="text-[9px] text-white/40 font-mono">Secure & Final</span>
        </button>
      </div>

      {/* Address Input */}
      <div>
        <label className="text-xs text-white/60 font-mono mb-2 block">Recipient Address</label>
        <div className="relative">
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder={network === 'lightning' ? 'lnbc...' : 'bc1q...'} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00d4ff]/50 focus:outline-none font-mono" />
          <button onClick={startCamera} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#00d4ff] transition-colors">
            <QrCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Camera View */}
      <AnimatePresence>
        {showCamera && <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} className="fixed inset-0 bg-black z-[100] flex flex-col">
            {/* Camera Header */}
            <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
              <h3 className="text-white font-semibold font-mono text-sm">Scan QR Code</h3>
              <button onClick={stopCamera} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Camera Feed */}
            <div className="flex-1 relative">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              
              {/* Scanning Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#00d4ff]" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#00d4ff]" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#00d4ff]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#00d4ff]" />
                  
                  {/* Scanning line animation */}
                  <motion.div className="absolute left-0 right-0 h-0.5 bg-[#00d4ff] shadow-lg shadow-[#00d4ff]/50" animate={{
                top: ['0%', '100%']
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }} />
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                <div className="text-center">
                  <Camera className="w-8 h-8 text-white/60 mx-auto mb-2" />
                  <p className="text-sm text-white font-mono mb-1">Position QR code within frame</p>
                  <p className="text-xs text-white/60 font-mono">Camera will automatically scan</p>
                </div>
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Amount Input */}
      <div>
        <label className="text-xs text-white/60 font-mono mb-2 block">Amount</label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00d4ff]/50 focus:outline-none font-mono" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 font-mono">BTC</span>
          </div>
          <button className="px-4 bg-[#0d0d0d] border border-white/10 rounded-lg text-xs text-white/60 hover:text-white hover:border-white/20 transition-all font-mono">
            MAX
          </button>
        </div>
        <p className="text-[10px] text-white/40 mt-1 font-mono">≈ $0.00 USD</p>
      </div>

      {/* Fee Estimation (Only for on-chain) */}
      {network === 'onchain' && <div>
          <label className="text-xs text-white/60 font-mono mb-2 block">Transaction Speed</label>
          <div className="space-y-2">
            {(['low', 'medium', 'high'] as const).map(fee => <button key={fee} onClick={() => setFeeEstimate(fee)} className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${feeEstimate === fee ? 'bg-[#00d4ff]/10 border-[#00d4ff]/30' : 'bg-[#0d0d0d] border-white/10 hover:border-white/20'}`}>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white capitalize font-mono">{fee}</div>
                  <div className="text-[10px] text-white/40 font-mono">{feeOptions[fee].time}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white font-mono">{feeOptions[fee].sat}</div>
                  <div className="text-[10px] text-white/40 font-mono">{feeOptions[fee].usd}</div>
                </div>
              </button>)}
          </div>
        </div>}

      {/* Info Banner */}
      <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] text-blue-400 font-mono leading-relaxed">
            {network === 'lightning' ? 'Lightning transactions are instant and have minimal fees, perfect for small payments.' : 'On-chain transactions provide maximum security and are settled on the Bitcoin blockchain.'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <motion.button whileTap={{
        scale: 0.98
      }} onClick={() => setShowFullSendFlow(true)} className="flex-1 bg-gradient-to-r from-[#00d4ff] to-[#0099ff] text-[#0d0d0d] font-bold py-3.5 rounded-lg text-sm hover:from-[#33ddff] hover:to-[#00aaff] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00d4ff]/20 font-mono disabled:opacity-50 disabled:cursor-not-allowed" disabled={!address || !amount}>
          <ArrowUpRight className="w-5 h-5" />
          Review & Send
        </motion.button>
      </div>

      {/* Full Send Flow Modal */}
      <AnimatePresence>
        {showFullSendFlow && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
            <button onClick={() => setShowFullSendFlow(false)} className="absolute top-4 right-4 z-[201] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
            <BlockstreamSendFlow />
          </motion.div>}
      </AnimatePresence>
    </div>;
};
const ReceiveContent = () => {
  const [network, setNetwork] = useState<'onchain' | 'lightning'>('onchain');
  const [copied, setCopied] = useState(false);
  const address = network === 'lightning' ? 'lnbc10u1p3xnhl2pp5j...' : 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return <div className="space-y-4">
      {/* Network Toggle */}
      <div className="flex gap-2">
        <button onClick={() => setNetwork('onchain')} className={`flex-1 py-3 rounded-lg border transition-all ${network === 'onchain' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#0d0d0d] border-white/10 text-white/60'}`}>
          <div className="flex items-center justify-center gap-2">
            <Bitcoin className="w-4 h-4" />
            <span className="text-xs font-semibold font-mono">On-chain</span>
          </div>
        </button>
        <button onClick={() => setNetwork('lightning')} className={`flex-1 py-3 rounded-lg border transition-all ${network === 'lightning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 'bg-[#0d0d0d] border-white/10 text-white/60'}`}>
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-semibold font-mono">Lightning</span>
          </div>
        </button>
      </div>

      {/* QR Code Display */}
      <div className="flex justify-center py-6">
        <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
          {/* Placeholder for QR code - in production, use a QR code library */}
          <div className="text-center">
            <QrCode className="w-16 h-16 text-[#0d0d0d] mx-auto mb-2" />
            <p className="text-xs text-[#0d0d0d] font-mono">QR Code</p>
          </div>
        </div>
      </div>

      {/* Address Display */}
      <div>
        <label className="text-xs text-white/60 font-mono mb-2 block">Your {network === 'lightning' ? 'Lightning Invoice' : 'Bitcoin Address'}</label>
        <div className="flex gap-2">
          <div className="flex-1 bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-3">
            <p className="text-xs text-white font-mono break-all">{address}</p>
          </div>
          <button onClick={handleCopy} className="px-4 bg-[#0d0d0d] border border-white/10 rounded-lg hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
          </button>
        </div>
      </div>

      {/* Verify on Jade */}
      <motion.button whileTap={{
      scale: 0.98
    }} className="w-full bg-[#0d0d0d] border border-white/10 text-white/80 font-semibold py-3 rounded-lg text-sm hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2 font-mono">
        <QrCode className="w-4 h-4" />
        Verify on Jade Hardware
      </motion.button>

      {/* Info Banner */}
      <div className="flex items-start gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
        <AlertCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] text-green-400 font-mono leading-relaxed">
            {network === 'lightning' ? 'Lightning invoices are for instant, low-fee payments. They expire after a set time.' : 'This address can be reused multiple times. All incoming funds go directly to your self-custody wallet.'}
          </p>
        </div>
      </div>
    </div>;
};
const BuyContent = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'USD' | 'BTC'>('USD');
  const exchanges = [{
    name: 'MoonPay',
    methods: ['Apple Pay', 'Google Pay', 'Card'],
    fee: '3.5%',
    rating: 4.8
  }, {
    name: 'Simplex',
    methods: ['Card', 'Wire'],
    fee: '3.8%',
    rating: 4.6
  }, {
    name: 'Transak',
    methods: ['Card', 'Bank Transfer'],
    fee: '4.0%',
    rating: 4.7
  }] as any[];
  return <div className="space-y-4">
      {/* Amount Input */}
      <div>
        <label className="text-xs text-white/60 font-mono mb-2 block">Amount to Buy</label>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg px-3 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00d4ff]/50 focus:outline-none font-mono" />
            <button onClick={() => setCurrency(currency === 'USD' ? 'BTC' : 'USD')} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white font-mono transition-colors">
              {currency}
            </button>
          </div>
        </div>
        <p className="text-[10px] text-white/40 mt-1 font-mono">
          {currency === 'USD' ? '≈ 0.00143 BTC' : '≈ $100.00 USD'}
        </p>
      </div>

      {/* Exchange Options */}
      <div>
        <label className="text-xs text-white/60 font-mono mb-2 block">Select Provider</label>
        <div className="space-y-2">
          {exchanges.map(exchange => <motion.button key={exchange.name} whileTap={{
          scale: 0.98
        }} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg p-3 hover:border-white/20 transition-all text-left">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white/60" />
                  </div>
                  <span className="text-sm font-semibold text-white font-mono">{exchange.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold text-white font-mono">{exchange.fee}</div>
                  <div className="text-[9px] text-white/40 font-mono">fee</div>
                </div>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                {exchange.methods.map(method => <span key={method} className="text-[9px] px-1.5 py-0.5 bg-white/5 rounded text-white/60 font-mono">
                    {method}
                  </span>)}
              </div>
            </motion.button>)}
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] text-blue-400 font-mono leading-relaxed">
            Bitcoin is purchased directly from the provider and sent to your wallet. You maintain full custody at all times.
          </p>
        </div>
      </div>

      {/* Action Button */}
      <motion.button whileTap={{
      scale: 0.98
    }} className="w-full bg-gradient-to-r from-[#00d4ff] to-[#0099ff] text-[#0d0d0d] font-bold py-3.5 rounded-lg text-sm hover:from-[#33ddff] hover:to-[#00aaff] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00d4ff]/20 font-mono disabled:opacity-50 disabled:cursor-not-allowed" disabled={!amount}>
        <CreditCard className="w-5 h-5" />
        Continue to Provider
      </motion.button>
    </div>;
};
const SellContent = () => {
  return <div className="space-y-4">
      {/* Swap Option */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-2 font-mono">Swap to Liquid Assets</h3>
        <p className="text-xs text-white/60 mb-3 font-mono">Convert BTC to tradeable assets on the Liquid Network</p>
        
        <div className="space-y-2">
          <motion.button whileTap={{
          scale: 0.98
        }} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white font-mono">SideSwap</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-mono">Integrated</span>
            </div>
            <p className="text-xs text-white/60 font-mono">Swap BTC ↔ LBTC, USDT, and other Liquid assets</p>
          </motion.button>

          <motion.button whileTap={{
          scale: 0.98
        }} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <RefreshCw className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-white font-mono">Liquid Swap</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full font-mono">Available</span>
            </div>
            <p className="text-xs text-white/60 font-mono">Peer-to-peer swaps with atomic guarantees</p>
          </motion.button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#1a1a1a] px-2 text-white/40 font-mono">OR</span>
        </div>
      </div>

      {/* P2P Option */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-2 font-mono">Peer-to-Peer Marketplaces</h3>
        <p className="text-xs text-white/60 mb-3 font-mono">Sell BTC directly to buyers for fiat currency</p>
        
        <div className="space-y-2">
          <motion.button whileTap={{
          scale: 0.98
        }} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white/60" />
                </div>
                <span className="text-sm font-semibold text-white font-mono">Hodl Hodl</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full font-mono">P2P</span>
            </div>
            <p className="text-xs text-white/60 font-mono">Non-custodial P2P trading platform</p>
          </motion.button>

          <motion.button whileTap={{
          scale: 0.98
        }} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white/60" />
                </div>
                <span className="text-sm font-semibold text-white font-mono">Bisq</span>
              </div>
              <span className="text-[9px] px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full font-mono">Decentralized</span>
            </div>
            <p className="text-xs text-white/60 font-mono">Decentralized exchange with full privacy</p>
          </motion.button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] text-yellow-400 font-mono leading-relaxed">
            Use app-generated addresses when selling on P2P platforms. Always verify the buyer's reputation and follow platform guidelines.
          </p>
        </div>
      </div>
    </div>;
};

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  type,
  embedded = false,
  hideBackdrop = false
}) => {
  const getTitle = () => {
    switch (type) {
      case 'send':
        return 'Send Bitcoin';
      case 'receive':
        return 'Receive Bitcoin';
      case 'buy':
        return 'Buy Bitcoin';
      case 'sell':
        return 'Sell Bitcoin';
    }
  };
  const getIcon = () => {
    switch (type) {
      case 'send':
        return ArrowUpRight;
      case 'receive':
        return ArrowDownLeft;
      case 'buy':
        return Plus;
      case 'sell':
        return RefreshCw;
    }
  };
  const getContent = () => {
    switch (type) {
      case 'send':
        return <SendContent />;
      case 'receive':
        return <ReceiveContent />;
      case 'buy':
        return <BuyContent />;
      case 'sell':
        return <SellContent />;
    }
  };
  const Icon = getIcon();
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

          {/* Bottom Sheet */}
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
      }} className={`${embedded ? 'absolute' : 'fixed'} bottom-0 left-0 right-0 top-16 bg-[#1a1a1a] rounded-t-3xl border-t border-white/10 z-50 flex flex-col`}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Content */}
            <div className="px-6 pb-8 pt-2 overflow-y-auto flex-1">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Icon className="w-6 h-6 text-[#00d4ff]" />
                  <h2 className="text-xl font-bold font-mono">{getTitle()}</h2>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/70" />
                </button>
              </div>

              {getContent()}
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
};