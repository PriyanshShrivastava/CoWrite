import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center"></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/:id" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
