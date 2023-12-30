import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";


const ChipInput = ({ tags, setTags, register, setValue, errors, id, name, createdCourse, editCreatedCourse }) => {

  const onKeyDownHandler = (event) => {
    if (event.key === `Enter` || event.key === ",") {
      event.preventDefault();
      const tag = event.target.value.trim();
      if (tag && !tags?.includes(tag)) {
        const allTagsValues = [...tags, tag];
        setTags(allTagsValues);
        event.target.value = "";
      }
    }
  };

  const tagRemover = (item) => {
    const newTags = tags.filter((tagItem) => tagItem !== item);
    setTags(newTags);
  };

  useEffect(() => {
    if (editCreatedCourse) {
      // console.log(course)
      setTags(createdCourse?.tags);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  return (
    <label htmlFor={id} className="w-full">
      <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
        Tags <sup className="text-pink-600">*</sup>
      </p>
      <div className="flex flex-wrap gap-2 my-2">
        {tags?.map((item, index) => (
          <div
            key={index}
            className="w-fit px-3 py-1 bg-yellow-900 text-yellow-50 rounded-full flex justify-center items-center gap-x-2"
          >
            {item}
            <span
              onClick={() => tagRemover(item)}
              className="text-pink-200 cursor-pointer pt-1"
            >
              <RxCross2 />
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        id={id}
        onKeyDown={onKeyDownHandler}
        placeholder="Choose tags"
        className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
      />
      {errors?.tags && (
        <span className="text-pink-300">{"Tag is Required"}</span>
      )}
    </label>
  );
};

export default ChipInput;
