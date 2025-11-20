import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tide from './pages/Tide';
import TideGallery from './pages/TideGallery';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tide" element={<Tide />} />
      <Route path="/tide/gallery" element={<TideGallery />} />
    </Routes>
  );
}

export default App;