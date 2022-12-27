import "./app.css";
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Create from "./pages/Create";
import Contact from "./pages/Contact";
import ScrollToTop from "./Hooks/ScrollToTop";
import NftDetails from "./pages/NftDetails2";
import Register from "./pages/Register/Register";
import MyCollection from "./pages/MyCollection/MyCollection"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MyFollowing from "./pages/MyFollowing";

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
        <Route path="/myfollowing" element={<MyFollowing />} />
        <Route path="/nfts/:token_id" element={<NftDetails />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className = "zindex"
      />
    </>

  );
}

export default App;
