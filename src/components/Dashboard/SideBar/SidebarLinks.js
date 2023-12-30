import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import * as Icons from "react-icons/vsc";


const SidebarLinks = ({ name, path, icon, hideAsideBar }) => {
  const Icon = Icons[icon];
  const location = useLocation();
  const MatchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <Link
      to={path}
      className={`${MatchRoute(path) && "bg-yellow-700 text-yellow-50 border-yellow-50" } text-richblack-100 text-base font-medium flex justify-start items-center gap-x-2 border-l-4 border-transparent py-2 ${hideAsideBar ? "px-8" : "px-4"}  w-full`}
    >
      <span className="text-xl">
        <Icon />
      </span>
      {hideAsideBar && name}
    </Link>
  );
};

export default SidebarLinks;
