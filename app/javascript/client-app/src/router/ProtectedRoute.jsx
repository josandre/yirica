import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const user_id = localStorage.getItem('user_id');
  const location = useLocation();

  if (!token) {
    return <Component {...rest} />;
  }


  const newPath = `${location.pathname}?user_id=${user_id}`;

  return (
    <Navigate
      to={newPath}
      replace
    />
  );
};

export default ProtectedRoute;
