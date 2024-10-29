import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightSearch from './pages/FlightSearch';
import Login from './pages/Login';
import DisplayResults from '../src/pages/DisplayResults';
import DisplayUsers from './pages/DisplayUsers';
import Nav from './components/Navbar';
import Footer from './components/footer';
import Contact from './pages/Contact';


function App() {


  const handleLogout = () => {
    localStorage.removeItem('amadeusToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };


  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<FlightSearch />} />
          <Route path="/login" element={<Login />} />
          <Route path="/results" element={<DisplayResults />} />
          <Route path="/users" element={<DisplayUsers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
      <Footer />
    </div>
  </Router>
);
}

export default App;
