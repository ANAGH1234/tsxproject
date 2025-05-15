import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './shared/Layout';
import '@fortawesome/fontawesome-free/css/all.min.css';

// // Lazy-loaded components
// const MeetingLayout = lazy(() => import('./shared/MeetingLayout'));
// const VideoLayout = lazy(() => import('./shared/VideoLayout'));
// const TestLayout = lazy(() => import('./shared/TestLayout'));

// Define the component
const App: React.FC = () => {
 
  return (
    <Routes>
      {/* <Route
        path="/user/app/meeting/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <MeetingLayout />
          </Suspense>
        }
      />
      <Route
        path="/user/app/videos/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <VideoLayout />
          </Suspense>
        }
      />
      <Route
        path="/user/app/test/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <TestLayout />
          </Suspense>
        }
      />
      <Route
        path="/user/app/scholarship/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <TestLayout />
          </Suspense>
        }
      />
      <Route
        path="/user/app/skill/*"
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <TestLayout />
          </Suspense>
        }
      /> */}
      <Route path="/user/app/*" element={<Layout />} />
    </Routes>
  );
};

export default App;



