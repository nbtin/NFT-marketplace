import Homepage from "./pages/Home/Homepage";
import Register from "./pages/Register/Register";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login"
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} default />
        <Route path="/dangky" element={ <Register/>}  />
        <Route path="/dangnhap" element={<Login />} />
      </Routes>

    </>
  );
}

export default App;
