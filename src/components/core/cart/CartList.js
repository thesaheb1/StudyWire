import React from "react";
import { TiStarFullOutline } from "react-icons/ti"; 
import { TiStarHalfOutline } from "react-icons/ti"; 
import { TiStarOutline } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import ReactStars from "react-rating-stars-component";

const CartList = () => {
  return (
    <div className="w-fit pb-8 border-b-[1px] border-richblack-700">
      <div className="flex gap-x-4">
        <img
          className="rounded-lg w-[250px] aspect-video"
          src="https://thecodex.me/static/5c02153876c8f9c5740350364990a18a/ee604/Java_Thumbnail_java_875e0d6a31.png"
          alt=""
        />
        <div className="w-[300px] flex flex-col justify-between items-start">
          <h2 className="text-lg font-medium">
            The Complete JAVA Bootcamp From Zero to Hero in Python
          </h2>
          <p className="text-richblack-300 font-medium">
            by - <span className="gradient">SAHEB</span>
          </p>
          <p className="text-richblack-400 font-medium flex justify-start items-center gap-x-4">
          <span className="text-yellow-50 text-base font-bold pt-1">4.5</span>
            <ReactStars
              count={5}
              value={4.5}
              edit={false}
              size={24}
              color="#585D69"
              activeColor="#FFD60A"
              isHalf={true}
              emptyIcon={<TiStarOutline />}
              halfIcon={<TiStarHalfOutline />}
              fullIcon={<TiStarFullOutline />}
            />{" "}
            <span className="pt-1">(20 Ratings)</span>
          </p>
          <p className="text-richblack-300 font-medium">
            Total Courses • Lesson • Beginner
          </p>
        </div>
        <div>
          <div className="flex justify-center items-center gap-x-2 px-4 py-3 rounded-lg border-2 border-pink-200 bg-pink-200/20 cursor-pointer hover:bg-pink-200/30 transition-all duration-200">
            <div className="text-pink-200 text-xl font-bold">
              <RiDeleteBin6Line />
            </div>
            <p className="text-pink-200 text-base font-medium">Remove</p>
          </div>
          <p className="mt-8 text-3xl font-bold text-yellow-50">Rs 1,500</p>
        </div>
      </div>
    </div>
  );
};

export default CartList;
