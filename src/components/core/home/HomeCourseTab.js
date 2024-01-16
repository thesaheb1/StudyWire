import React from 'react'
import { tabsName } from '../../../utils/data/homepage-explore';

const HomeCourseTab = ({setmyCard, activeTab}) => {
    
  return (
    <div className="min-w-full md:min-w-[700px] mx-4 sm:p-1 mt-4 gap-2 rounded-full md:bg-richblack-800 text-richblack-200 flex justify-center md:justify-between items-center flex-wrap font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
    {tabsName.map((element) => {
      return (
        <div
          key={element?.id}
          onClick={() => setmyCard(element?.title)}
          className={`${
            activeTab === element?.title && "bg-richblack-800 text-[#12D8FA] md:bg-richblack-900"
          } py-2 px-6 font-medium rounded-lg md:rounded-full hover:bg-richblack-800 md:hover:bg-richblack-900 hover:text-[#12D8FA]  min-w-max transition-all duration-200 cursor-pointer`}
        >
          {element?.title}
        </div>
      );
    })}
  </div>
  )
}

export default HomeCourseTab