import './App.css';
import React from 'react'
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/Contextreducer';
import History from './screens/History';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/Signup" element={<Signup />}></Route>
          <Route exact path="/History" element={<History/>}></Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
