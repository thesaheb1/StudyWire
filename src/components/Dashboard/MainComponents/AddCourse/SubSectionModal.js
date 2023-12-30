// react core
import { useEffect, useState } from "react";
// packages
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// icon
import { RxCross2 } from "react-icons/rx";

// compnents
import Upload from "./Upload";

// data
import { setCreatedCourse } from "../../../../redux/feature/courseCreationSlice";

// api's
import {
  createSubSection,
  updateSubSection,
} from "../../../../services/operations/courseOperation";


// SubSectionModal
export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { createdCourse } = useSelector((state) => state.courseCreation);

  useEffect(() => {
    if (view || edit) {
      setValue("title", modalData.title);
      setValue("description", modalData.description);
      setValue("video", modalData.videoUrl);
    }
    // eslint-disable-next-line
  }, []);

  // detect whether form is updated or not
  const isFormUpdated = () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.title !== modalData.title ||
      currentValues.description !== modalData.description ||
      currentValues.video !== modalData.videoUrl
    ) {
      return true;
    }
    return false;
  };

  // handle the editing of subsection
  const handleEditSubsection = async () => {
    const currentValues = getValues();
    // console.log("changes after editing form values:", currentValues)
    const formData = new FormData();
    // console.log("Values After Editing form values:", currentValues)
    formData.append("subSectionId", modalData?._id);
    formData.append("sectionId", modalData?.sectionId);

    if (currentValues.title !== modalData?.title) {
      formData.append("title", currentValues?.title);
    }
    if (currentValues.description !== modalData?.description) {
      formData.append("description", currentValues?.description);
    }

    if (currentValues.video !== modalData?.videoUrl) {
      formData.append("video", currentValues?.video);
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = createdCourse?.courseContent?.map(
        (section) => (section._id === modalData.sectionId ? result : section)
      );
      const updatedCourse = {
        ...createdCourse,
        courseContent: updatedCourseContent,
      };
      dispatch(setCreatedCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        handleEditSubsection();
      }
      return;
    }

    const formData = new FormData();

    formData.append("sectionId", modalData);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", data.video);

    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = createdCourse?.courseContent.map((section) =>
        section?._id === modalData ? result : section
      );
      const updatedCourse = {
        ...createdCourse,
        courseContent: updatedCourseContent,
      };
      dispatch(setCreatedCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          {/* Lecture Video Upload */}
          <Upload
            name="video"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          {/* Lecture Title */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="title">
              Lecture Title {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <input
              disabled={view || loading}
              id="title"
              placeholder="Enter Lecture Title"
              {...register("title", { required: true })}
              className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            {errors.title && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture title is required
              </span>
            )}
          </div>
          {/* Lecture Description */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor="description">
              Lecture Description{" "}
              {!view && <sup className="text-pink-200">*</sup>}
            </label>
            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("description", { required: true })}
              className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
            />
            {errors.description && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Lecture Description is required
              </span>
            )}
          </div>
          {!view && (
            <div className="flex justify-end">
              <button type="submit" disabled={loading} className="bg-yellow-50 px-4 py-2 rounded-lg text-lg font-medium">
                {loading ? "Loading.." : edit ? "Save Changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
