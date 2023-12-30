import React from "react";
import UpdateDP from "../../components/Dashboard/MainComponents/Setting/UpdateDP";
import UpdatePersonalInfo from "../../components/Dashboard/MainComponents/Setting/UpdatePersonalInfo";
import ChangePassword from "../../components/Dashboard/MainComponents/Setting/ChangePassword";
import DeleteAccount from "../../components/Dashboard/MainComponents/Setting/DeleteAccount";

const Settings = () => {
  
  return (
    <div className="w-full max-h-[calc(100vh-4rem)] flex justify-center items-start overflow-y-auto ml-[60px] sm:ml-0 p-[5rem] sm:p-[6rem] xl:p-[8rem]">
      <div className="w-full lg:w-[800px] flex flex-col gap-4 sm:gap-8">
        <h1 className="text-2xl sm:text-4xl text-richblack-5 text-center my-8 sm:my-0 sm:text-left">Edit Profile</h1>
        <UpdateDP/>
        <UpdatePersonalInfo/>
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
