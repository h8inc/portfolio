import { useState } from 'react';
import { MobileDeviceFrame } from '../components/MobileDeviceFrame';
import { TransactionModal } from '../components/TransactionModal';
import { JadeWalletSetup } from '../components/JadeWalletSetup';

export default function DemoSell() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <MobileDeviceFrame>
      <div className="relative h-full dark">
        <JadeWalletSetup />
        {!dismissed && (
          <TransactionModal isOpen={true} onClose={() => setDismissed(true)} type="sell" />
        )}
      </div>
    </MobileDeviceFrame>
  );
}
