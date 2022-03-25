import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React, {Suspense, useEffect, useState} from 'react';
import Profile from './components/Profile/Profile';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
const FindUsers = React.lazy(() => import('./components/FindUsres/FindUsers'));
import AuthRedirect from './components/AuthRedirect';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import InitiationRedirect from './components/InitiationRedirect';
import Loading from "./common/Loading/Loading";
import Settings from "./components/Settings/Settings";
import {myProfile} from "./redux/profile-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getLogin} from "./redux/auth-reducer";

function App() {

  const id = useSelector(state => state.auth.user.id)

  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(async () => {
    await setLoading(true)
    await dispatch(getLogin(id))
    await dispatch(myProfile())
    await setLoading(false)
   },[id])


  if (loading) return <Loading/>
  else return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="wrapper">
        <Header />
        <div className="main">
          <Navigation />
          <Routes>
            <Route path="/" element={<InitiationRedirect />} />
            <Route
              path="/profile/:userId"
              element={(
                <AuthRedirect>
                  <Profile />
                </AuthRedirect>
              )}
            />
            <Route
              path="/profile"
              element={(
                <AuthRedirect>
                  <Profile />
                </AuthRedirect>
              )}
            />
            <Route
              path="/dialogs/*"
              element={(
                <AuthRedirect>
                  <Dialogs />
                </AuthRedirect>
              )}
            />
            <Route
              path="/findusers/*"
              element={(
                  <Suspense fallback={<Loading/>}>
                    <AuthRedirect>
                      <FindUsers />
                     </AuthRedirect>
                  </Suspense>
              )}
            />
            <Route path="/login" element={
                <Suspense fallback={<Loading/>}>
                    <Login />
                </Suspense>
            }/>
            <Route path="/settings" element={
                <Suspense fallback={<Loading/>}>
                    <AuthRedirect>
                        <Settings/>
                    </AuthRedirect>
                </Suspense>
            }/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
