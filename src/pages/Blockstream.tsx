import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { ScreenGallery } from '../components/primitives/ScreenGallery';
import { PhoneFrame } from '../case-studies/blockstream/components/PhoneFrame';
import { JadeWalletSetup } from '../case-studies/blockstream/components/JadeWalletSetup';
import { JadeUpsellModal } from '../case-studies/blockstream/components/JadeUpsellModal';
import { OnboardingFlow } from '../case-studies/blockstream/components/OnboardingFlow';
import { TransactionModal } from '../case-studies/blockstream/components/TransactionModal';
import { ReceiveBitcoinModal } from '../case-studies/blockstream/components/ReceiveBitcoinModal';
import { Footer } from '../components/Footer';

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

function SecurityScoreSheetOpenDemo() {
  return (
    <PhoneFrame>
      <div className="dark h-full">
        <JadeWalletSetup defaultSecuritySheetOpen />
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

function OnboardingFlowDemo() {
  return (
    <PhoneFrame>
      <div className="relative h-full dark bg-[#0f1419]">
        <OnboardingFlow />
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

      {/* Section 1: Choose your setup + hardware upsell (two mocks side by side) */}
      <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'choose-setup-flow',
              mockContent: <OnboardingFlowDemo />,
              noBorder: true,
              noShadow: true,
            },
            {
              id: 'hardware-upsell-sheet',
              mockContent: <OnboardingUpsellDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Onboarding"
          sectionTitle="Choose your setup"
          sectionDescription={
            <div>
              <p className="mb-4 text-[#333]">
                Jade’s best selling points were invisible unless you already owned one. The old flow hid air-gapped security and multi-sig behind a store link that made users read through — no product selling, no &quot;why.&quot; First screens were dull and jargon-heavy instead of conversion-focused.
              </p>
              <p className="mb-4 text-[#333]">
                The first screen sets the path. We lead with <strong>Choose your setup</strong> and benefit-driven language instead of jargon. Tap &quot;Maximum Security&quot; and you get <strong>three options</strong> — pair your Jade, set up later, or explore and buy — not a pairing-only dead end. The hardware upsell bottom sheet (right) surfaces air-gapped security and multi-sig up front, so the product sells itself before they own it.
              </p>
              <p className="text-[#333]">
                One entry point. Clear choices. Value visible when it matters.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-[#FAF7F0]"
          galleryGapClass="space-x-2"
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
            {
              id: 'security-score-sheet',
              mockContent: <SecurityScoreSheetOpenDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Adoption"
          sectionTitle="Improvements to the existing empty state"
          sectionDescription={
            <div>
              <p className="mb-4">
                <strong>First</strong> — surfaced key jobs to the homepage: buy, receive, send, sell. Same lesson from Tide: quick actions on the surface get exponentially more usage.
              </p>
              <p className="mb-4">
                <strong>Second</strong> — Security Score. Gamified security completion instead of a red dot you ignore. At Tide, gamifying bookkeeping tripled completion. Same psychology.
              </p>
              <p>
                <strong>Third</strong> — a dismissible Jade upsell banner. Revenue opportunity that doesn&apos;t exist on this surface today.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-white"
          galleryGapClass="space-x-2"
        />
      </section>

      {/* Section 4: Send & receive — key jobs (combined) */}
      <section className="w-full bg-[#FAF7F0] py-20 sm:py-24 overflow-x-clip">
        <ScreenGallery
          items={[
            {
              id: 'receive',
              mockContent: <ReceiveDemo />,
              noBorder: true,
              noShadow: true,
            },
            {
              id: 'sell-flow',
              mockContent: <SellFlowDemo />,
              noBorder: true,
              noShadow: true,
            },
          ]}
          sectionEyebrow="Improving key user jobs"
          sectionTitle="Improving adoption & retention"
          sectionDescription={
            <div>
              <p className="mb-4">
                Receive and send are core jobs that drive both adoption and retention. Today users are asked to pick from <strong>seven receiving methods</strong> — a technical decision most aren’t equipped to make. The mental model people have is Revolut: share your details, money arrives. You don’t choose SWIFT vs SEPA.
              </p>
              <p className="mb-4">
                <strong>BIP-21 unified URI</strong> lets one QR code cover Bitcoin and Lightning automatically; the sender’s wallet picks the method. Tether, Liquid CAD, and EUR stay as explicit choices below because those are different <em>currencies</em>, not different rails. Seven options become <strong>one default</strong> plus &quot;receive a specific asset.&quot;
              </p>
              <p>
                We surface these flows on the home screen and optimised the receive and sell flows so the job is obvious and the technical complexity stays under the hood.
              </p>
            </div>
          }
          hideItemText={true}
          mockContainerBackground="bg-[#FAF7F0]"
          galleryGapClass="space-x-2"
        />
      </section>

      <Footer backgroundClass="bg-white" />
    </div>
  );
}

export default Blockstream;
