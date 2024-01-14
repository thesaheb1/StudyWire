import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// import Swiper core and required modules
import { Pagination, Autoplay, FreeMode } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Icons
import { FaStar } from "react-icons/fa"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiConnector"
import { course } from "../../services/Apis"

function ReviewSlider() {
    const [reviews, setReviews] = useState([])
    const truncateWords = 15

    useEffect(() => {
        ; (async () => {
            const response = await apiConnector(
                "GET",
                course.get_all_rating_and_review_api
            )
            if (response?.data?.status) {
                setReviews(response?.data?.data)
                console.log("reviews....... ", response?.data?.data);
            }
        })()
    }, [])

    // console.log(reviews)

    return (
        <>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mt-[50px] text-richblack-5 w-full text-center">Ratings and Reviews ❤️</h1>
        <div className="text-white w-full mx-auto flex justify-center items-center">
            <div className="mb-[50px] mt-[24px] h-fit w-full sm:w-[90%] lg:w-4/5 xl:w-8/12 md:text-richblue-5">
                <Swiper
                    modules={[FreeMode, Pagination, Autoplay]}
                    spaceBetween={25}
                    scrollbar={{ draggable: true }}
                    breakpoints={{
                        480: {
                            // width: 576,
                            slidesPerView: 2,
                        },
                        768: {
                            // width: 576,
                            slidesPerView: 3,
                        },
                        1536: {
                            // width: 768,
                            slidesPerView: 4,
                        },
                    }}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {reviews.map((review) => {
                        return (
                            <SwiperSlide key={review?._id}>
                                <div className="flex flex-col flex-wrap gap-3 bg-richblack-800 rounded-lg p-3 text-[14px] text-richblack-25">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={review?.user?.image}
                                            alt="reviewer Dp"
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName?.toUpperCase()} ${review?.user?.lastName?.toUpperCase()}`}</h1>
                                            <h2 className="text-[12px] font-medium text-richblack-200">
                                                {review?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className="font-medium text-richblack-25">
                                        {review?.review.split(" ").length > truncateWords
                                            ? `${review?.review
                                                .split(" ")
                                                .slice(0, truncateWords)
                                                .join(" ")} ...`
                                            : `${review?.review}`}
                                    </p>
                                    <div className="flex items-center gap-2 ">
                                        <h3 className="font-semibold text-yellow-100">
                                            {review.rating.toFixed(1)}
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>

        </>
    )
}

export default ReviewSlider
