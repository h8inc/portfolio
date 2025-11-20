import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Tide from './pages/Tide';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tide" element={<Tide />} />
    </Routes>
  );
}

export default App;