// import react core features
import React from "react";
import ReactDOM from "react-dom/client";

// import react-router-dom core features
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import css
import "./index.css";

// pages

// root page
import App from "./App";

// dashboard page
import Dashboard from "./pages/dashboardpage/Dashboard";

// openPage
import Home from "./pages/openPage/Home";
import Courses from "./pages/openPage/Courses";
import Contact from "./pages/openPage/Contact";
import About from "./pages/openPage/About";

// instructor page
import Instructor from "./pages/instructorPage/Instructor";
import MyCourses from "./pages/instructorPage/MyCourses";
import AddCourses from "./pages/instructorPage/AddCourses";

// student page
import EnrolledCourses from "./pages/studentPage/EnrolledCourses";
import ViewCourse from "./pages/studentPage/ViewCourse";
import Cart from "./pages/studentPage/Cart";

// page for logged users
import Profile from "./pages/pageForAllLoggedUser/Profile";
import Settings from "./pages/pageForAllLoggedUser/Settings";

// Error page (if any error occured)
import Error from "./pages/errorPage/Error";

// Authentication pages
import Login from "./pages/authPage/Login";
import Signup from "./pages/authPage/Signup";
import VerifyEmail from "./pages/authPage/VerifyEmail";
import ForgotPassword from "./pages/authPage/ForgotPassword";
import UpdatePassword from "./pages/authPage/UpdatePassword";

// Authorization pages
import PrivateRoute from "./authorization/PrivateRoute";
import RouteForStudents from "./authorization/RouteForStudents";
import RouteForInstructor from "./authorization/RouteForInstructor";
import CourseDetails from "./components/core/course/CourseDetails";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/courses/:category",
        element: <Courses />,
      },
      {
        path: "/courses/:category/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/update-password/:token",
        element: <UpdatePassword />,
      },
      {
        path: "/my-cart",
        element: (
          <RouteForStudents>
            <Cart />
          </RouteForStudents>
        ),
      },
      {
        path: "/view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
        element: (
          <RouteForStudents>
            <ViewCourse />
          </RouteForStudents>
        )
      },
      {
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard/my-profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/instructor",
            element: (
              <RouteForInstructor>
                <Instructor />
              </RouteForInstructor>
            ),
          },
          {
            path: "/dashboard/my-courses",
            element: (
              <RouteForInstructor>
                <MyCourses />
              </RouteForInstructor>
            ),
          },
          {
            path: "/dashboard/add-course",
            element: (
              <RouteForInstructor>
                <AddCourses />
              </RouteForInstructor>
            ),
          },
          {
            path: "/dashboard/enrolled-courses",
            element: (
              <RouteForStudents>
                <EnrolledCourses />
              </RouteForStudents>
            ),
          },
          {
            path: "/dashboard/settings",
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
);
