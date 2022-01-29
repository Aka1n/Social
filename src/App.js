import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Profile_Container from "./components/Profile/Profile_Conteiner";
import Navigation_Container from "./components/Navigation/Navigation_Container";
import Dialogs_Container from "./components/Dialogs/Dialogs_Container";
import Find_Users_Container from "./components/Find_Usres/Find_Users_Container";
import Header_Container from "./components/Header/Header_Container.jsx";
import React from "react";
import Login from "./components/Login/Login.jsx";




function App() {
    return (
        <BrowserRouter>
            <div className='wrapper'>
                <Header_Container />
                <div className='main'>
                    <Navigation_Container />
                    <Routes>
                        <Route path='/profile/:userId' element={<Profile_Container />}/>
                        <Route path='/profile' element={<Profile_Container />}/>
                        <Route path='/dialogs/*' element={<Dialogs_Container/>}/>
                        <Route path='/findusers/*' element={<Find_Users_Container/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App