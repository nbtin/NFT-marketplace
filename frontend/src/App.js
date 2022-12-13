import Homepage from "./pages/Home/Homepage";
import Register from "./pages/Register/Register";
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login"
import News from "./pages/News/News";
import AboutUs from "./pages/AboutUs/AboutUs";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} default />
        <Route path="/dangky" element={<Register />} />
        <Route path="/dangnhap" element={<Login />} />
        <Route path="/khampha" element={<AboutUs />} />
        <Route path="/tintuc" element={<News />} />
      </Routes>

    </>
  );
}

export default App;
