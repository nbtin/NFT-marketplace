
import {Routes, Route} from 'react-router-dom';

import './App.css';
import Homepage from './pages/Home/Homepage'
function App() {
  return (
    <>
      <Routes>
        <Route path="/"  element={<Homepage/>} default/>
      </Routes>

      
    </>


  );
}

export default App;
