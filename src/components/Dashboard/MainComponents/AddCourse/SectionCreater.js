import { BiRightArrowAlt } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { MdOutlineAddToQueue } from "react-icons/md";
import {
  createSection,
  updateSection,
} from "../../../../services/operations/courseOperation";
import {
  setCreatedCourse,
  setEditCreatedCourse,
  setStep,
} from "../../../../redux/feature/courseCreationSlice";
import toast from "react-hot-toast";
import SubSection from "./SubSection";

const SectionCreater = () => {
  const {
    register,
    handleSubmit,
    // getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const { createdCourse } = useSelector((state) => state.courseCreation);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditSection, setIsEditSection] = useState(null);

  const sectionUpdater = async (UpdateData) => {
    // api call for secton updation
    const res = await updateSection(UpdateData, token);

    // set updated data to course
    if (res) {
      let updatedSection = createdCourse?.courseContent?.map((section) =>
        section?._id === res?._id ? res : section
      );

      const updatedCourse = { ...createdCourse, courseContent: updatedSection };

      dispatch(setCreatedCourse(updatedCourse));
    }
  };

  const SubmitHandler = async (data) => {
    if (isEditSection) {
      if (data.sectionName === isEditSection.sectionName) {
        toast.error("update not be same");
        return;
      }
      sectionUpdater({
        sectionName: data?.sectionName,
        sectionId: isEditSection?.sectionId,
      });
      setValue("sectionName", "");
      setIsEditSection(false);
      return;
    }

    const result = await createSection(
      {
        sectionName: data?.sectionName,
        courseId: createdCourse?._id,
      },
      token
    );
    if (result) {
      dispatch(setCreatedCourse(result));
      setValue("sectionName", "");
    }
  };

  const cancelEdit = () => {
    setIsEditSection(null);
    setValue("sectionName", "");
  };

  const doEdit = (sectionName, sectionId) => {
    if (isEditSection?.sectionId === sectionId) {
      cancelEdit();
      return;
    }
    setIsEditSection({ sectionName, sectionId });
    setValue("sectionName", sectionName);
  };

  const goToNext = () => {
    if (createdCourse.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    if (
      createdCourse.courseContent.some(
        (section) => section.subSection.length === 0
      )
    ) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }
    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCreatedCourse(true));
  };

  return (
    <div className="w-full bg-richblack-800 border-[1px] border-richblack-700 rounded-lg p-2 sm:p-6 my-10">
      <h2 className="text-richblack-5 text-2xl font-medium my-8">
        Course Builder
      </h2>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div className="my-8">
          <input
            type="text"
            placeholder="Add a section to build your course"
            {...register("sectionName", {
              required: { value: true, message: "Section is required" },
            })}
            className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
          />
          {errors?.sectionName && (
            <span className="text-pink-300">
              {errors?.sectionName?.message}
            </span>
          )}
        </div>
        <div className="flex gap-x-4">
          <button
            type="submit"
            className="min-w-fit text-yellow-50 rounded-lg text-lg font-semibold flex justify-center items-center gap-x-2 cursor-pointer hover:bg-yellow-50 hover:text-richblack-900 border-2 border-yellow-50 px-4 py-2 transition-all duration-200"
          >
            <MdOutlineAddToQueue className="text-2xl" />{" "}
            {isEditSection ? "Update Section" : "Create Section"}
          </button>
          {isEditSection && (
            <div
              onClick={cancelEdit}
              className="w-fit text-richblack-100 rounded-lg text-lg font-semibold flex justify-center items-center gap-x-2 cursor-pointer hover:bg-richblack-100 hover:text-richblack-900 border-2 border-richblack-100 px-4 py-2 transition-all duration-200"
            >
              Cancel
            </div>
          )}
        </div>
      </form>

      <SubSection doEdit={doEdit} />
      <div className="w-full flex justify-end items-center mt-8 gap-x-4">
        <button
          onClick={goBack}
          className="px-4 py-2 text-lg text-richblack-900 font-bold bg-richblack-400 rounded-lg"
        >
          Back
        </button>
        <button
          onClick={goToNext}
          className="px-4 py-2 text-lg text-richblack-900 font-bold bg-yellow-50 rounded-lg flex justify-center items-center gap-x-2"
        >
          Next <BiRightArrowAlt />
        </button>
      </div>
    </div>
  );
};

export default SectionCreater;
