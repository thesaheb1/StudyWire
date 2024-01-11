import { createSlice } from "@reduxjs/toolkit";


const viewCourseSlice = createSlice({

    name:"viewCourse",
    initialState:{
        entireCourse:{},
        entireCourseSection:[],
        completedVideos:[],
        totalNoOfLectures:0,
        showCourseMenu:true
    },
    reducers:{
        setEntireCourse: (state, action) => {
         state.entireCourse = action.payload;
        },
        setEntireCourseSection: (state, action) => {
         state.entireCourseSection = action.payload;
        },
        setCompletedVideos: (state, action) => {
         state.completedVideos = action.payload;
        },
        setTotalNoOfLectures: (state, action) => {
         state.totalNoOfLectures = action.payload;
        },
        setShowCourseMenu: (state, action) => {
         state.showCourseMenu = action.payload;
        }
    }

});

export const {setEntireCourse, setEntireCourseSection, setCompletedVideos, setTotalNoOfLectures, setShowCourseMenu} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;