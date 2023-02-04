import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from './components/Edit';
import Home from './components/Home';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/edit/:id' element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
