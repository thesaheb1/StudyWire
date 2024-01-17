import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../redux/feature/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CartList = ({ data, index }) => {
  const {totalItems} = useSelector(state => state.cart)
  const dispatch = useDispatch();
  return (
    <div className={`w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-8 ${!(index === totalItems - 1) && "border-b-[1px] border-richblack-700"} `}>
        <div className="w-full flex justify-between lg:justify-start gap-x-4">
          <img
            className="rounded-lg w-full sm:w-auto sm:max-h-[100px] aspect-video"
            src={data?.thumbnail}
            alt="courseImg"
          />
          <div className="hidden sm:block lg:hidden">
          <button onClick={() => dispatch(removeFromCart(data?._id))} className="flex justify-center items-center gap-x-2 px-2 py-1 rounded-lg border-2 border-pink-200 bg-pink-200/20 hover:bg-pink-200/30 transition-all duration-200">
            <div className="text-pink-200 text-lg font-bold">
              <RiDeleteBin6Line />
            </div>
            <p className="text-pink-200 text-base font-medium">Remove</p>
          </button>
          <p className="mt-4 lg:mt-8 text-2xl font-bold text-yellow-50">Rs {data?.price}</p>
        </div>
          <div className="hidden lg:flex flex-col justify-start items-start">
            <h2 className="text-lg font-medium">
              {data?.courseName}
            </h2>
            <p className="text-richblack-200 text-base py-2">{data?.courseDescription?.slice(0, 50)}...</p>
            <p className="text-richblack-50 font-medium">
              by - <span className="gradient">{data?.instructor?.firstName} {data?.instructor?.lastName}</span>
            </p>
          </div>
        </div>
        <div className="lg:hidden flex flex-col justify-start items-start">
            <h2 className="text-lg font-medium">
              {data?.courseName}
            </h2>
            <p className="text-richblack-200 text-base py-2">{data?.courseDescription?.slice(0, 50)}...</p>
            <p className="text-richblack-50 font-medium">
              by - <span className="gradient">{data?.instructor?.firstName} {data?.instructor?.lastName}</span>
            </p>
          </div>
        <div className="w-full flex flex-row-reverse justify-between items-baseline sm:w-fit sm:hidden lg:block">
          <button onClick={() => dispatch(removeFromCart(data?._id))} className="flex justify-center items-center gap-x-2 px-2 py-1 rounded-lg border-2 border-pink-200 bg-pink-200/20 hover:bg-pink-200/30 transition-all duration-200">
            <div className="text-pink-200 text-lg font-bold">
              <RiDeleteBin6Line />
            </div>
            <p className="text-pink-200 text-base font-medium">Remove</p>
          </button>
          <p className="mt-8 text-2xl font-bold text-yellow-50">Rs {data?.price}</p>
        </div>
    </div>
  );
};

export default CartList;
