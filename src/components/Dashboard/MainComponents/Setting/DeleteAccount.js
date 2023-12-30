import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteuser } from "../../../../services/operations/profileOperation";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = () => {
    dispatch(deleteuser(token, navigate))
  }

  return (
    <div className="flex justify-between items-center gap-4 p-4 sm:p-8 border-[1px] border-pink-700 bg-pink-900 rounded-md my-8">
      <div className="text-pink-200 text-2xl p-4 bg-pink-200/50 rounded-full hidden sm:block">
        <RiDeleteBin6Line />
      </div>
      <div>
        <h2 className="text-2xl text-pink-5 font-medium mb-2">
          Delete Account
        </h2>
        <p className="text-pink-25">Would you like to delete account?</p>
        <p className="text-pink-25">
          This account contains Paid Courses. Deleting your account will remove
          all the contain associated with it.
        </p>
        <div>
        <button onClick={clickHandler} className="w-fit text-sm text-pink-300 font-inter italic border-2 border-pink-700 py-2 px-4 rounded-full mt-4 hover:bg-pink-400 hover:text-pink-25 transition-all duration-200 cursor-pointer">
          I want to delete my account.
        </button>

        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
