import React from 'react';
import {Navigate} from 'react-router-dom'

function PrivateRoute({children}) {
  const isExpiry = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return false;
    const nowTime = new Date();
    if (nowTime.getTime() > user.expiry) {
      localStorage.removeItem('user');
      return false;
    }
    return true;
  }
  return isExpiry() ? children: <Navigate to="/login" replace/>
}

export default PrivateRoute;