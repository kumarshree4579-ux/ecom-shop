import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import ColorPicker from './Pages/CSS/Colors'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/colors' element={<ColorPicker/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
