import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import History from "./pages/History";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <LanguageProvider>
      <div className="App min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/history" element={<History />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;