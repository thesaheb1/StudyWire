import React from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarHalfOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ _id, thumbnail, courseName, instructor, price, tags }) => {
  const navigate = useNavigate();
  return (
      <div onClick={() => navigate(_id)} className="flex flex-col justify-between bg-richblack-500/30 border-[1px] border-richblack-700 rounded-lg cursor-pointer hover:shadow-[rgba(255,255,255,0.2)_10px_10px_10px_0px] hover:scale-105 transition-all duration-200">
        <img
          className="rounded-lg w-full aspect-video pb-2"
          src={thumbnail}
          alt=""
        />
        <div className="px-4">
          <h2 className="text-xl font-medium text-richblack-5">{courseName}</h2>
          <div className="flex justify-start items-center flex-wrap gap-4 mt-4 overflow-x-auto">
            {tags.map((tag, index) => (
              <div key={index} className="text-richblack-100 py-2 px-4 w-fit bg-richblack-500/40 text-xs font-bold rounded-lg">
                {tag}
              </div>
            ))}
          </div>
        </div>
        <p className="mx-4  mb-2 mt-4 text-lg text-caribbeangreen-50 font-medium">
          instructor :{" "}
          <span className="gradient">
            {instructor?.firstName.toUpperCase()}{" "}
            {instructor?.lastName.toUpperCase()}
          </span>
        </p>
        <div className="text-richblack-400 font-medium flex justify-start items-center gap-x-4 px-4 pb-2">
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
        </div>

        <div className="w-full flex justify-between items-center px-4 py-4 rounded-b-lg">
          <p className="text-xl text-richblack-5/70 font-medium">Price</p>
          <p className="text-xl text-caribbeangreen-50 font-bold">₹ {price}</p>
        </div>
      </div>
  );
};

export default CourseCard;
