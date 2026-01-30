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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
