import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import AppRoute from './routes/AppRoute';
import PageNotFound from './pages/PageNotFound';
import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';
import './app.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<PublicRoute />}>
          <Route path="*" element={<AuthRoute />} />
          <Route path="" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PrivateRoute />}>
          <Route path="*" element={<AppRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
