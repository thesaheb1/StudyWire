import React from "react";
import { TypeAnimation } from "react-type-animation";

const CodeBlock = ({ code , color }) => {
  return (
    <div className="w-full min-h-fit border-2 border-richblack-700 backdrop-filter backdrop-blur-lg p-2 rounded-md flex justify-between items-start gap-x-2 md:gap-x-4">
      <ul className="w-[5%] text-xs md:text-base text-richblack-200 flex flex-col justify-center items-start md:px-4">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
      </ul>
      <p className={`w-[95%] text-[0.6rem] sm:text-base font-bold font-mono ${color} text-left leading-4 sm:leading-6`}>
        <TypeAnimation
          sequence={[code, 2000, ""]}
          repeat={Infinity}
          style={{
            whiteSpace: "pre-line",
            display: "block",
          }}
          omitDeletionAnimation={true}
        />
      </p>
    </div>
  );
};

export default CodeBlock;
