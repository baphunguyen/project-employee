import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './component/Loader/Loader';
import MainLayout from './layout/MainLayout';
import PrivateLayout from "./layout/PrivateLayout";

const AuthLogin = lazy(() => import('./pages/Login'));

const AuthChangePassword = lazy(() => import('./pages/ChangePassword'));

const AuthUpdateData = lazy(() => import('./pages/UpdateData'))

const AuthRegisterData = lazy(() => import('./pages/Register'))

const Tables = lazy(() => import('./pages/Tables'));

const Router = () => {
    return (
        <AnimatePresence>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" replace/>} />
                    <Route path="/login" element={<AuthLogin />}/>
                    <Route path="/dashboard" element={
                      <PrivateLayout>
                        <MainLayout>
                          <Tables />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/changepassword" element={
                      <PrivateLayout>
                        <MainLayout>
                          <AuthChangePassword />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/updatedata" element={
                      <PrivateLayout>
                        <MainLayout>
                          <AuthUpdateData />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                    <Route path="/register" element={
                      <PrivateLayout>
                        <MainLayout>
                          <AuthRegisterData />
                        </MainLayout>
                      </PrivateLayout>
                    }/>
                </Routes>
            </Suspense>
        </AnimatePresence>
    );
};

export default Router;
