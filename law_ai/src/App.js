import React, { useEffect } from 'react'
import "./Vender"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes, useLocation, Outlet } from 'react-router-dom';
import Maintenance from './Pages/Utilities/MaintanancePage';
import ComingSoon from './Pages/Utilities/ComingSoon';
import Error404 from './Pages/Utilities/Error404.js';
import Error404WithoutHeaderFooter from './Componet/NotDefinedPage';
import { AuthWrapper } from './auth/AuthWrapper';
import ReactGA from "react-ga4";
import { useLayoutEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    const TRACKING_ID = process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID;
    ReactGA.initialize(TRACKING_ID);
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, [window?.location?.pathname]);
  
  


  const getUrl = (pathname) => {
    let pathArray = pathname.split('/');
    return `/${pathArray[1]}` === '/coming_soon'
      ? true
      : `/${pathArray[1]}` === '/maintenance'
        ? true
        : `/${pathArray[1]}` === '/error_404'
          ? true
          : `/${pathArray[1]}` === '*'
            ? true
            : false;
  };

  const scrollbarStyle = `
  ::-webkit-scrollbar {
    display: none;
  }`;

  useEffect(() => {
    const handlePopstate = () => {
      window.location.reload(); // Refresh the page on popstate event (back button)
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, [location.pathname]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {getUrl(location.pathname) ?
        <Routes>
          <Route path="/coming_soon" element={<ComingSoon />} />
          <Route path="/error_404" element={<Error404 />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="*" element={<Outlet />}>
            {/* Render the Error404 component without Header and Footer */}
            <Route index element={<Error404WithoutHeaderFooter />} />
          </Route>
        </Routes> :

        <div className="page-wrapper">
          <AuthWrapper />
        </div>
      }
    </>
  )
}

export default App

