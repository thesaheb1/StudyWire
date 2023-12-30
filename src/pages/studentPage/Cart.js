import React from "react";
import CartList from "../../components/core/cart/CartList";

const Cart = () => {
  return (
    <div className="w-8/12 mx-auto min-h-[calc(100vh-4rem)] text-white p-4">
      <h1 className="py-8 text-4xl text-richblack-5 text-left font-medium">
        My Cart
      </h1>
      <p className="text-richblack-400 text-lg font-bold pb-4 border-b-[1px] border-richblack-700">
        2 courses in Cart
      </p>
      <div className="flex justify-between items-start mt-8">
        <div className="flex flex-col justify-center items-center gap-y-8">
          <CartList />
          <CartList />
        </div>

        <div className="h-[calc(100vh-25rem)] bg-richblack-800 border-2 border-richblack-700 rounded-lg flex flex-col justify-between items-start p-8">
          <div className="border-b-[1px] border-richblack-700">
            <h3 className="text-5xl ring-richblack-5 font-medium">Your cart</h3>
            <h2 className="text-6xl ring-richblack-5 font-medium py-2 gradient">
              Summary
            </h2>
            <p className="text-3xl ring-richblack-5 font-medium py-4">
              Total item : <span className="text-yellow-50 font-bold">2</span>
            </p>
          </div>
          <div>
            <p className="text-3xl ring-richblack-5 font-medium py-4">
              Total amount :{" "}
              <span className="text-caribbeangreen-200 font-bold">₹3,000</span>
            </p>
            <button
              type="submit"
              className="w-full text-black flex justify-center items-center gap-x-2 text-xl px-4 py-2 rounded-md font-bold bg-yellow-50"
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
