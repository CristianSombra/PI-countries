// import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Landing, Detail, Form } from './views/index';
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
      </Routes>
    </div>
  );
}

export default App