import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tareas from './view/Tareas.jsx';
import User from './view/User.jsx';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/tareas-page" element={<Tareas />} />
          <Route path="/" element={<User />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
