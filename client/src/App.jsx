import React, { useState } from 'react';
import {BrowserRouter , Route , Routes} from 'react-router-dom'  
import Signup from './Signup';
import Login from './Login';

function App() {
  
return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App;