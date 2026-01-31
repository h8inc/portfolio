import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tide from './pages/Tide';
import Extended from './pages/Extended';
import About from './pages/About';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tide" element={<Tide />} />
        <Route path="/extended" element={<Extended />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;