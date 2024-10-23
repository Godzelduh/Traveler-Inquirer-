import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import DisplayResults from './components/DisplayResults';
import DisplayUsers from './components/DisplayUsers';
import '../src/bulma.css';

function App() {
  return (
    <Router>
      <div>
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
