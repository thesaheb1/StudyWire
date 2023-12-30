import { GrDocumentUpdate } from "react-icons/gr";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import countrycode from "../../../../utils/data/countrycode.json";
import { updateprofile } from "../../../../services/operations/profileOperation";
import { useForm } from "react-hook-form";

const UpdatePersonalInfo = () => {
  const dispatch = useDispatch();
  const { credentialData, token } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitHandler = (data) => {

    dispatch(updateprofile(data, token, credentialData));
  };

  return (
    <div className="flex justify-between items-start p-4 sm:p-8 border-[1px] border-richblack-700 bg-richblack-800 rounded-md">
      <div className="w-full">
        <p className="text-2xl font-medium text-richblack-5 pb-8">
          Profile Information
        </p>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className="w-full flex flex-col justify-center items-end gap-8"
        >
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <label htmlFor="firstName" className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                First Name <sup className="text-pink-600">*</sup>
              </p>
              <input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={credentialData?.firstName}
                placeholder="Enter first name"
                {...register("firstName", {
                  required: { value: true, message: "FirstName is required" },
                  maxLength: { value: 35, message: "Length is Exceeded" },
                })}
                className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
              />
              {errors?.firstName && (
                <span className="text-pink-300">
                  {errors?.firstName?.message}
                </span>
              )}
            </label>
            <label htmlFor="lastName" className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Last Name
              </p>
              <input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={credentialData?.lastName}
                placeholder="Add LastName"
                {...register("lastName", {
                  maxLength: { value: 35, message: "Length is Exceeded" },
                })}
                className="bg-richblack-700 border-b-[1px] border-richblack-200 placeholder:text-gray-400 placeholder:text-opacity-80  rounded-[0.5rem] text-richblack-5 w-full  p-[12px]"
              />
              {errors?.lastName && (
                <span className="text-pink-300">{errors?.lastName}</span>
              )}
            </label>
          </div>
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <label htmlFor="dateOfBirth" className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Date of Birth
              </p>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                defaultValue={credentialData?.additionalDetails?.dateOfBirth}
                {...register("dateOfBirth", {
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
              />
              {errors.dateOfBirth && (
                <span className="text-pink-300">
                  {errors?.dateOfBirth?.message}
                </span>
              )}
            </label>
            <div className="w-full">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Gender
              </p>
              <div className="flex justify-between items-center bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] px-2 sm:px-8  py-[12px]">
                <label
                  htmlFor="Male"
                  className="cursor-pointer flex justify-center items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="Male"
                    value="Male"
                    defaultChecked={credentialData?.additionalDetails?.gender === "Male"}
                    {...register("gender")}
                    className="cursor-pointer"
                  />

                  <p className="text-xs sm:text-[0.875rem] text-richblack-5 leading-[1.375rem]">
                    Male
                  </p>
                </label>
                <label
                  htmlFor="Female"
                  className="cursor-pointer flex justify-center items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="Female"
                    value="Female"
                    defaultChecked={credentialData?.additionalDetails?.gender === "Female"}
                    {...register("gender")}
                    className="cursor-pointer"
                  />

                  <p className="text-xs sm:text-[0.875rem] text-richblack-5 leading-[1.375rem]">
                    Female
                  </p>
                </label>
                <label
                  htmlFor="Other"
                  className="cursor-pointer flex justify-center items-center gap-x-3"
                >
                  <input
                    type="radio"
                    name="gender"
                    id="Other"
                    value="Other"
                    defaultChecked={credentialData?.additionalDetails?.gender === "Other"}
                    {...register("gender")}
                    className="cursor-pointer"
                  />

                  <p className="text-xs sm:text-[0.875rem] text-richblack-5 leading-[1.375rem]">
                    Other
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-8">
            <div className="w-full md:w-[50%] flex justify-between items-center gap-x-4">
              <div>
                <label htmlFor="country">
                  <p className="text-[0.8rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Country
                  </p>
                </label>
                <select
                  name="country"
                  id="country"
                  defaultValue={credentialData?.additionalDetails?.country}
                  {...register("country")}
                  className="w-[70px] bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 py-[12px] px-2"
                >
                  {countrycode.map((country, index) => (
                    <option key={index} value={country?.code}>
                      {country?.code + " " + country?.country}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="phoneNumber" className="w-[calc(100%-60px)]">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                  Contact Number
                </p>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  defaultValue={credentialData?.additionalDetails?.phoneNumber}
                  placeholder="Add Contact Number"
                  {...register("phoneNumber")}
                  className="w-full bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 p-[12px]"
                />
              </label>
            </div>
            <label htmlFor="about" className="w-full md:w-[50%]">
              <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                Bio
              </p>
              <input
                type="text"
                name="about"
                id="about"
                defaultValue={credentialData?.additionalDetails?.about}
                placeholder="Add Your Bio"
                {...register("about", {
                  max: { value: 200, message: "Length is exceeded" },
                })}
                className="bg-richblack-700 border-b-[1px] border-richblack-200 placeholder:text-gray-400 placeholder:text-opacity-80  rounded-[0.5rem] text-richblack-5 w-full  p-[12px]"
              />
              {errors?.Bio && (
                <span className="text-pink-300">{errors?.Bio?.message}</span>
              )}
            </label>
          </div>
          <div className="w-full flex justify-end items-center flex-wrap-reverse gap-4 mt-4">
            <Link
              to="/dashboard/my-profile"
              className="text-richblack-100 w-fit flex justify-center items-center gap-x-2 sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium bg-richblack-700"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="text-black w-fit flex justify-center items-center gap-x-2 sm:text-lg px-2 py-1 sm:px-4 sm:py-2 rounded-md font-medium bg-yellow-50"
            >
              Update Profile <GrDocumentUpdate />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePersonalInfo;
