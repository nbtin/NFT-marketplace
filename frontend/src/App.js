import Homepage from "./pages/Home/Homepage";
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} default />
        
      </Routes>

    </>
  );
}

export default App;
