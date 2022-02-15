import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {useEffect} from 'react';
import Profile from './components/Profile/Profile';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login.jsx';
import FindUsers from './components/FindUsres/FindUsers';
import AuthRedirect from "./components/AuthRedirect";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import InitiationRedirect from "./components/InitiationRedirect";


function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <Header/>
                <div className="main">
                    <Navigation/>
                    <Routes>
                        <Route path="/" element={
                            <InitiationRedirect/>
                        }/>
                        <Route path="/profile/:userId" element={
                            <AuthRedirect>
                                <Profile/>
                            </AuthRedirect>
                        }/>
                        <Route path="/profile" element={
                            <AuthRedirect>
                                <Profile/>
                            </AuthRedirect>
                        }/>
                        <Route path="/dialogs/*" element={
                            <AuthRedirect>
                                <Dialogs/>
                            </AuthRedirect>
                        }/>
                        <Route path="/findusers/*" element={
                            <AuthRedirect>
                                <FindUsers/>
                            </AuthRedirect>}/>
                        <Route path="/login" element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
