import Homepage from "./pages/Home/Homepage";
// import Register from "./pages/Home/Register";
import { Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} default />
        {/* <Route path="/dangky" element={ <Register/>}  /> */}
      </Routes>

    </>
  );
}

export default App;
