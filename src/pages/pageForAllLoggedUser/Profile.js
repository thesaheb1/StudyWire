import React from "react";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { credentialData } = useSelector((state) => state.auth);
  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex justify-center items-start overflow-y-auto ml-[60px] sm:ml-0 p-4 sm:p-8 xl:p-16">
      <div className="w-full lg:w-[800px] flex flex-col gap-4 sm:gap-8">
        <h1 className="text-2xl sm:text-4xl text-richblack-5 text-center my-8 sm:my-0 sm:text-left">My Profile</h1>
        <div className="p-4 sm:p-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md">
          <div className="flex justify-between items-start gap-8">
            <img
              src={credentialData?.image}
              className="w-[75px] aspect-square rounded-full"
              alt=""
            />
            <Link
              to="/dashboard/settings"
              className="text-black w-fit flex justify-center items-center text-lg px-4 py-2 rounded-md font-medium bg-yellow-50"
            >
              Edit <BiEdit />
            </Link>
          </div>

          <div className="flex flex-col justify-center items-start gap-y-2 mt-4">
            <p className="text-2xl font-medium text-richblack-5">
              {credentialData?.firstName + " " + credentialData?.lastName}
            </p>
            <p className="text-base font-medium text-richblack-300">
              {credentialData?.email}
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md">
          <div className="flex justify-between items-start gap-x-4">
            <p className="text-2xl font-medium text-richblack-5">About</p>
            <Link
              to="/dashboard/settings"
              className="text-black w-fit flex justify-center items-center text-lg px-4 py-2 rounded-md font-medium bg-yellow-50"
            >
              Edit <BiEdit />
            </Link>
          </div>
          <p className="text-base font-medium text-richblack-400 flex justify-start items-center flex-wrap break-words mt-4">
            {credentialData?.additionalDetails?.about
              ? credentialData?.additionalDetails?.about
              : "Write something about yourself"}
          </p>
        </div>
        <div className="p-4 sm:p-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md">
          <div className="w-full flex justify-between items-start gap-x-4">
            <p className="text-2xl font-medium text-richblack-5">
              Personal Details
            </p>
            <Link
              to="/dashboard/settings"
              className="text-black w-fit flex justify-center items-center text-lg px-4 py-2 rounded-md font-medium bg-yellow-50"
            >
              Edit <BiEdit />
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-y-8">
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
              <div className="w-full sm:w-1/2">
                <p className="text-sm font-medium text-richblack-400">
                  First Name
                </p>
                <p className="text-lg font-medium text-richblack-5">
                  {credentialData?.firstName}
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <p className="text-sm font-medium text-richblack-400">
                  Last Name
                </p>
                <p className="text-lg font-medium text-richblack-5">
                  {credentialData?.lastName || (
                    <span className="text-base font-medium text-richblack-100">
                      Add lastname
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
              <div className="w-full sm:w-1/2">
                <p className="text-sm font-medium text-richblack-400 text-left">
                  Email
                </p>
                <p className="text-lg font-medium text-richblack-5">
                  {credentialData?.email}
                </p>
              </div>
              <div className="w-full sm:w-1/2">
                <p className="text-sm font-medium text-richblack-400 text-left">
                  Phone Number
                </p>
                <p className="text-lg font-medium text-richblack-5">
                  {credentialData?.additionalDetails?.phoneNumber || (
                    <span className="text-base font-medium text-richblack-100">
                      Add Contact Number
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
              <div className="w-full sm:w-1/2">
              <p className="text-sm font-medium text-richblack-400 text-left">
                  Gender
                </p>
                <p className="text-lg font-medium text-richblack-5">
                  {credentialData?.additionalDetails?.gender || (
                    <span className="text-base font-medium text-richblack-100">
                      Add gender
                    </span>
                  )}
                </p>
              </div>
              <div className="w-full sm:w-1/2">
              <p className="text-sm font-medium text-richblack-400 text-left">
                  Date Of Birth
                </p>
                <p className="text-lg font-medium text-richblack-5">
                  {credentialData?.additionalDetails?.dateOfBirth || (
                    <span className="text-base font-medium text-richblack-100">
                      Add Date Of Birth
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
