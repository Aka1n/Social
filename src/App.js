import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Profile from './components/Profile/Profile';
import Navigation from './components/Navigation/Navigation';
import DialogsContainer from './components/Dialogs/Dialogs_Container';
import Header_Container from './components/Header/Header_Container.jsx';
import Login from './components/Login/Login.jsx';
import FindUsers from './components/FindUsres/FindUsers';

function App() {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header_Container />
        <div className="main">
          <Navigation />
          <Routes>
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/findusers/*" element={<FindUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
