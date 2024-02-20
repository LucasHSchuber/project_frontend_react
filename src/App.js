import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';


//components include
import Index from './components/mainComponents/indexComponent';
import Login from './components/mainComponents/loginComponent';
import Newaccount from './components/mainComponents/newaccountComponent';
import Header from "./components/headerComponents/headerComponent";
import Footer from "./components/footerComponents/footerComponent";
import Home from "./components/mainComponents/homeComponent";


//import css


function App() {
  return (
    <div className="gradient-container">
      <Router>
        <div className="App">
          <Header />
          <div className="">

            <div className='container'>
              <Routes>
                <Route path="/index" element={<Index />} />
              </Routes>
            </div>
            <div className='container'>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
            <div className='container'>
              <Routes>
                <Route path="/newaccount" element={<Newaccount />} />
              </Routes>
            </div>
            <div className='container'>
              <Routes>
                <Route path="/home" element={<Home />} />
              </Routes>
            </div>

            {/* 
            <div>
              <Routes>
                <Route path="/home" element={<Home />} />
              </Routes>
            </div> */}

            {/* <div>
              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
            </div> */}

            {/* <div className='container'>
              <Routes>
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
 */}

            {/* <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/additem" element={<Additem />} />
              <Route path="/information" element={<Information />} />
              <Route path="/settings" element={<Settings />} />
            </Routes> */}

          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
