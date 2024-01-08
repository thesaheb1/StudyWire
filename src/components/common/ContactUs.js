import React, { useEffect, useState } from "react"
import CountryCode from "../../utils/data/countrycode.json"

import { useForm } from "react-hook-form"
import { apiConnector } from "../../services/apiConnector"
import { contactus } from "../../services/Apis"
import toast from "react-hot-toast"

const ContactUs = () => {

    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const submitContactForm = async (data) => {
        // console.log("Form Data - ", data)
        const tid = toast.loading("sending your message...")
        try {
            setLoading(true)
            const response = await apiConnector(
                "POST",
                contactus.contact_us_api,
                data
            )
            if (!response?.data?.status) {
                throw new Error(response);
            }
            // console.log("Email Res - ", res)
            toast.success("message sent successfully")
            setLoading(false)
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
            setLoading(false)
            toast.error("message sending failed")
        }

        toast.dismiss(tid);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])
    return (
        <form
            className="flex flex-col gap-7"
            onSubmit={handleSubmit(submitContactForm)}
        >
            <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="firstname" className="lable-style">
                        First Name
                    </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter first name"
                        className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 text-gray-200 w-full p-[12px]"
                        {...register("firstname", { required: true })}
                    />
                    {errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your name.
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-2 lg:w-[48%]">
                    <label htmlFor="lastname" className="lable-style">
                        Last Name
                    </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter last name"
                        className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 text-gray-200 w-full p-[12px]"
                        {...register("lastname")}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="lable-style">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 text-gray-200 w-full p-[12px]"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Email address.
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber" className="lable-style">
                    Phone Number
                </label>

                <div className="flex gap-5">
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            className="w-[70px] bg-richblack-700 border-b-[1px] border-richblack-200  rounded-[0.5rem] text-richblack-5 py-[12px] px-2"
                            {...register("countrycode", { required: true })}
                        >
                            {CountryCode.map((ele, i) => {
                                return (
                                    <option key={i} value={ele.code}>
                                        {ele.code} -{ele.country}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="12345 67890"
                            className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 text-gray-200 w-full p-[12px]"
                            {...register("phoneNo", {
                                required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="lable-style">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder="Enter your message here"
                    className="bg-[rgba(255,255,255,0.2)] border-b-2 border-gray-400 rounded-[0.5rem] text-richblack-5 placeholder:text-gray-400 placeholder:text-opacity-80 text-gray-200 w-full p-[12px]"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your Message.
                    </span>
                )}
            </div>

            <button
                disabled={loading}
                type="submit"
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
 ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </form>
    )
}

export default ContactUs
