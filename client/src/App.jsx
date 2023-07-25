// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./views/home/home";
import Landing from "./views/landing/landing";
import Detail from "./views/detail/detail";
import Form from "./views/form/form";

function App() {
  return (
    <div className="APP">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App