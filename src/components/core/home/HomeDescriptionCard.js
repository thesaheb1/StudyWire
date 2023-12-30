import React from "react";
import CtaBtn from "../../button/CtaBtn";
import FancyHeading from "../../common/FancyHeading";
const HomeDescriptionCard = ({
  btnText1,
  btnText2,
  headingText,
  headingText2,
  spanText,
  paragraph,
}) => {
  return (
    <>
      <h1 className="text-3xl text-richblack-5 md:text-4xl font-inter font-bold text-left">
        {headingText} <FancyHeading text={spanText} />
        {headingText2}
      </h1>
      <p className="my-2 text-richblack-50 text-lg font-bold">{paragraph}</p>

      <div className="flex justify-start items-center gap-x-6 md:gap-x-12 mt-8">
        {/* button */}
        <CtaBtn
          color={"bgYellow"}
          arrow={true}
          hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#FFD60A]"}
          text={btnText1}
        />
        <CtaBtn
          color={"bgBlue"}
          arrow={false}
          hoverOnShadow={"hover:shadow-[0px_0px_40px_0px_#12D8FA]"}
          text={btnText2}
        />
      </div>
    </>
  );
};

export default HomeDescriptionCard;
