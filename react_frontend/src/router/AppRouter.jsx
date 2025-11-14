import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/common/Loader';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ApiExplorer = lazy(() => import('../pages/ApiExplorer'));
const About = lazy(() => import('../pages/About'));
const NotFound = lazy(() => import('../pages/NotFound'));

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Declares application routes */
  return (
    <Suspense fallback={<Loader label="Loading page..." />}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explorer" element={<ApiExplorer />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
