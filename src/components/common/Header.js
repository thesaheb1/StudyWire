// core react
import React, { useState, useEffect, useRef } from "react";

// header logo
import logo from "../../assets/Logo/logo.png";

// react-router-dom hooks and components
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";

// react-redux hooks
import { useDispatch, useSelector } from "react-redux";

// auth button
import AuthBtn from "../button/AuthBtn";

// logout Handler
import { logout } from "../../services/operations/authOperation";

// navbar Data
import { NavbarLinks } from "../../utils/data/navbar-links";

// icons
import { BsBagHeart } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import ConfirmationModal from "./ConfirmationModal";
import MenuLinks from "./MenuLinks";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { credentialData } = useSelector((state) => state.auth);
  const [dropdown, setDropDown] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [menu, setMenu] = useState(false);

  const ref = useRef();

  // route checker
  const MathRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const logoutHandler = () => {
    dispatch(logout(navigate));
    setShowModal(null);
  }

  // Onclick listener in useEffect
  useEffect(() => {
    const handleDropDown = (event) => {
      if (!(event?.target === ref?.current)) {
        setDropDown(false);
      }
    };

    window.addEventListener("click", handleDropDown);
    return () => {
      window.removeEventListener("click", handleDropDown);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <header className="w-screen fixed z-[999] h-[4rem] bg-richblack-900 text-white lg:text-xl border-b-[1px] border-richblack-700 flex justify-center items-center px-8">
      <nav className="w-full xl:w-4/5 2xl:w-2/3 flex justify-between items-center py-2 md:py-4">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[150px]" />
        </Link>
        <div className="hidden lg:block">
          <ul className="flex justify-center items-center gap-x-8">
            {NavbarLinks?.map((item) => {
              return (
                <Link to={item?.path} key={item?.id}>
                  <li
                    className={`${MathRoute(item?.path)
                      ? "text-yellow-50 cursor-pointer"
                      : "cursor-pointer"
                      }`}
                  >
                    {item?.title}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        {credentialData ? (
          <div className="relative flex justify-center items-center gap-x-4">
            {credentialData?.accountType === "Student" && (
              <Link
                to={"/my-cart"}
                className="text-[#12d7fad6] relative hover:text-[#12D8FA] cursor-pointer text-[1.7rem] mx-2 transition-all duration-200"
              >
                <FaCartShopping />
                <div className="w-[20px] aspect-square absolute -top-2 -right-2 flex justify-center items-center animate-bounce bg-yellow-50 rounded-full text-sm font-bold text-black">
                  9
                </div>
              </Link>
            )}
            <img
              onClick={() => {
                setDropDown(!dropdown);
              }}
              src={credentialData?.image}
              alt="profile"
              ref={ref}
              className={`${dropdown ? "border-richblack-100" : "border-transparent"
                }  " w-9 aspect-square rounded-full cursor-pointer border-2 hover:border-richblack-100  transition-all duration-200"`}
            />

            {dropdown && (
              <div className="absolute z-20 top-11 right-0 rounded-md w-[150px] bg-richblack-700 p-2">
                <ul className="flex flex-col justify-center items-start text-base text-richblack-100 font-semibold">
                  <Link
                    className="w-full"
                    onClick={() => setDropDown(false)}
                    to="/dashboard/my-profile"
                  >
                    <li className="cursor-pointer hover:bg-richblack-800 hover:text-richblack-5 rounded-md p-2 flex justify-start-start items-center gap-x-2 transition-all duration-200">
                      <span className="text-xl">
                        <VscAccount />
                      </span>{" "}
                      Dashboard
                    </li>
                  </Link>
                  {credentialData?.accountType === "Student" && <Link
                    className="w-full"
                    onClick={() => setDropDown(false)}
                    to="/wishlist"
                  >
                    <li className="cursor-pointer w-full hover:bg-richblack-800 hover:text-richblack-5 rounded-md p-2 flex justify-start-start items-center gap-x-2 transition-all duration-200">
                      <span className="text-xl">
                        <BsBagHeart />
                      </span>{" "}
                      Wishlist
                    </li>
                  </Link>}
                  <li
                    onClick={() =>
                      setShowModal({
                        btn1: "Logout",
                        btn2: "Cancel",
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Handler: () => logoutHandler(),
                        btn2Handler: () => setShowModal(null),
                      })
                    }
                    className="cursor-pointer w-full hover:bg-richblack-800 hover:text-richblack-5 rounded-md p-2 flex justify-start-start items-center gap-x-2 transition-all duration-200"
                  >
                    <span className="text-xl">
                      <ImExit />
                    </span>{" "}
                    Log out
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex justify-center items-center gap-x-4">
            {MathRoute("/login") ? (
              <Link to="/signup">
                <AuthBtn color={false} text={"Signup"} />
              </Link>
            ) : MathRoute("/signup") ? (
              <Link to="/login">
                <AuthBtn color={true} text={"Login"} />
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <AuthBtn color={true} text={"Login"} />
                </Link>{" "}
                <Link to="/signup">
                  <AuthBtn color={false} text={"Signup"} />
                </Link>
              </>
            )}
          </div>
        )}
        <div onClick={() => setMenu(!menu)} className="text-3xl text-yellow-50 cursor-pointer block lg:hidden">
          <FiMenu />
        </div>
      </nav>
      <div className={`transition-all duration-500 fixed top-[4rem] z-[99] right-0 ${menu ? "w-[200px]" : "w-0"} min-h-[calc(100vh-4rem)]  block bg-richblack-900 lg:hidden`}>
      <ul className="text-xl flex flex-col justify-start items-start gap-y-4 mt-8 min-w-[200px] overflow-x-hidden">
        {NavbarLinks?.map((item) => {
          return (
            <Link to={item?.path} key={item?.id}>
              <MenuLinks MathRoute={MathRoute} path={item?.path} title={item?.title} icon={item?.icon}/>
            </Link>
          );
        })}
        <div className="px-4 py-8 flex justify-center items-center gap-x-4">
          {MathRoute("/login") ? (
            <Link to="/signup">
              <AuthBtn color={false} text={"Signup"} />
            </Link>
          ) : MathRoute("/signup") ? (
            <Link to="/login">
              <AuthBtn color={true} text={"Login"} />
            </Link>
          ) : (
            <>
              <Link to="/login">
                <AuthBtn color={true} text={"Login"} />
              </Link>{" "}
              <Link to="/signup">
                <AuthBtn color={false} text={"Signup"} />
              </Link>
            </>
          )}
        </div>
      </ul>

    </div>
      { showModal && <ConfirmationModal modalData={showModal} /> }
    </header >
  );
};

export default Header;
