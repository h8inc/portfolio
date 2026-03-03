import { useState } from 'react';
import { MobileDeviceFrame } from '../components/MobileDeviceFrame';
import { JadeUpsellModal } from '../components/JadeUpsellModal';
import { JadeWalletSetup } from '../components/JadeWalletSetup';

export default function DemoUpsell() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <MobileDeviceFrame>
      <div className="relative h-full dark">
        <JadeWalletSetup />
        {!dismissed && (
          <JadeUpsellModal isOpen={true} onClose={() => setDismissed(true)} />
        )}
      </div>
    </MobileDeviceFrame>
  );
}
