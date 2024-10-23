import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import DisplayResults from './pages/DisplayResult';
import DisplayUsers from './pages/DisplayUsers';
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<DisplayResults />} />
          <Route path="/users" element={<DisplayUsers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
