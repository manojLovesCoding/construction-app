import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/frontend/Home';
import About from './components/frontend/About';
import './assets/css/style.scss';
import Services from './components/frontend/Services';
import Projects from './components/frontend/Projects';
import Blog from './components/frontend/Blog';
import ContactUs from './components/frontend/ContactUs';
import Login from './components/backend/Login';
import Dashboard from './components/backend/Dashboard';
import RequireAuth from './components/common/RequireAuth';
import { default as ShowServices } from './components/backend/services/Show';
import { default as ShowProjects } from './components/backend/projects/Show';
import { default as ShowArticles } from './components/backend/articles/Show';
import { default as ShowTestimonials } from './components/backend/testimonials/Show';
import Testimonials from './components/frontend/Testimonials';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/blogs' element={<Blog />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/testimonials' element={<Testimonials />} />
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashboard' element={
            <RequireAuth><Dashboard /></RequireAuth>} />
          <Route path='/admin/services' element={
            <RequireAuth><ShowServices /></RequireAuth>} />
          <Route path='/admin/projects' element={
            <RequireAuth><ShowProjects /></RequireAuth>} />
          <Route path='/admin/articles' element={
            <RequireAuth><ShowArticles /></RequireAuth>} />
          <Route path='/admin/testimonials' element={
            <RequireAuth><ShowTestimonials /></RequireAuth>} />
            
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
