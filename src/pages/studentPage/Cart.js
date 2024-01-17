import React, { useState } from "react";
import CartList from "../../components/core/cart/CartList";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../../utils/data/constants";
import { BuyCourse } from "../../services/operations/paymentOperation.";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Cart = () => {
  const { cart, total, totalItems } = useSelector(state => state.cart)
  const { credentialData, token } = useSelector(state => state.auth)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleBuyCourse = () => {
    if (!token || !credentialData) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to Purchase Course.",
        btn1: "Login",
        btn2: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      })

      return
    }
    if (credentialData?.accountType === ACCOUNT_TYPE.STUDENT) {
      const courseId = cart.map(c => (c?._id))
      console.log(courseId);
      BuyCourse(token, courseId, credentialData, navigate, dispatch)
      return

    }

    toast.error("Only Students can purchase.")

  }
  return (
    <div className="w-full md:w-[90%] xl:w-4/5 2xl:w-8/12 px-4 mx-auto min-h-[calc(100vh)] text-white p-[4rem]">
      <h1 className="py-8 text-4xl text-richblack-5 text-left font-medium">
        My Cart
      </h1>
      <p className="text-richblack-400 text-lg font-bold pb-4 border-b-[1px] border-richblack-700">
        {totalItems} courses in Cart
      </p>
      <div className="flex justify-between items-start flex-wrap sm:flex-nowrap gap-8 mt-8">
        <div className="w-full sm:min-w-[330px] border-[1px] border-richblack-700 rounded-lg max-h-[calc(100vh-17rem)] overflow-y-auto flex flex-col justify-start items-start p-4 gap-y-8">
          {cart?.map((c) => (
            <CartList data={c} key={c?._id} />
          ))}
        </div>
        {totalItems > 0 && <div className="w-full lg:w-fit lg:min-w-[300px] bg-richblack-800 border-2 border-richblack-700 rounded-lg flex flex-col justify-between items-start gap-y-24 p-8">
          <div className="border-b-[1px] border-richblack-700">
            <h3 className="text-3xl ring-richblack-5 font-medium">Your cart</h3>
            <h2 className="text-4xl ring-richblack-5 font-medium py-2 gradient">
              Summary
            </h2>
            <p className="text-2xl ring-richblack-5 font-medium py-4">
              Total item : <span className="text-yellow-50 font-bold">{totalItems}</span>
            </p>
          </div>
          <div className="w-full">
            <p className="text-xl ring-richblack-5 font-medium py-4">
              Total amount :{" "}
              <span className="text-caribbeangreen-200 font-bold">₹ {total}</span>
            </p>
            <button
              onClick={handleBuyCourse}
              className="w-full text-black flex justify-center items-center gap-x-2 text-xl px-4 py-2 rounded-md font-bold bg-yellow-50"
            >
              Checkout Now
            </button>
          </div>
        </div>}
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default Cart;
