import React from 'react';
import {Navigate} from 'react-router-dom'

const isExpire = () => {
  const isAuth = JSON.parse(localStorage.getItem('isAuth'));
  if (!isAuth) return false;
  const nowTime = new Date();
  if (nowTime.getTime() > isAuth.expiry) {
    localStorage.removeItem('isAuth');
    return false;
  }
  return true;
}

function PrivateRoute({children}) {
  return isExpire() ? children: <Navigate to="/" replace/>
}

export default PrivateRoute;