import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { PortfolioAbout } from '../components/generated/PortfolioAbout';

function About() {
  // NOTE: GradientBackground is rendered at App level to avoid transform issues during slide animation
  const navigate = useNavigate();
  
  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Close and return to home"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" strokeWidth={2.5} />
      </button>
      <PortfolioAbout />
    </>
  );
}

export default About;
