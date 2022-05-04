
import React from "react";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ISignInResult } from "./actionCreators/auth";
import AuthLayout from "./components/layouts/authLayout";
import LoginPage from "./components/auth/login";
import PageNotFound from "./components/auth/pageNotFound";
import Register from "./components/auth/register";
import VerifyUser from "./components/auth/verifyUser";
import Expenses from "./components/expenses";
import PrivateLayout from "./components/layouts/privateLayout";
import Reports from "./components/reports";
import { useAppSelector } from "./store/hooks";
import { AuthState } from "./store/storeTypes";

const App = (): React.ReactElement | null => {
  return <Routes>
    <Route path="/" >
      <Route index element={<DefaultRoute />} />
      <Route path="auth" element={<AuthLayout />} >
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<VerifyUser />} />
      </Route>
      <Route path="home" element={<PrivateRoute element={<Expenses />} />} />
      <Route path="reports" element={<PrivateRoute element={<Reports />} />} />
    </Route>
    <Route path="*" element={<AuthLayout>
      <PageNotFound />
    </AuthLayout>} />
  </Routes>
}

export default App;

interface IPrivateRoutes {
  element?: JSX.Element
}

const PrivateRoute = ({
  element
}: IPrivateRoutes): React.ReactElement | null => {

  const { signInState } = useAppSelector(MapStateToHooks);
  const { entities } = signInState;
  const navigate = useNavigate();

  useEffect(() => {
    if (!(entities?.loggedInUser as ISignInResult['loggedInUser'])?.hasOwnProperty('accessToken')) {
      navigate('/')
    }
  }, [])

  return <PrivateLayout>
    {element || null}
  </PrivateLayout>
}

const DefaultRoute = (): React.ReactElement | null => {

  const { signInState } = useAppSelector(MapStateToHooks);
  const { entities } = signInState;
  const navigate = useNavigate();

  useEffect(() => {
    if ((entities?.loggedInUser as ISignInResult['loggedInUser'])?.hasOwnProperty('accessToken')) {
      navigate('/home')
    }
  }, [])

  return <AuthLayout>
    <LoginPage />
  </AuthLayout>
}

const MapStateToHooks = (state: {
  auth: AuthState;
}) => ({
  signInState: state.auth.signInState
})