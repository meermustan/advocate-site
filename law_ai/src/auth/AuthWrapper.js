import React, { useState, useEffect } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import HomePage from "../defaultPages/HomePage";
import Login from "../defaultPages/Login/Login";
import SignupClient from "../defaultPages/Signup/SignupClient";
import SignupLawyer from "../defaultPages/Signup/SignupLawyer";
import AboutUs from "../Pages/Company/AboutUs";
import BlogListing1 from "../Pages/Blog/BlogListing1";
import BlogSingle from "../Pages/Blog/BlogSingle";
import Contact1 from "../Pages/Contact/Contact1";
import Forgotpassword from "../defaultPages/ForgetPassword";
import FAQ from "../Pages/Utilities/FaqPage";
import Landing4 from "../Pages/Home/Landing4/Langing4";
import Header1 from "../Layout/Header/Header1";
import Error404 from "../Pages/Utilities/Error404.js";
import Footer1 from "../Layout/Footer/Footer1";
import Cases from "../Pages/Cases/Cases";
import SendProposal from "../Pages/Lawyer/Proposals/SendProposal";
import CaseProposals from "../Pages/Client/Cases/CaseProposals";

import Messages from "../Pages/Messages/Messages";
import Lawyers from "../Pages/Lawyer/Lawyers";
import LawyerProposals from "../Pages/Lawyer/Proposals/Proposals";
import LawyerProfile from "../Pages/Lawyer/Profile/Profile";

import ClientProfile from "../Pages/Client/Profile/Profile";
import ClientCases from "../Pages/Client/Cases/ClientCases";

import { CookiesProvider, useCookies } from "react-cookie";
import ClientLanding from "../Pages/Home/Landing4/ClientLanding";
import LawyerLanding from "../Pages/Home/Landing4/LawyerLanding";
import ClientDashboard from "../Pages/caseDashboard/clientDashboard";
import LawyerDashboard from "../Pages/caseDashboard/lawyerDashboard";
import CreateContract from "../Pages/Client/CreateContract";
import ContractDetails from "../Pages/Client/ContractDetails";
import Notification from "../Pages/notification/notification";
import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  setUnSeen,
  setNotifications,
  addNotification,
} from "../store/reducer/notificationReducer.js";
import {
  setChats,
  setActiveChat,
  addMessage,
} from "../store/reducer/chatReducer.js";
import { toast } from "react-toastify";
import Pricing from "../Pages/Utilities/PricingPage.js";

import { Admin, LawyerVerification } from "../Pages/Admin/index.js";

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const AuthWrapper = () => {
  const api_url = process.env.REACT_APP_API_URL;
  const socket_url = process.env.REACT_APP_SOCKET_URL;
  const socket = socketIOClient(socket_url);
  const dispatch = useDispatch();
  const [authState] = useCookies(["myAuthUser"]);
  const [loader, setLoader] = useState(true);

  const ClientRoutes = () => {
    return authState.myAuthUser && authState.myAuthUser.type === "client" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  };

  const LawyerRoutes = () => {
    return authState.myAuthUser && authState.myAuthUser.type === "lawyer" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  };

  const AdminRoutes = () => {
    return authState.myAuthUser && authState.myAuthUser.type === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" />
    );
  };

  const NoAuthRoutes = () => {
    return authState.myAuthUser ? <Navigate to="/" /> : <Outlet />;
    // authState.myAuthUser && authState.myAuthUser.type === "lawyer" ? <Navigate to='/' /> : authState.myAuthUser && authState.myAuthUser.type === "client" ? <Navigate to='/' /> : <Outlet />
  };

  const AuthRoutes = () => {
    return authState.myAuthUser ? <Outlet /> : <Navigate to="/" />;
  };

  const fetchData = async () => {
    if (!authState?.myAuthUser) return;
    const result = await fetch(`${api_url}/chat/init`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authState?.myAuthUser?.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await result.json();
    if (result.status === 200) {
      const unSeen = response.notifications.filter((obj) => !obj.isSeen);
      const notifications = response.notifications.reverse();
      dispatch(
        setNotifications({
          notifications,
          unSeen: unSeen.length,
        })
      );
      const chats = response.chats.reverse();
      dispatch(setChats(chats));
      dispatch(
        setActiveChat({
          chatId: chats[0]?._id,
          type: authState?.myAuthUser?.type,
        })
      );
    } else {
      toast.error(response.resultMessage.en, toastConfig);
    }
  };

  const loadSockets = () => {
    if (authState?.myAuthUser) {
      socket.emit("user-connected", authState?.myAuthUser?._id);
      socket.on("notification", (data) => {
        dispatch(addNotification(data));
        dispatch(setUnSeen(1));
      });
      socket.on("message", (newMessage) => {
        dispatch(addMessage(newMessage));
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
      loadSockets();
      fetchData();
    }, 1000);
  }, []);

  return (
    <>
      {loader ? (
        <div id="ht-preloader">
          <div className="loader clear-loader">
            <img
              className="img-fluid"
              src={require("../assets/images/logo.png")}
            />
          </div>
        </div>
      ) : (
        <CookiesProvider defaultSetCookies={{ path: "/" }}>
          <Header1 user={authState.myAuthUser} />
          <Routes>
            <Route
              path="/"
              element={
                authState.myAuthUser &&
                authState.myAuthUser.type === "client" ? (
                  <ClientLanding />
                ) : authState.myAuthUser &&
                  authState.myAuthUser.type === "lawyer" ? (
                  <LawyerLanding />
                ) : authState.myAuthUser &&
                  authState.myAuthUser.type === "admin" ? (
                  <Navigate to="/admin" />
                ) : (
                  <Landing4 />
                )
              }
            />

            <Route
              path="/case-dashboard"
              element={
                authState.myAuthUser &&
                authState.myAuthUser.type === "client" ? (
                  <ClientDashboard />
                ) : authState.myAuthUser &&
                  authState.myAuthUser.type === "lawyer" ? (
                  <LawyerDashboard />
                ) : (
                  <Landing4 />
                )
              }
            />

            {/* protected routes for both clients and layers */}
            <Route element={<AuthRoutes />}>
              <Route path="/contract-details" element={<ContractDetails />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notification />} />
            </Route>

            {/* protected routes for clients */}
            <Route element={<ClientRoutes />}>
              <Route path="/lawyers" element={<Lawyers />} />
              <Route path="/client-profile" element={<ClientProfile />} />
              <Route path="/client-cases" element={<ClientCases />} />
              <Route path="/case-proposals" element={<CaseProposals />} />
              <Route path="/create-contract" element={<CreateContract />} />
            </Route>
            {/* protected routes for layers */}
            <Route element={<LawyerRoutes />}>
              <Route path="/cases" element={<Cases />} />
              <Route path="/lawyer-profile" element={<LawyerProfile />} />
              <Route path="/proposals" element={<LawyerProposals />} />
              <Route path="/send-proposal" element={<SendProposal />} />
            </Route>
            {/* Admin routes */}
            <Route path="/admin" element={<AdminRoutes />}>
              <Route index element={<Admin />} />
              <Route path="lawyer-verification" element={<LawyerVerification />} />
            </Route>
            <Route element={<NoAuthRoutes />}>
              <Route path="/login" element={<Login />} />
              <Route path="/client/sign-up" element={<SignupClient />} />
              <Route path="/lawyer/sign-up" element={<SignupLawyer />} />
              <Route path="/forgot-password" element={<Forgotpassword />} />
            </Route>
            {/* new routes */}
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blogs" element={<BlogListing1 />} />
            <Route path="/blog-single" element={<BlogSingle />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<Contact1 />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
          <Footer1 />
        </CookiesProvider>
      )}
    </>
  );
};
