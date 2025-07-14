import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ContactPage from './pages/ContactPage'
import About from './pages/About'
import './App.css'
import ContactUs from './pages/ContactUs'
import NoPage from './pages/NoPage'
import React from 'react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoPage />} />
        <Route path="contact-us" element={<ContactUs />} />
        

      </Route>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
