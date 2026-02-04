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
          <Route path='/admin/login' element={<Login />} />
          <Route path='/admin/dashboard' element={
            <RequireAuth><Dashboard /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
