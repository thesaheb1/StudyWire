import React from "react";
import RenderSteps from "../../components/Dashboard/MainComponents/AddCourse/RenderSteps";


const AddCourses = () => {

  // const [hideTips, setHideTips] = useState(false);
 
  return (
    <div className="w-full max-h-[calc(100vh-4rem)] overflow-y-auto ml-[60px] p-4 sm:p-8 xl:p-16">
      <h1 className="w-full md:max-w-[700px] py-8 text-2xl sm:text-4xl text-richblack-5 text-center sm:text-left">
        Create Course
      </h1>
      <div className="w-full flex flex-wrap-reverse lg:flex-nowrap items-end lg:items-start gap-8">
        <RenderSteps />
        <details open={true} className="w-full md:min-w-[300px] md:w-[700px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 mb-4">
          <summary className="sm:text-lg text-richblack-5 cursor-pointer">⚡ Course Upload Tips </summary>
          {<ul className="h-fit ml-5 list-item list-disc space-y-4 text-base text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>}
        </details>
      </div>
    </div>
  );
};

export default AddCourses;
