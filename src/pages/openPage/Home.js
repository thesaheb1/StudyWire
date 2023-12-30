// react core
import React from "react";

// react-router-dom feature
import { Link } from "react-router-dom";

// icons
import { FaArrowRight } from "react-icons/fa6";

// components
import CtaBtn from "../../components/button/CtaBtn";
import HomeCourseSection from "../../components/core/home/HomeCourseSection";
import HomeDescriptionCard from "../../components/core/home/HomeDescriptionCard";
import CodeBlock from "../../components/core/home/CodeBlock";
import FancyHeading from "../../components/common/FancyHeading";

// data
import { htmlCode, reactCode } from "../../utils/data/codeExample";
import { TimeLine } from "../../utils/data/timeLine";

// images and video
import banner from "../../assets/Images/banner.mp4";
import TimelineImage from "../../assets/Images/TimelineImage.png";
import knowYourProgress from "../../assets/Images/Know_your_progress.png";
import compareWithOthers from "../../assets/Images/Compare_with_others.png";
import planYourLesson from "../../assets/Images/Plan_your_lessons.png";
import instructor from "../../assets/Images/Instructor.jpg";

const Home = () => {
  return (
    <div className="Home px-4 w-full flex flex-col justify-start items-center pt-[4rem]">
      <div className="w-full md:w-8/12 flex flex-col justify-center items-center my-12 sm:my-20">
        <Link
          to="/signup"
          className="gradient max-w-fit text-[#12D8FA] flex justify-center items-center gap-4 rounded-full py-1 px-6 md:py-2 md:px-12 border-b-2 border-richblack-200 shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:scale-105 transition-all duration-200"
        >
          <span className="text-sm md:text-lg font-bold">
            Become an Instructor
          </span>{" "}
          <FaArrowRight className="animate-left-right" />
        </Link>
        <div className="w-full md:w-[80%] mx-auto flex flex-col justify-center items-center mt-8">
          <h1 className="text-3xl text-richblack-5 md:text-4xl font-inter font-bold">
            Empower Your Future with <FancyHeading text={"Coding Skills"} />
          </h1>
          <p className="my-2 text-richblack-50 text-lg font-bold">
            With our online coding courses, you can learn at your own pace, from
            anywhere in the world, and get access to a wealth of resources,
            including hands-on projects, quizzes, and personalized feedback from
            instructors.
          </p>
        </div>

        <div className="w-full md:w-fit flex justify-start md:justify-center items-center gap-x-6 md:gap-x-12  mt-8">
          <CtaBtn
            color={"bgYellow"}
            arrow={false}
            hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#FFD60A]"}
            text={"Learn More"}
          />
          <CtaBtn
            color={"bgBlue"}
            arrow={false}
            hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#12D8FA]"}
            text={"Book a Demo"}
          />
        </div>

        <div className="w-full relative z-10 scale-up-center mt-16">
          <video
            className="w-full rounded-md mx-auto"
            loop
            muted
            autoPlay
            src={banner}
            typeof="video/mp4"
          ></video>
          <div className="w-full aspect-video rounded-md bg-[#FFD60A] shadow-[0px_0px_40px_10px_#FFD60A] absolute z-[-1] top-[10px] left-[10px] scale-up-center"></div>
        </div>
      </div>
      <div className=" w-full md:w-8/12 flex flex-col justify-center items-center gap-y-12 my-12 sm:my-20">
        <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start flex-wrap gap-y-8 md:gap-y-0">
          <div className="w-full md:w-[43%]">
            {/* description 1 */}
            <HomeDescriptionCard
              btnText1={"Try it Yourself"}
              btnText2={"Learn More"}
              headingText={"Unlock your"}
              headingText2={" with our online courses."}
              spanText={"coding potential"}
              paragraph={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
            />
          </div>
          <div className="w-full md:w-[43%] relative z-20">
            <div className="shadow-[0px_0px_200px_70px_#12D8FA] absolute -z-10 bottom-1/2 right-1/2"></div>
            <CodeBlock code={htmlCode} color={"textBlue"} />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row-reverse justify-between items-center md:items-start flex-wrap gap-y-8 md:gap-y-0">
          <div className="w-full md:w-[43%]">
            {/* description 2 */}
            <HomeDescriptionCard
              btnText1={"Continue Lesson"}
              btnText2={"Learn More"}
              headingText={"Start"}
              headingText2={""}
              spanText={"coding in seconds"}
              paragraph={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
              }
              paragraphAlign={"textAlignLeft"}
            />
          </div>
          <div className="w-full md:w-[43%] relative z-20">
            <div className="shadow-[0px_0px_200px_70px_#FFD60A] absolute -z-10 bottom-1/2 right-1/2"></div>
            <CodeBlock code={reactCode} color={"textYellow"} />
          </div>
        </div>
      </div>
      {/*Courses Section */}
      <HomeCourseSection />
      {/* timeline section */}
      <div className="w-screen flex flex-col justify-center items-center bg-white mainBack py-12 px-4 md:p-0">
        <div className="w-full md:w-8/12 flex flex-col md:flex-row justify-between items-start">
          <div className="w-full md:w-[45%] my-2 z-50">
            <h1 className="text-richblack-900 text-3xl md:text-4xl text-left font-inter font-bold">
              Get the skills you need for a{" "}
              <FancyHeading text={"job that is in demand."} />
            </h1>
          </div>

          <div className="w-full md:w-[45%]">
            <div>
              <p className={`my-2 text-richblack-500 text-left text-lg  `}>
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
            </div>
            <div className="mt-8">
              <CtaBtn
                color={"bgYellow"}
                arrow={false}
                hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#12D8FA]"}
                text={"Learn More"}
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-8/12 text-white flex flex-col md:flex-row justify-between items-center my-12 sm:my-20">
          <div className="w-full md:w-[40%] h-full flex flex-col justify-between items-start mx-auto">
            {TimeLine.map((item) => {
              return (
                <div key={item.id}>
                  <div className="flex gap-x-8">
                    <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                      <img src={item.Logo} alt="" />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-richblack-800">
                        {item.Heading}
                      </p>
                      <p className="text-sm text-richblack-700">
                        {item.Description}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`hidden ${
                      TimeLine.length === item.id ? "hidden" : "lg:block"
                    }  h-14 border-dotted border-r-2 border-richblack-800 bg-richblack-400/0 w-[26px]`}
                  ></div>
                </div>
              );
            })}
            ;
          </div>
          <div className="w-full md:w-[50%] relative z-10">
            <img
              src={TimelineImage}
              alt=""
              className="bg-white shadow-[15px_15px_0_0] shadow-richblack-5 rounded-md"
            />
            <div className="absolute top-0 left-0 md:left-[50%] h-fit md:top-[87%] md:-translate-x-1/2 z-20 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center p-4 md:p-8 bg-caribbeangreen-700">
              <div className="flex justify-between items-center gap-x-8 md:border-r-[1px] md:px-8 md:border-caribbeangreen-500">
                <p className="text-3xl font-bold">10</p>
                <p className="text-sm text-caribbeangreen-300">
                  YEARS EXPERIENCES
                </p>
              </div>
              <div className="flex justify-between items-center gap-x-8 md:px-8 ">
                <p className="text-3xl font-bold">250</p>
                <p className="text-sm text-caribbeangreen-300">
                  TYPES OF COURSES
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-8/12 flex justify-between items-start">
          <div className="w-full md:w-[75%] mx-auto flex flex-col justify-center items-center mt-8">
            <h1 className="text-richblack-900 text-3xl md:text-4xl text-left font-inter font-bold">
              Your swiss knife for{" "}
              <span className="gradient">learning any language</span>
            </h1>
            <p
              className={`my-2 text-richblack-500 text-left sm:text-center text-lg  `}
            >
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center mt-4 md:mt-0">
              <img src={knowYourProgress} alt="" />
              <img src={compareWithOthers} alt="" className="-mx-32" />
              <img src={planYourLesson} alt="" />
            </div>
            <div className="md:mb-8">
              <CtaBtn
                color={"bgYellow"}
                arrow={false}
                hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#FFD60A]"}
                text={"Learn More"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* become an Instructor section */}
      <div className="w-full md:w-8/12 flex flex-col md:flex-row gap-x-8 gap-y-4 md:gap-y-0 justify-between items-center my-12 sm:my-20">
        <div className="w-full md:[30%]">
          <img
            src={instructor}
            alt=""
            className="shadow-[-15px_-15px_0_0] shadow-richblack-5"
          />
        </div>
        <div className="w-full md:w-[60%]">
          <h1 className="text-richblack-5 text-3xl md:text-4xl text-left font-inter font-bold">
            Become an
            <p className="gradient">instructor</p>
          </h1>
          <p className="my-8 text-richblack-300 text-left text-lg">
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over, progress tracking, custom schedule
            and more.
          </p>
          <CtaBtn
            color={"bgYellow"}
            arrow={false}
            hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#FFD60A]"}
            text={"Learn More"}
          />
        </div>
      </div>
      {/* review section */}
      {/* <div className="w-full md:w-8/12 flex justify-between items-center my-20"></div> */}
    </div>
  );
};

export default Home;
