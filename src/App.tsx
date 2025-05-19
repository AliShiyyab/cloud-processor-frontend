import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './component/nav';
import {Home} from './pages/home';
import {ContactUs} from './pages/contact';
import { AboutUs } from './pages/about';
import { Login } from './pages/login';
import { Register } from './pages/register';
import {Dashboard} from "./pages/dashboard";

function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
