import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiCurrencyRupee } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

import {
  fetchAllCoursecategories,
  createCourse,
  updateCourse,
} from "../../../../services/operations/courseOperation";
import ChipInput from "./ChipInput";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import InstructionField from "./InstructionField";
import { COURSE_STATUS } from "../../../../utils/data/constants";
import {
  setCreatedCourse,
  setStep,
} from "../../../../redux/feature/courseCreationSlice";
import toast from "react-hot-toast";

const CourseCreater = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { createdCourse, editCreatedCourse } = useSelector(
    (state) => state.courseCreation
  );

  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [instructions, setInstructions] = useState([]);

  // check is form updated
  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseName !== createdCourse?.courseName ||
      currentValues.courseDescription !== createdCourse?.courseDescription ||
      currentValues.courseLanguage !== createdCourse?.courseLanguage ||
      currentValues.price !== createdCourse?.price ||
      currentValues.tags.toString() !== createdCourse?.tags?.toString() ||
      currentValues.whatYouWillLearn !== createdCourse?.whatYouWillLearn ||
      currentValues.category !== createdCourse?.category ||
      currentValues.instructions.toString() !==
      createdCourse?.instructions?.toString() ||
      currentValues.thumbnail !== createdCourse?.thumbnail
    ) {
      return true;
    }
    return false;
  };

  // submit Handler
  const SubmitHandler = async (data) => {
    // update course
    if (editCreatedCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log(data)
        formData.append("courseId", createdCourse?._id);

        if (currentValues.courseName !== createdCourse?.courseName) {
          formData.append("courseName", data?.courseName);
        }
        if (
          currentValues.courseDescription !== createdCourse?.courseDescription
        ) {
          formData.append("courseDescription", data?.courseDescription);
        }
        if (currentValues.courseLanguage !== createdCourse?.courseLanguage) {
          formData.append("courseLanguage", data?.courseLanguage);
        }
        if (currentValues.price !== createdCourse?.price) {
          formData.append("price", data?.price);
        }
        if (currentValues.tags.toString() !== createdCourse?.tags?.toString()) {
          formData.append("tags", JSON.stringify(data?.tags));
        }
        if (
          currentValues.whatYouWillLearn !== createdCourse?.whatYouWillLearn
        ) {
          formData.append("whatYouWillLearn", data?.whatYouWillLearn);
        }
        if (currentValues.category !== createdCourse?.category) {
          formData.append("category", data?.category);
        }
        if (
          currentValues.instructions.toString() !==
          createdCourse?.instructions?.toString()
        ) {
          formData.append("instructions", JSON.stringify(data?.instructions));
        }
        if (currentValues.thumbnail !== createdCourse?.thumbnail) {
          formData.append("thumbnail", data?.thumbnail);
        }
        setLoading(true);

        const result = await updateCourse(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCreatedCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    // create course
    const formData = new FormData();
    formData.append("courseName", data?.courseName);
    formData.append("courseDescription", data?.courseDescription);
    formData.append("courseLanguage", data?.courseLanguage);
    formData.append("price", data?.price);
    formData.append("category", data?.category);
    formData.append("tags", JSON.stringify(data?.tags));
    formData.append("thumbnail", data?.thumbnail);
    formData.append("whatYouWillLearn", data?.whatYouWillLearn);
    formData.append("instructions", JSON.stringify(data?.instructions));
    formData.append("status", COURSE_STATUS.DRAFT);

    const result = await createCourse(formData, token);
    if (result) {
      dispatch(setCreatedCourse(result));
      dispatch(setStep(2));
    }
  };

  useEffect(() => {

    // fetch categories
    ; (async () => {
      setLoading(true);
      const categories = await fetchAllCoursecategories();
      if (categories.length > 0) {
        setAllCategories(categories);
      }
      setLoading(false);
    })()

    // if form is in edit mode
    if (editCreatedCourse) {
      setValue("courseName", createdCourse.courseName);
      setValue("courseDescription", createdCourse.courseDescription);
      setValue("courseLanguage", createdCourse.courseLanguage);
      setValue("price", createdCourse.price);
      setValue("tags", createdCourse.tags);
      setValue("whatYouWillLearn", createdCourse.whatYouWillLearn);
      setValue("courseCategory", createdCourse.category);
      setValue("instructions", createdCourse.instructions);
      setValue("thumbnail", createdCourse.thumbnail);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-6 my-10">
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div className="flex flex-col gap-10">
          <label htmlFor="courseName" className="w-full">
            <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
              Course Name <sup className="text-pink-600">*</sup>
            </p>
            <input
              type="text"
              id="courseName"
              placeholder="Enter Course name"
              {...register("courseName", {
                required: { value: true, message: "Name is required" },
              })}
              className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            {errors?.courseName && (
              <span className="text-pink-300">
                {errors?.courseName?.message}
              </span>
            )}
          </label>
          <label htmlFor="courseDescription" className="w-full">
            <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
              Course Description <sup className="text-pink-600">*</sup>
            </p>
            <textarea
              id="courseDescription"
              placeholder="Enter Course Description"
              {...register("courseDescription", {
                required: {
                  value: true,
                  message: "Description is required",
                },
              })}
              className="bg-richblack-700 min-h-[150px] border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            {errors?.courseDescription && (
              <span className="text-pink-300">
                {errors?.courseDescription?.message}
              </span>
            )}
          </label>
          <label htmlFor="courseLanguage" className="w-full">
            <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
              Course language <sup className="text-pink-600">*</sup>
            </p>
            <input
              type="text"
              id="courseLanguage"
              placeholder="Enter Course Language"
              {...register("courseLanguage", {
                required: { value: true, message: "Language is required" },
              })}
              className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            {errors?.courseLanguage && (
              <span className="text-pink-300">
                {errors?.courseLanguage?.message}
              </span>
            )}
          </label>
          <label htmlFor="price" className="w-full relative">
            <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
              Price <sup className="text-pink-600">*</sup>
            </p>
            <input
              type="number"
              id="price"
              placeholder="Enter Course price"
              {...register("price", {
                valueAsNumber: true,
                required: { value: true, message: "Price is required" },
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
              className="bg-richblack-700 border-b-[1px] border-richblack-200 pl-10 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            <span className="text-caribbeangreen-200 absolute left-2 top-[43px] text-2xl">
              <HiCurrencyRupee />
            </span>
            {errors?.price && (
              <span className="text-pink-300">{errors?.price?.message}</span>
            )}
          </label>
          <label htmlFor="category" className="w-full">
            <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
              Category <sup className="text-pink-600">*</sup>
            </p>
            <select
              id="category"
              defaultValue={editCreatedCourse ? createdCourse?.category : ""}
              {...register("category", {
                required: { value: true, message: "category is required" },
              })}
              className="bg-richblack-700 border-b-[1px] cursor-pointer border-richblack-200 text-richblack-5 rounded-[0.5rem] w-full p-[12px]"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {!loading &&
                allCategories.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
            </select>
            {errors?.category && (
              <span className="text-pink-300">{errors?.category?.message}</span>
            )}
          </label>
          <ChipInput
            name={"tags"}
            id={"tags"}
            tags={tags}
            setTags={setTags}
            setValue={setValue}
            register={register}
            errors={errors}
            createdCourse={createdCourse}
            editCreatedCourse={editCreatedCourse}
          />
          <Upload
            label="Course Thumbnail"
            name="thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCreatedCourse ? createdCourse?.thumbnail : null}
          />
          <label htmlFor="whatYouWillLearn" className="w-full">
            <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
              Benefits of the course <sup className="text-pink-600">*</sup>
            </p>
            <textarea
              id="whatYouWillLearn"
              placeholder="Enter Benefits of the course"
              {...register("whatYouWillLearn", {
                required: {
                  value: true,
                  message: "Benefits of the course is required",
                },
              })}
              className="bg-richblack-700 min-h-[150px] border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            {errors?.whatYouWillLearn && (
              <span className="text-pink-300">
                {errors?.whatYouWillLearn?.message}
              </span>
            )}
          </label>

          <InstructionField
            name={"instructions"}
            id={"instructions"}
            instructions={instructions}
            setInstructions={setInstructions}
            setValue={setValue}
            register={register}
            errors={errors}
            createdCourse={createdCourse}
            editCreatedCourse={editCreatedCourse}
          />
        </div>
        <div className="flex justify-center sm:justify-end items-center flex-wrap gap-4">
          {editCreatedCourse && (
            <button type="button"
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`min-w-fit flex cursor-pointer items-center gap-x-2 text-lg rounded-md bg-richblack-300 px-4 py-2 font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          <button
            type="submit"
            className="min-w-fit py-2 flex justify-center items-center px-4 rounded-md text-richblack-900 text-lg font-semibold hover:scale-90 bg-yellow-50 hover:shadow-[0px_0px_40px_0px_#FFD60A] transition-all duration-200"
          >
            Next <FaArrowRight className="ml-4 animate-left-right" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreater;
