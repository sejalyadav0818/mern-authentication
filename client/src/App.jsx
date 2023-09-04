import React, { useState } from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom'  
import Signup from './Signup';
import Login from './Login';
import DarshBorad from './DarshBorad';
import Home from './Home';

function App() {
  
return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/darshboard' element={<DarshBorad/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;