import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  createdCourse: null,
  editCreatedCourse: false,
  paymentLoading: false,
}

const courseCreationSlice = createSlice({
  name: "courseCreation",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setCreatedCourse: (state, action) => {
      state.createdCourse = action.payload
    },
    setEditCreatedCourse: (state, action) => {
      state.editCreatedCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    resetCreatedCourseState: (state) => {
      state.step = 1
      state.createdCourse = null
      state.editCreatedCourse = false
    },
  },
})

export const {
  setStep,
  setCreatedCourse,
  setEditCreatedCourse,
  setPaymentLoading,
  resetCreatedCourseState,
} = courseCreationSlice.actions

export default courseCreationSlice.reducer
