import React from 'react'
import { tabsName } from '../../../utils/data/homepage-explore';

const HomeCourseTab = ({setmyCard, activeTab}) => {
    
  return (
    <div className="hidden p-1 mt-4 gap-x-4 rounded-full bg-richblack-800 text-richblack-200 md:flex justify-between items-center font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
    {tabsName.map((element) => {
      return (
        <div
          key={element?.id}
          onClick={() => setmyCard(element?.title)}
          className={`${
            activeTab === element?.title && "bg-richblack-900 text-[#12D8FA] "
          } py-2 px-8 font-medium rounded-full hover:bg-richblack-900 hover:text-[#12D8FA] transition-all duration-200 cursor-pointer`}
        >
          {element?.title}
        </div>
      );
    })}
  </div>
  )
}

export default HomeCourseTab