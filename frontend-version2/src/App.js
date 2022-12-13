import "./app.css";
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Create from "./pages/Create";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import NftDetails from "./pages/NftDetails";
function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} default/>
      <Route path="/dangnhap" element={<Login />} />
      <Route path="/market" element={<Market />} />
      <Route path="/create" element={<Create />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/market/:id" element={<NftDetails />} />
    </Routes>
    </>

  );
}

export default App;
