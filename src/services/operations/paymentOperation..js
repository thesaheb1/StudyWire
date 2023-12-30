// toast
import { toast } from "react-hot-toast"

// slice
import { resetCart } from "../../redux/feature/cartSlice"
import { setPaymentLoading } from "../../redux/feature/courseCreationSlice"

// api and api's connector
import { apiConnector } from "../apiConnector"
import { payment } from "../Apis"

// logo
import rzpLogo from "../../assets/Logo/razorpay_logo.png"

// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

// Buy the Course
export async function BuyCourse(
    token,
    courses,
    credentialData,
    navigate,
    dispatch
) {
    const toastId = toast.loading("Loading...")
    try {
        // Loading the script of Razorpay SDK
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        
        if (!res) {
            toast.error(
                "Razorpay SDK failed to load. Check your Internet Connection."
            )
            return
        }


        // Initiating the Order in Backend
        const orderResponse = await apiConnector(
            "POST",
            payment.capture_payment_api,
            {
                courses,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )

        
        if (!orderResponse?.data?.status) {
            throw new Error(orderResponse)
        }
        toast(orderResponse?.data?.message);
        
        // Opening the Razorpay SDK
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            currency: orderResponse?.data?.data?.currency,
            amount: orderResponse?.data?.data?.amount,
            order_id: orderResponse?.data?.data?.id,
            name: "StudyWire",
            description: "Thank you for Purchasing the Course.",
            image: rzpLogo,
            prefill: {
                name: `${credentialData?.firstName} ${credentialData?.lastName}`,
                email: credentialData?.email,
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, orderResponse?.data?.data?.amount, token)
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            },
        }
        const paymentObject = new window.Razorpay(options)

        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.")
            console.log(response?.error)
        })
    } catch (error) {
        console.log("PAYMENT CAPTURE FAILED............", error)
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId)
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...")
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", payment.verify_payment_api, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response)

        if (!response?.data?.status) {
            throw new Error(response)
        }

        toast.success("Payment Successful. You are Added to the course.")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR............", error)
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            payment.send_payment_success_email_api,
            {
                orderId: response?.razorpay_order_id,
                paymentId: response?.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR............", error)
    }
}
