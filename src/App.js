import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';


//components include
import Index from './components/mainComponents/indexComponent';
import Login from './components/mainComponents/loginComponent';
import Logout from './components/mainComponents/logoutComponent';
import Newaccount from './components/mainComponents/newaccountComponent';
import Header from "./components/headerComponents/headerComponent";
import Footer from "./components/footerComponents/footerComponent";
import Home from "./components/mainComponents/homeComponent";
import ChooseAvatar from "./components/mainComponents/chooseavatarComponent";
import Mylist from "./components/mainComponents/mylistComponent"
import Myaccount from "./components/mainComponents/myaccountComponent"
import Nature from "./components/mainComponents/natureComponent"


//import js
import { AuthProvider } from './assets/js/AuthContext';



function App() {
  return (
    <div className="gradient-container">
      <Router>

        <AuthProvider>

          <div className="App">
            <Header />

            <div className="">

              <div className=''>
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
              <div className=''>
                <Routes>
                  <Route path="/home" element={<Home />} />
                </Routes>
              </div>
              <div className=''>
                <Routes>
                  <Route path="/logout" element={<Logout />} />
                </Routes>
              </div>
              <div className='container'>
                <Routes>
                  <Route path="/chooseavatar" element={<ChooseAvatar />} />
                </Routes>
              </div>
              <div className=''>
                <Routes>
                  <Route path="/mylist" element={<Mylist />} />
                </Routes>
              </div>
              <div className=''>
                <Routes>
                  <Route path="/myaccount" element={<Myaccount />} />
                </Routes>
              </div>
              <div className=''>
                <Routes>
                  <Route path="/nature" element={<Nature />} />
                </Routes>
              </div>

            </div>
            <Footer />
          </div>

        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
