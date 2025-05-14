import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cadastro from "./pages/Regiter";
import Navbar from "./components/Navbar";
import Edit from "./pages/Edit";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cliente" element={<Cadastro />} />
          <Route path="/cliente/:id" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}