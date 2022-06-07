import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './component/Loader/Loader';
import MainLayout from './layout/MainLayout';
import PrivateLayout from "./layout/PrivateLayout";

const AuthLogin = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Login')), 500)
  })
});

const AuthChangePassword = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/ChangePassword')), 500)
  })
});

const AuthUpdateData = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/UpdateData')), 500)
  })
});

// const AuthChangePassword = lazy(() => import('./pages/ChangePassword'));

// const AuthUpdateData = lazy(() => import('./pages/UpdateData'))

const AuthRegisterData = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/Register')), 500)
  })
});

// const AuthRegisterData = lazy(() => import('./pages/Register'))

const Tables = lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(import('./pages/Tables')), 500)
    });
});

const ForgotPassword = lazy(() => {
  return new Promise(resolve => {
    setTimeout(() => resolve(import('./pages/ForgotPassword')), 500)
  });
});

// const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const Router = () => {
    return (
        <AnimatePresence>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>} />
                    <Route path="/login" element={<AuthLogin />}/>
                    <Route path="/dashboard" element={
                      <PrivateLayout>
                        <MainLayout checked={true}>
                            <Tables />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/changepassword" element={
                      <PrivateLayout>
                        <MainLayout checked={true}>
                          <AuthChangePassword />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/updatedata" element={
                      <PrivateLayout>
                        <MainLayout checked={true}>
                          <AuthUpdateData />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/register" element={
                      <PrivateLayout>
                        <MainLayout checked={true}>
                          <AuthRegisterData />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/forgotpassword" element={<ForgotPassword />}/>
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};

export default Router;
