import "./app.css";
import React, { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Create from "./pages/Create";
import Contact from "./pages/Contact";
import ScrollToTop from "./Hooks/ScrollToTop";
import NftDetails from "./pages/NftDetails";
import Register from "./pages/Register/Register";
import MyCollection from "./pages/MyCollection/MyCollection"

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} default />
        {/* <Route path="/dangnhap" element={<Login />} /> */}
        <Route path="/dangnhap" element={
          <div>
            {
              currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
          </div>
        } />
        <Route path="/dangky" element={<Register />} />
        <Route path="/market" element={<Market />} />
        <Route path="/create" element={<Create />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mycollection" element={<MyCollection />} />
        <Route path="/market/:id" element={<NftDetails />} />
      </Routes>
    </>

  );
}

export default App;
