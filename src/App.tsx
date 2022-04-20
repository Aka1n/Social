import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Profile from './components/Profile/Profile';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import AuthRedirect from './components/AuthRedirect';
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import InitiationRedirect from './components/InitiationRedirect';
import Loading from './common/Loading/Loading';
import Settings from './components/Settings/Settings';
import { myProfile } from './redux/profile-reducer';
import { getLogin } from './redux/auth-reducer';
import {RootState} from "./redux/redux-store";

const FindUsers = React.lazy(() => import('./components/FindUsres/FindUsers'));

function App() {

  const id = useSelector((state: RootState) => state.auth.user.id);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect( () => {
      (async function () {
          setLoading(true);
          await dispatch(getLogin(id));
          await dispatch(myProfile(undefined));
          setLoading(false);
      })()
  }, [id]);

  if (loading) return <Loading />;
  return (
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
                <Suspense fallback={<Loading />}>
                  <AuthRedirect>
                    <FindUsers />
                  </AuthRedirect>
                </Suspense>
              )}
            />
            <Route
              path="/login"
              element={(
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              )}
            />
            <Route
              path="/settings"
              element={(
                <Suspense fallback={<Loading />}>
                  <AuthRedirect>
                    <Settings />
                  </AuthRedirect>
                </Suspense>
              )}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
