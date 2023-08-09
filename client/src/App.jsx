// import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form, About } from './views/index';
import Navbar from './components/navbar/navbar';

function App() {

  const location = useLocation();

  return (
    <div className="APP">
      {location.pathname !== "/" && <Navbar />}
      <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Detail/:id" element={<Detail />} />
          <Route path="/Create" element={<Form />} />
          <Route path="/About" element={<About />} />
      </Routes>
    </div>
  );
}

export default App