import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const InstructionField = ({
  instructions,
  setInstructions,
  register,
  setValue,
  errors,
  id,
  name,
  createdCourse,
  editCreatedCourse,
}) => {
  const onKeyDownHandler = (event) => {
    if (event.key === `Enter` || event.key === ",") {
      event.preventDefault();
      const instruction = event.target.value.trim();
      if (instruction && !instructions?.includes(instruction)) {
        const allInstructionValues = [...instructions, instruction];
        setInstructions(allInstructionValues);
        event.target.value = "";
      }
    }
  };

  const tagRemover = (item) => {
    const newInstructions = instructions?.filter(
      (instructionItem) => instructionItem !== item
    );
    setInstructions(newInstructions);
  };

  useEffect(() => {
    if (editCreatedCourse) {
      setInstructions(createdCourse?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, instructions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructions]);

  return (
    <label htmlFor={id} className="w-full">
      <p className="text-base text-richblack-5 mb-2 leading-[1.375rem]">
        Requirements/Instructions <sup className="text-pink-600">*</sup>
      </p>
      <input
        type="text"
        id={id}
        onKeyDown={onKeyDownHandler}
        placeholder="Enter Instructions of the course"
        className="bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 w-full p-[12px]"
      />
      {errors?.instructions && (
        <span className="text-pink-300">{"instruction is Required"}</span>
      )}

      <div className="flex flex-col-reverse justify-start items-start my-4">
        {instructions?.map((item, index) => (
          <div
            key={index}
            className="px-4 py-2 text-yellow-50 flex justify-center items-center gap-x-2"
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
    </label>
  );
};

export default InstructionField;
