import React, { useState } from 'react';
import { Shield, Wallet, History, Lock, Settings, ArrowRight, Info, TrendingUp, CircleCheck, Download, HardDrive, ChevronRight, X, QrCode, Plus, Key, Fingerprint, FileText, Zap, ChevronDown, Bitcoin, ArrowDownLeft, ArrowUpRight, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioChart } from './PortfolioChart';
import { TransactionModal } from './TransactionModal';
import { JadeUpsellModal } from './JadeUpsellModal';
import { BlockstreamSendFlow } from './BlockstreamSendFlow';
import { ReceiveBitcoinModal } from './ReceiveBitcoinModal';
const securityTasks = [{
  id: 'backup',
  icon: FileText,
  title: 'Backup seed phrase',
  description: 'Write down recovery phrase',
  points: 40,
  completed: false
}, {
  id: 'pin',
  icon: Lock,
  title: 'Set PIN code',
  description: 'Protect daily access',
  points: 30,
  completed: false
}, {
  id: 'biometric',
  icon: Fingerprint,
  title: 'Enable biometrics',
  description: 'Quick secure access',
  points: 30,
  completed: false
}] as any[];
const alternativeSetup = [{
  icon: Download,
  title: 'Import existing wallet',
  description: 'Restore using seed phrase'
}, {
  icon: HardDrive,
  title: 'Connect hardware wallet',
  description: 'Link to Jade or other device',
  badge: 'Max Security'
}] as any[];
const SecurityScoreDonut = ({
  score
}: {
  score: number;
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - score / 100 * circumference;
  let statusText = 'NEEDS WORK';
  let statusColor = 'text-orange-400';
  if (score >= 70) {
    statusText = 'SECURED';
    statusColor = 'text-[#00d4ff]';
  } else if (score >= 40) {
    statusText = 'PARTIAL';
    statusColor = 'text-amber-400';
  }
  return <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle cx="50" cy="50" r={radius} fill="none" stroke="rgb(38 38 38)" strokeWidth="10" />
        {/* Progress circle - Electric blue */}
        <motion.circle cx="50" cy="50" r={radius} fill="none" stroke="#00d4ff" strokeWidth="10" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} initial={{
        strokeDashoffset: circumference
      }} animate={{
        strokeDashoffset
      }} transition={{
        duration: 1.2,
        ease: 'easeOut'
      }} />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.3,
        type: 'spring'
      }} className="text-3xl font-bold text-white">
          {score}%
        </motion.div>
        <div className={`text-[10px] font-bold mt-0.5 ${statusColor}`}>
          {statusText}
        </div>
      </div>
    </div>;
};

// @component: JadeWalletSetup
export const JadeWalletSetup = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  const [showSecuritySheet, setShowSecuritySheet] = useState(false);
  const [showAlternativeSheet, setShowAlternativeSheet] = useState(false);
  const [showJadeUpsellModal, setShowJadeUpsellModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    alternative: false
  });
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [transactionModal, setTransactionModal] = useState<'send' | 'receive' | 'buy' | 'sell' | null>(null);
  const [showSendFlow, setShowSendFlow] = useState(false);
  const [showReceiveFlow, setShowReceiveFlow] = useState(false);

  // Jade wallet images
  const jadeImages = ['https://store.blockstream.com/cdn/shop/files/4_4.jpg?v=1770998693&width=990', 'https://store.blockstream.com/cdn/shop/files/2_3.jpg?v=1770998693&width=990', 'https://store.blockstream.com/cdn/shop/files/1_3.jpg?v=1770998693&width=990'];
  const securityScore = completedTasks.length === 0 ? 0 : completedTasks.reduce((sum, id) => {
    const task = securityTasks.find(t => t.id === id);
    return sum + (task?.points || 0);
  }, 0);
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]);
  };

  // @return
  return <div className="flex flex-col h-full bg-[#0d0d0d] text-white overflow-hidden font-mono">
      {/* Header */}
      <header className="px-4 pt-3 pb-2 flex justify-between items-start border-b border-white/10">
        <div>
          <h1 className="text-lg font-bold tracking-tight">Software Wallet</h1>
          <p className="text-[10px] text-white/50 mt-0.5 font-mono">Setup Required</p>
        </div>
        <button className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
          <Settings className="w-3.5 h-3.5 text-white/70" />
        </button>
      </header>

      {/* Main Content Area - No scroll, compact */}
      <main className="flex-1 overflow-hidden px-4 pb-16 space-y-2.5 pt-2.5">
        {/* Promotional Banner - Collapsible */}
        <AnimatePresence>
          {showPromoBanner && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} exit={{
          opacity: 0,
          height: 0
        }} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-2 relative" style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "16px",
          paddingBottom: "16px"
        }}>
              <button onClick={() => setShowPromoBanner(false)} className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors">
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-start gap-2 pr-6">
                <div className="w-6 h-6 rounded-lg bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-3 h-3 text-[#00d4ff]" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-white/80 font-medium leading-tight font-mono">Get the hardware wallet for maximum security</p>
                  <button onClick={() => setShowJadeUpsellModal(true)} className="text-[10px] font-semibold text-[#00d4ff] hover:text-[#33ddff] transition-colors flex items-center gap-1 mt-0.5 font-mono">
                    Learn More <ArrowRight className="w-2 h-2" />
                  </button>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Balance Review - Subtle */}
        <div className="bg-[#1a1a1a]/50 border border-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider mb-1">Total Balance</p>
              <p className="text-2xl font-bold text-white font-mono">$0.00</p>
              <p className="text-[10px] text-white/30 font-mono mt-0.5">0.00000000 BTC</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 font-mono mb-1">No transaction history yet</p>
            </div>
          </div>
        </div>

        {/* Bitcoin Price Card */}
        <div className="bg-[#1a1a1a] rounded-lg border border-white/10 overflow-hidden p-4">
          <div className="flex justify-between items-start mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#f7931a] rounded-lg flex items-center justify-center">
                <Bitcoin className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-white/90 font-mono">Bitcoin</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-red-500/10">
              <span className="text-[10px] font-semibold text-red-400 font-mono">Live</span>
              <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
            </div>
          </div>

          <div className="mb-2">
            <h2 className="text-xl font-bold text-white font-mono">
              ${hoveredPrice !== null ? hoveredPrice.toLocaleString('en-US', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }) : '69,514'}
            </h2>
            <div className="flex items-center gap-1 text-[#00c781] text-[10px] font-semibold font-mono">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+2.28% (24h)</span>
            </div>
          </div>
          
          {/* Interactive Chart - Fixed container with proper height */}
          <div className="h-40 w-full -mx-4 -mb-4">
            <PortfolioChart variant="mobile" selectedPeriod="1W" onHoverValue={value => setHoveredPrice(value)} />
          </div>
        </div>

        {/* HERO ACTION: Receive Bitcoin with Electric Blue Gradient */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 px-0.5" style={{
          display: "none"
        }}>
            <Zap className="w-3.5 h-3.5 text-[#00d4ff]" />
            <h3 className="text-xs font-semibold text-white font-mono">Get Started</h3>
          </div>

          <div className="flex gap-2 w-full">
            <motion.button whileTap={{
            scale: 0.97
          }} onClick={() => setTransactionModal('buy')} className="flex-1 bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-white font-bold py-3.5 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all font-mono text-sm">
              <Plus className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-xs">Buy</span>
            </motion.button>

            <motion.button whileTap={{
            scale: 0.97
          }} onClick={() => setShowReceiveFlow(true)} className="flex-1 bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-white font-bold py-3.5 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all font-mono text-sm">
              <ArrowDownLeft className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-xs">Receive</span>
            </motion.button>

            <motion.button whileTap={{
            scale: 0.97
          }} onClick={() => setShowSendFlow(true)} className="flex-1 bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-white font-bold py-3.5 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all font-mono text-sm">
              <ArrowUpRight className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-xs">Send</span>
            </motion.button>

            <motion.button whileTap={{
            scale: 0.97
          }} onClick={() => setTransactionModal('sell')} className="flex-1 bg-[#1a1a1a] border border-white/10 hover:border-white/20 text-white font-bold py-3.5 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all font-mono text-sm">
              <RefreshCw className="w-5 h-5 text-[#00d4ff]" />
              <span className="text-xs">Sell</span>
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-1.5" style={{
          display: "none"
        }}>
            <Info className="w-2.5 h-2.5 text-white/40" />
            <span className="text-[10px] text-white/50 font-mono">
              Temporary wallet • Secure after receiving funds
            </span>
          </div>
        </div>

        {/* Security Score - Visual & Interactive */}
        <button onClick={() => setShowSecuritySheet(true)} className="w-full bg-[#1a1a1a] rounded-lg border border-white/10 p-3 hover:border-white/20 transition-all" style={{
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingBottom: "16px",
        paddingTop: "16px"
      }}>
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#00d4ff]" />
              <div className="text-left">
                <h3 className="text-xs font-semibold text-white font-mono">Security Score</h3>
                <p className="text-[10px] text-white/50 font-mono">Tap to level up</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>

          <div className="flex items-center gap-4">
            <div className="scale-75 -my-3">
              <SecurityScoreDonut score={securityScore} />
            </div>
            
            <div className="flex-1 space-y-1.5">
              {securityTasks.map(task => {
              const isCompleted = completedTasks.includes(task.id);
              return <div key={task.id} className={`flex items-center justify-between text-[10px] ${isCompleted ? 'text-white/60 line-through' : 'text-white/80'}`}>
                    <span className="font-mono">{task.title}</span>
                    <span className={`font-bold ${isCompleted ? 'text-[#00d4ff]' : 'text-white/50'}`}>
                      +{task.points}
                    </span>
                  </div>;
            })}
            </div>
          </div>
        </button>

        {/* Alternative Setup Options - Collapsible */}
        <button onClick={() => setShowAlternativeSheet(true)} className="bg-[#1a1a1a] rounded-lg border border-white/10 p-3 hover:border-white/20 transition-all" style={{
        width: "100%",
        maxWidth: "100%"
      }}>
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-white/60" />
              <h3 className="text-xs font-semibold text-white font-mono">Other Options</h3>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-[#0d0d0d] border-t border-white/10 px-4 py-2 flex justify-between items-center" style={{
      paddingTop: "16px",
      paddingBottom: "24px",
      paddingLeft: "16px"
    }}>
        {[{
        id: 'home',
        icon: Wallet,
        label: 'Home'
      }, {
        id: 'history',
        icon: History,
        label: 'History'
      }, {
        id: 'security',
        icon: Shield,
        label: 'Security'
      }, {
        id: 'settings',
        icon: Lock,
        label: 'Settings'
      }].map(item => <button key={item.id} onClick={() => setActiveTab(item.id)} className="flex flex-col items-center gap-1 group relative">
            <div className="relative">
              <item.icon className={`w-5 h-5 transition-colors ${activeTab === item.id ? 'text-[#00d4ff]' : 'text-white/40 group-hover:text-white/60'}`} />
              {item.id === 'security' && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#0d0d0d]" />}
            </div>
            <span className={`text-xs font-medium font-mono ${activeTab === item.id ? 'text-[#00d4ff]' : 'text-white/40 group-hover:text-white/60'}`}>
              {item.label}
            </span>
            {activeTab === item.id && <motion.div layoutId="nav-indicator" className="w-1 h-1 rounded-full bg-[#00d4ff] absolute -bottom-1" />}
          </button>)}
      </nav>

      {/* Security Sheet - Bottom Sheet Modal */}
      <AnimatePresence>
        {showSecuritySheet && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowSecuritySheet(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

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
        }} className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl border-t border-white/10 z-50">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Content */}
              <div className="px-6 pb-8 pt-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-[#00d4ff]" />
                    <h2 className="text-xl font-bold font-mono">Security Score</h2>
                  </div>
                  <button onClick={() => setShowSecuritySheet(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-white/70" />
                  </button>
                </div>

                <div className="flex justify-center mb-6">
                  <SecurityScoreDonut score={securityScore} />
                </div>

                <p className="text-sm text-white/60 text-center mb-6 font-mono">
                  Complete these tasks to level up your wallet protection
                </p>

                <div className="space-y-3">
                  {securityTasks.map(task => {
                const Icon = task.icon;
                const isCompleted = completedTasks.includes(task.id);
                return <button key={task.id} onClick={() => toggleTask(task.id)} className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${isCompleted ? 'bg-[#00d4ff]/10 border-[#00d4ff]/30' : 'bg-[#0d0d0d] border-white/10 hover:border-white/20'}`}>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${isCompleted ? 'bg-[#00d4ff]/20' : 'bg-white/5'}`}>
                          {isCompleted ? <CircleCheck className="w-6 h-6 text-[#00d4ff]" /> : <Icon className="w-6 h-6 text-white/60" />}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className={`text-sm font-semibold font-mono ${isCompleted ? 'text-white' : 'text-white/80'}`}>
                            {task.title}
                          </h4>
                          <p className="text-xs text-white/50 font-mono">{task.description}</p>
                        </div>
                        <div className={`text-sm font-bold px-3 py-1 rounded-lg font-mono ${isCompleted ? 'bg-[#00d4ff]/20 text-[#00d4ff]' : 'bg-white/5 text-white/60'}`}>
                          +{task.points}
                        </div>
                      </button>;
              })}
                </div>

                <motion.button whileTap={{
              scale: 0.98
            }} className="w-full bg-gradient-to-r from-[#00d4ff] to-[#0099ff] text-[#0d0d0d] font-bold py-4 rounded-lg text-sm hover:from-[#33ddff] hover:to-[#00aaff] transition-all mt-6 flex items-center justify-center gap-2 shadow-lg shadow-[#00d4ff]/20">
                  <Key className="w-5 h-5" />
                  Start Security Setup
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Alternative Options Sheet - Bottom Sheet Modal */}
      <AnimatePresence>
        {showAlternativeSheet && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setShowAlternativeSheet(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

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
        }} className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl border-t border-white/10 z-50">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-white/20 rounded-full" />
              </div>

              {/* Content */}
              <div className="px-6 pb-8 pt-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Plus className="w-6 h-6 text-white/60" />
                    <h2 className="text-xl font-bold font-mono">Other Options</h2>
                  </div>
                  <button onClick={() => setShowAlternativeSheet(false)} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <X className="w-4 h-4 text-white/70" />
                  </button>
                </div>

                <p className="text-sm text-white/60 text-center mb-6 font-mono">
                  Alternative ways to set up your wallet
                </p>

                <div className="space-y-3">
                  {alternativeSetup.map((option, index) => {
                const Icon = option.icon;
                return <motion.button key={index} whileTap={{
                  scale: 0.98
                }} className="w-full bg-[#0d0d0d] border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all text-left relative group">
                        {option.badge && <div className="absolute top-3 right-3">
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-[#00d4ff]/20 text-[#00d4ff] font-mono">
                              {option.badge}
                            </span>
                          </div>}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-6 h-6 text-white/60" />
                          </div>
                          <div className="flex-1 pr-8">
                            <h4 className="text-sm font-semibold text-white font-mono">
                              {option.title}
                            </h4>
                            <p className="text-xs text-white/50 font-mono">{option.description}</p>
                          </div>
                        </div>
                      </motion.button>;
              })}
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Jade Wallet Upsell Modal */}
      <JadeUpsellModal isOpen={showJadeUpsellModal} onClose={() => setShowJadeUpsellModal(false)} />

      {/* Transaction Modal */}
      <TransactionModal isOpen={transactionModal !== null} onClose={() => setTransactionModal(null)} type={transactionModal || 'send'} />

      {/* BlockstreamSendFlow Full Screen Modal */}
      <AnimatePresence>
        {showSendFlow && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
            <button onClick={() => setShowSendFlow(false)} className="absolute top-4 right-4 z-[201] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
            <BlockstreamSendFlow />
          </motion.div>}
      </AnimatePresence>

      {/* Receive Bitcoin Modal */}
      <AnimatePresence>
        {showReceiveFlow && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-black z-[200] flex items-center justify-center">
            <button onClick={() => setShowReceiveFlow(false)} className="absolute top-4 right-4 z-[201] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
            <ReceiveBitcoinModal onClose={() => setShowReceiveFlow(false)} />
          </motion.div>}
      </AnimatePresence>
    </div>;
};