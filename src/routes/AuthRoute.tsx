import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/auth/signIn';
import SignUp from '../pages/auth/signUp';
import ForgetPassword from '../pages/auth/forgetPassword';
import ResetPassword from '../pages/auth/resetPassword';
import PageNotFound from '../pages/PageNotFound';

const AuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgetpassword" element={<ForgetPassword />} />
      <Route path="password-change" element={<ResetPassword />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AuthRoute;
