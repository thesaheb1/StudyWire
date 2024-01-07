import { AiOutlineSetting } from "react-icons/ai"; 
import { FiMenu } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { ImExit } from "react-icons/im";
import ConfirmationModal from "../../common/ConfirmationModal";
import { sidebarLinks } from "../../../utils/data/dashboard-links";
import SidebarLinks from "./SidebarLinks";
import { useSelector } from "react-redux";
import { logout } from "../../../services/operations/authOperation";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(null);
  const { credentialData } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hideAsideBar, setHideAsideBar] = useState(true);

  const MatchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const logoutHandler = () => {
    dispatch(logout(navigate));
    setShowModal(null);
  }

  const asideRef = useRef();

 
  // Onclick listener in useEffect
  useEffect(() => {

    const handleaAside = (event) => {
      if (!(event?.target === asideRef?.current)) {
        setHideAsideBar(false);
      }
    };

    window.addEventListener("click", handleaAside);
    return () => {
      window.removeEventListener("click", handleaAside);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="absolute z-[9] sm:static min-w-fit min-h-[calc(100vh-4rem)] border-r-[1px] bg-richblack-900 border-richblack-600">
      <div className="w-full p-4 flex justify-end text-yellow-50 text-2xl"><div ref={asideRef} onClick={() => setHideAsideBar(!hideAsideBar)} className="min-w-fit cursor-pointer"><FiMenu className="pointer-events-none" /></div></div>
      {<div className="flex flex-col justify-center items-start py-8">
        {sidebarLinks.map((sidelink) => {
          return sidelink?.name === "My Profile" ? (
            <SidebarLinks key={sidelink?.id} {...sidelink} hideAsideBar={hideAsideBar} />
          ) : (
            credentialData?.accountType === sidelink?.type && (
              <SidebarLinks key={sidelink?.id} {...sidelink} hideAsideBar={hideAsideBar} />
            )
          );
        })}
      </div>}
      <div className="flex flex-col justify-center items-start">
        <div className="w-[80%] mx-auto h-[1px] border-t-[1px] mb-8 border-richblack-600"></div>
        <Link
          to="/dashboard/settings"
          className={`${MatchRoute("/dashboard/settings") &&
            "bg-yellow-700 text-yellow-50 border-yellow-50"
            } text-richblack-200 text-base font-medium flex justify-start items-center gap-x-2 border-l-4 border-transparent py-2  ${hideAsideBar ? "px-8" : "px-4"} w-full`}
        >
          <span className="text-xl">
          <AiOutlineSetting />
          </span>
          {hideAsideBar && "Settings"}
        </Link>
        <button
          onClick={() => setShowModal({
            btn1: "Logout",
            btn2: "Cancel",
            text1: "Are you sure?",
            text2: "You will be logged out of your account.",
            btn1Handler: () => logoutHandler(),
            btn2Handler: () => setShowModal(null),
          })}
          className={`text-richblack-200 text-base font-medium flex justify-start items-center gap-x-2 border-l-4 border-transparent py-2 ${hideAsideBar ? "px-8" : "px-4"} w-full`}
        >
          <span className="text-xl">
            <ImExit />
          </span>
          {hideAsideBar && "Logout"}
        </button>
      </div>
      {showModal && <ConfirmationModal modalData={showModal} />}
    </div>
  );
};

export default Sidebar;
