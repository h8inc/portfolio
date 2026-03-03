import { MobileDeviceFrame } from '../components/MobileDeviceFrame';
import { ReceiveBitcoinModal } from '../components/ReceiveBitcoinModal';

export default function DemoReceive() {
  return (
    <MobileDeviceFrame>
      <div className="h-full bg-[#0f0f0f] dark">
        <ReceiveBitcoinModal />
      </div>
    </MobileDeviceFrame>
  );
}
