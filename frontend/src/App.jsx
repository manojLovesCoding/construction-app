import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button className='btn btn-primary'>click here</button>
    </>
  )
}

export default App
