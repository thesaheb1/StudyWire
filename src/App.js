// import core features
import React from "react";

// import css
import "./app.css";

// import redux store and provider
import store from "./redux/store/store";
import { Provider } from "react-redux";

// import components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

// import outlet for child components
import { Outlet } from "react-router-dom";

// import toaster for notifications
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App w-screen min-h-[calc(100vh-5rem)] bg-richblack-900">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <Toaster />
    </Provider>
  );
};

export default App;
