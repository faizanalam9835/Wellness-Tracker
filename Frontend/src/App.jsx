import { useState } from 'react'
import './App.css'
import AllRoutes from './components/AllRoutes'
import './index.css'
import { ToastContainer } from "react-toastify";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    <AllRoutes/>
       
    </>
  )
}

export default App
