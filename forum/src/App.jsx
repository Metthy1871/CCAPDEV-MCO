import Home from './pages/Home';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (

    <div className="App">

       
       <Routes>

          <Route path="/" element={<Home />}/>
          
       </Routes>

    </div>
  );
}

export default App;