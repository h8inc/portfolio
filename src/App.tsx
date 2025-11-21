import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tide from './pages/Tide';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tide" element={<Tide />} />
      </Routes>
    </>
  );
}

export default App;