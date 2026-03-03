import React, { useState } from 'react';
import { SetupChoiceScreen } from './SetupChoiceScreen';
import { JadeSetupOptions } from './JadeSetupOptions';
import { JadeWalletEmptyState } from './JadeWalletEmptyState';
import { JadePairingScreen } from './JadePairingScreen';
import { PostSetupSuccess } from './PostSetupSuccess';
import { WalletDashboard } from './WalletDashboard';
import { JadeWalletSetup } from './JadeWalletSetup';
import { JadeUpsellModal } from './JadeUpsellModal';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FlowStep = 'choice' | 'jade-options' | 'jade-purchase' | 'pairing' | 'jade-pairing' | 'empty-state' | 'success' | 'dashboard' | 'software-setup';

interface StepConfig {
  id: FlowStep;
  label: string;
  description: string;
}

const FLOW_STEPS: StepConfig[] = [
  { id: 'choice', label: 'Choose Setup', description: 'Select your security method' },
  { id: 'jade-options', label: 'Jade Setup', description: 'Configure Jade wallet' },
  { id: 'pairing', label: 'Pair Device', description: 'Connect your Jade wallet' },
  { id: 'success', label: 'Complete', description: "You're all set!" },
  { id: 'dashboard', label: 'Wallet', description: 'Your Bitcoin home' },
];

export const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('choice');
  const [setupChoice, setSetupChoice] = useState<'software' | 'jade' | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const currentStepIndex = FLOW_STEPS.findIndex((s) => s.id === currentStep);
  const progress = ((currentStepIndex + 1) / FLOW_STEPS.length) * 100;

  const handleChoiceSelect = (choice: 'software' | 'jade') => {
    setSetupChoice(choice);
    if (choice === 'jade') {
      setCurrentStep('jade-options');
    } else {
      setCurrentStep('software-setup');
    }
  };

  const handleJadeOptionSelect = (option: 'pair' | 'skip' | 'buy') => {
    if (option === 'pair') {
      setCurrentStep('jade-pairing');
    } else if (option === 'skip') {
      setCurrentStep('empty-state');
    } else if (option === 'buy') {
      setShowPurchaseModal(true);
    }
  };

  const handlePurchaseComplete = () => {
    setShowPurchaseModal(false);
  };

  const handlePairingComplete = () => {
    setCurrentStep('success');
  };

  const handleStartPairing = () => {
    setCurrentStep('jade-pairing');
  };

  const handleSuccessContinue = () => {
    setCurrentStep('dashboard');
  };

  const goBack = () => {
    if (currentStep === 'dashboard') return;
    if (currentStep === 'jade-options') setCurrentStep('choice');
    else if (currentStep === 'jade-purchase') setCurrentStep('jade-options');
    else if (currentStep === 'pairing' || currentStep === 'empty-state' || currentStep === 'jade-pairing') setCurrentStep('jade-options');
    else if (currentStep === 'software-setup') setCurrentStep('choice');
    else if (currentStep === 'success' && setupChoice === 'jade') setCurrentStep('jade-pairing');
  };

  const showTopBar = currentStep !== 'dashboard' && currentStep !== 'software-setup' && currentStep !== 'jade-pairing' && currentStep !== 'empty-state';

  return (
    <div className="relative h-full w-full bg-[#0f1419]">
      {showTopBar && (
        <div className="absolute top-0 left-0 right-0 z-50 bg-[#0f1419]/95 backdrop-blur-sm border-b border-slate-800/50">
          <div className="flex items-center justify-between px-4 py-3">
            {currentStep !== 'choice' && (
              <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </motion.button>
            )}
            {currentStep === 'choice' && <div />}
            <div className="text-right">
              <span className="text-sm font-bold text-cyan-400">{Math.round(progress)}%</span>
              <p className="text-xs text-slate-500">Complete</p>
            </div>
          </div>
          <div className="h-1 w-full bg-slate-900">
            <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: 'easeInOut' }} />
          </div>
        </div>
      )}

      <div className={showTopBar ? 'h-full pt-20' : 'h-full'}>
        <AnimatePresence mode="wait">
          {currentStep === 'choice' && (
            <motion.div key="choice" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full">
              <SetupChoiceScreen onChoiceSelect={handleChoiceSelect} />
            </motion.div>
          )}

          {currentStep === 'jade-options' && (
            <motion.div key="jade-options" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full">
              <JadeSetupOptions onOptionSelect={handleJadeOptionSelect} />
            </motion.div>
          )}

          {currentStep === 'pairing' && (
            <motion.div key="pairing" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full relative">
              <JadeWalletEmptyState onPairJade={handleStartPairing} />
            </motion.div>
          )}

          {currentStep === 'jade-pairing' && (
            <motion.div key="jade-pairing" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full">
              <JadePairingScreen onSuccess={handlePairingComplete} onBack={goBack} />
            </motion.div>
          )}

          {currentStep === 'empty-state' && (
            <motion.div key="empty-state" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full relative">
              <JadeWalletEmptyState onPairJade={handleStartPairing} />
            </motion.div>
          )}

          {currentStep === 'success' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full">
              <PostSetupSuccess onContinue={handleSuccessContinue} userName="Satoshi" />
            </motion.div>
          )}

          {currentStep === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full">
              <WalletDashboard setupType={setupChoice || 'software'} userName="Satoshi" />
            </motion.div>
          )}

          {currentStep === 'software-setup' && (
            <motion.div key="software-setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="h-full">
              <JadeWalletSetup />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPurchaseModal && (
          <JadeUpsellModal
            isOpen={showPurchaseModal}
            onClose={() => setShowPurchaseModal(false)}
            onBuy={() => {
              window.open('https://store.blockstream.com/product/blockstream-jade-plus/', '_blank');
              setShowPurchaseModal(false);
            }}
            embedded
          />
        )}
      </AnimatePresence>
    </div>
  );
};
