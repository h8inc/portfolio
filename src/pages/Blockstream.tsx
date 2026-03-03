import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ScreenGallery } from '../components/primitives/ScreenGallery';
import { PhoneFrame } from '../case-studies/blockstream/components/PhoneFrame';
import { JadeWalletSetup } from '../case-studies/blockstream/components/JadeWalletSetup';
import { JadeUpsellModal } from '../case-studies/blockstream/components/JadeUpsellModal';
import { TransactionModal } from '../case-studies/blockstream/components/TransactionModal';
import { ReceiveBitcoinModal } from '../case-studies/blockstream/components/ReceiveBitcoinModal';

function OnboardingUpsellDemo() {
  const [dismissed, setDismissed] = useState(false);
  return (
    <PhoneFrame>
      <div className="relative h-full dark">
        <JadeWalletSetup />
        {!dismissed && (
          <JadeUpsellModal embedded hideBackdrop isOpen={true} onClose={() => setDismissed(true)} />
        )}
      </div>
    </PhoneFrame>
  );
}

function SecurityScoreDemo() {
  return (
    <PhoneFrame>
      <div className="dark h-full">
        <JadeWalletSetup />
      </div>
    </PhoneFrame>
  );
}

function SellFlowDemo() {
  const [dismissed, setDismissed] = useState(false);
  return (
    <PhoneFrame>
      <div className="relative h-full dark">
        <JadeWalletSetup />
        {!dismissed && (
          <TransactionModal embedded hideBackdrop isOpen={true} onClose={() => setDismissed(true)} type="sell" />
        )}
      </div>
    </PhoneFrame>
  );
}

function ReceiveDemo() {
  return (
    <PhoneFrame>
      <div className="h-full bg-[#0f0f0f] dark">
        <ReceiveBitcoinModal />
      </div>
    </PhoneFrame>
  );
}

function Blockstream() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-[#0b0e11]">
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Close and return to home"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" strokeWidth={2.5} />
      </button>

      {/* Hero */}
      <div className="relative min-h-[60vh] w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 pt-24 md:pt-16 gap-4 bg-[#0d0d0d] overflow-hidden text-white">
        <p
          className="text-xs uppercase tracking-[0.4em] text-[#00d4ff]/70"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Case Study
        </p>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4"
          style={{ fontWeight: 500, color: 'rgba(250,250,250,0.98)', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Blockstream <span className="text-[#00d4ff]">Wallet</span>
        </h1>
        <p
          className="text-[#a0a0a0] text-sm sm:text-base text-center max-w-[520px] px-4"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Onboarding, security gamification, and transaction flows for a Bitcoin self-custody wallet on Liquid Network.
        </p>
      </div>

      {/* Section 1: Onboarding Upsell */}
      <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'onboarding-upsell',
              mockContent: <OnboardingUpsellDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Onboarding"
          sectionTitle="Hardware Upsell"
          sectionDescription={
            <div>
              <p className="mb-4">
                During software wallet setup, a contextual upsell introduces the Jade hardware wallet — framing it as the
                next step in security rather than a hard sell. The modal opens automatically on first visit, with product
                imagery and a clear value proposition.
              </p>
              <p>
                The goal is to convert high-intent users early, before they settle into a software-only workflow.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-[#FAF7F0]"
        />
      </section>

      {/* Section 2: Security Score */}
      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'security-score',
              mockContent: <SecurityScoreDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Engagement"
          sectionTitle="Security Score"
          sectionDescription={
            <div>
              <p className="mb-4">
                A gamified security checklist turns wallet hardening into a progression system. Users see their score at a
                glance and can tap to expand the full task list — backup seed phrase, set PIN, enable biometrics.
              </p>
              <p>
                Each completed task moves the donut chart and reinforces a sense of ownership over their security posture.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-white"
        />
      </section>

      {/* Section 3: Sell Flow */}
      <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'sell-flow',
              mockContent: <SellFlowDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Transactions"
          sectionTitle="Sell Flow"
          sectionDescription={
            <div>
              <p className="mb-4">
                The sell modal surfaces as a bottom sheet over the wallet home, keeping context visible behind the overlay.
                Amount input, network selection, and fee estimation are composed into a single scrollable flow.
              </p>
              <p>
                Progressive disclosure keeps the initial view focused while advanced options (fee priority, network toggle)
                are one tap away.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-[#FAF7F0]"
        />
      </section>

      {/* Section 4: Receive */}
      <section className="w-full bg-white py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'receive',
              mockContent: <ReceiveDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Transactions"
          sectionTitle="Receive Bitcoin"
          sectionDescription={
            <div>
              <p className="mb-4">
                A unified receive screen supports both on-chain and Lightning addresses through a single QR code. Users can
                switch to asset-specific addresses for Liquid tokens, or toggle between single-use and reusable addresses.
              </p>
              <p>
                Copy and share actions are prominent, and address truncation keeps the UI clean without hiding critical
                verification characters.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-white"
        />
      </section>
    </div>
  );
}

export default Blockstream;
