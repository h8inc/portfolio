import { MobileDeviceFrame } from '../components/MobileDeviceFrame';
import { JadeWalletSetup } from '../components/JadeWalletSetup';

export default function DemoSecurity() {
  return (
    <MobileDeviceFrame>
      <div className="dark">
        <JadeWalletSetup />
      </div>
    </MobileDeviceFrame>
  );
}
