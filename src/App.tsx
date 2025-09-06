import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Universities from './pages/Universities';
import Scholarships from './pages/Scholarships';
import Courses from './pages/Courses';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="universities" element={<Universities />} />
            <Route path="universities/:country" element={<Universities />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="scholarships/:id" element={<Scholarships />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:category" element={<Courses />} />
            <Route path="courses/:category/:subcategory" element={<Courses />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;