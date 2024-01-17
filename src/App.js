// import core features
import React, { useEffect } from "react";

// import css
import "./app.css";

// import components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// import outlet for child components
import { Outlet, useNavigate } from "react-router-dom";

// import toaster for notifications
import { getUserDetails } from "./services/operations/profileOperation";
import { useDispatch } from "react-redux";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token")
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App w-screen min-h-[calc(100vh-5rem)] bg-richblack-900">
      <Header />
      <Outlet />
      <Footer />
    </div>

  );
};

export default App;
