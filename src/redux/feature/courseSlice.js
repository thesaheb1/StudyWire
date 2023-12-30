import { createSlice } from "@reduxjs/toolkit";



const courseSlice = createSlice({
    name : "course",
    initialState : {
        courseData:null,
        filteredData:null,
        loading : false
    },
    reducers: {
        setCourseData : (state, action) => {
            state.courseData = action.payload
        },
        setFilteredData : (state, action) => {
            state.filteredData = action.payload
        },
        setLoading : (state, action) => {
            state.loading = action.payload
        }
    }
})


export const {setCourseData, setFilteredData, setLoading} = courseSlice.actions;

export default courseSlice.reducer;