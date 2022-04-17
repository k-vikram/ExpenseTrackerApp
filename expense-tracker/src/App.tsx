
import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/authLayout";
import LoginPage from "./components/auth/login";
import PageNotFound from "./components/auth/pageNotFound";
import Register from "./components/auth/register";
import VerifyUser from "./components/auth/verifyUser";

const App = (): React.ReactElement | null => {
  return <Routes>
    <Route path="/" element={<AuthLayout>
      <LoginPage />
    </AuthLayout>}
    />
    <Route path="auth" element={<AuthLayout />} >
      <Route index element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<Register />} />
      <Route path="verify" element={<VerifyUser />} />
    </Route>
    <Route path="*" element={<AuthLayout>
      <PageNotFound />
    </AuthLayout>} />
  </Routes>
}

export default App;