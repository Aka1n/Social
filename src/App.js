import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Profile from "./components/Profile/Profile";
import Navigation_Container from "./components/Navigation/Navigation_Container";
import Dialogs_Container from "./components/Dialogs/Dialogs_Container";
import Header_Container from "./components/Header/Header_Container.jsx";
import React from "react";
import Login from "./components/Login/Login.jsx";
import FindUsers from "./components/Find_Usres/FindUsers";




function App() {
    return (
        <BrowserRouter>
            <div className='wrapper'>
                <Header_Container />
                <div className='main'>
                    <Navigation_Container />
                    <Routes>
                        <Route path='/profile/:userId' element={<Profile/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/dialogs/*' element={<Dialogs_Container/>}/>
                        <Route path='/findusers/*' element={<FindUsers/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App