import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Loader from './component/Loader/Loader';
import MainLayout from './layout/MainLayout';
import PrivateLayout from "./layout/PrivateLayout";

const AuthLogin = lazy(() => import('./views/Login'));

const AuthChangePassword = lazy(() => import('./views/ChangePassword'));

const AuthUpdateData = lazy(() => import('./views/UpdateData'))

const AuthRegisterData = lazy(() => import('./views/Register'))

const TableBasic = lazy(() => import('./views/Tables'));

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
                          <TableBasic />
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
