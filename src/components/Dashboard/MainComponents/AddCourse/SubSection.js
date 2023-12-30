import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import SubSectionModal from "./SubSectionModal";

// icons
import { CgMathPlus } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdFormatLineSpacing } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import ConfirmationModal from "../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../services/operations/courseOperation";
import { setCreatedCourse } from "../../../../redux/feature/courseCreationSlice";

const SubSection = ({ doEdit }) => {
  const dispatch = useDispatch();
  const { createdCourse } = useSelector((state) => state.courseCreation);
  const { token } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(null);

  // States to keep track of mode of modal [add, view, edit]
  const [addSubSection, setAddSubsection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const handleDeleteSection = async (data) => {
    const result = await deleteSection(data, token);
    if (result) {
      dispatch(setCreatedCourse(result));
    }
    setShowModal(null);
  };

  const handleDeleteSubSection = async (data) => {
    const result = await deleteSubSection(data, token);
    if (result) {
      const updatedSection = createdCourse?.courseContent?.map((section) =>
        section?.id === result?.id ? result : section
      );

      dispatch(
        setCreatedCourse({
          ...createdCourse,
          courseContent: updatedSection,
        })
      );
    }
    setShowModal(null);
  };

  return (
    <div className="mt-10">
      {createdCourse?.courseContent.length > 0 && (
        <div className="bg-richblack-700 border-[1px] border-richblack-600 rounded-lg p-2 sm:p-6">
          {createdCourse?.courseContent?.map((section) => (
            <details key={section?._id} open>
              <summary className="flex cursor-pointer my-2">
                <div className="w-full text-richblack-100 text-lg font-medium flex justify-between items-center border-b-[1px] border-richblack-600 pb-2">
                  <div className="flex gap-x-4 justify-start items-center">
                    <MdFormatLineSpacing />
                    <p>{section?.sectionName}</p>
                  </div>
                  <div className="flex justify-center items-center flex-wrap gap-2">
                    <button
                      onClick={() => doEdit(section?.sectionName, section?._id)}
                      className="hover:text-caribbeangreen-200 min-w-fit"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() =>
                        setShowModal({
                          btn1: "Delete",
                          btn2: "Cancel",
                          text1: "Delete this Section?",
                          text2:
                            "All the lectures in this section will be deleted",
                          btn1Handler: () =>
                            handleDeleteSection({
                              sectionId: section?._id,
                              courseId: createdCourse?._id,
                            }),
                          btn2Handler: () => setShowModal(null),
                        })
                      }
                      className="hover:text-pink-200 min-w-fit"
                    >
                      <RiDeleteBin6Line />
                    </button>
                    <div className="min-w-fit px-2 border-l-[1px] border-richblack-400 text-2xl">
                      <IoMdArrowDropdown />{" "}
                    </div>
                  </div>
                </div>
              </summary>
              <div className="mx-4">
                {section?.subSection?.map((item) => (
                  <div
                    key={item?._id}
                    onClick={() => setViewSubSection(item)}
                    className="w-full text-richblack-100 text-lg font-medium cursor-pointer px-4 py-2 border-b-[1px] border-richblack-600"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-4 justify-start items-center">
                        <MdFormatLineSpacing />
                        <p>{item?.title}</p>
                      </div>
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex gap-x-4 justify-start items-center"
                      >
                        <button
                          onClick={() =>
                            setEditSubSection({
                              ...item,
                              sectionId: section?._id,
                            })
                          }
                          className="hover:text-caribbeangreen-200"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() =>
                            setShowModal({
                              btn1: "Delete",
                              btn2: "Cancel",
                              text1: "Delete this Sub-Section?",
                              text2: "This lecture will be deleted",
                              btn1Handler: () =>
                                handleDeleteSubSection({
                                  subSectionId: item?._id,
                                  sectionId: section?._id,
                                }),
                              btn2Handler: () => setShowModal(null),
                            })
                          }
                          className="hover:text-pink-200"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => setAddSubsection(section?._id)}
                  className="w-fit text-yellow-50 rounded-lg text-base font-semibold flex justify-center items-center gap-x-2 cursor-pointer px-4 py-2 transition-all duration-200"
                >
                  <CgMathPlus className="text-2xl" />
                  Create SubSection
                </div>
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Modal Display */}
      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

      {showModal && <ConfirmationModal modalData={showModal} />}
    </div>
  );
};

export default SubSection;
