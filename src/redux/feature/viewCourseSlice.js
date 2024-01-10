import { createSlice } from "@reduxjs/toolkit";


const viewCourseSlice = createSlice({

    name:"viewCourse",
    initialState:{
        entireCourse:null,
        entireCourseSection:null,
        showCourseMenu:true
    },
    reducers:{
        setEntireCourse: (state, action) => {
         state.entireCourse = action.payload;
        },
        setEntireCourseSection: (state, action) => {
         state.entireCourseSection = action.payload;
        },
        setShowCourseMenu: (state, action) => {
         state.showCourseMenu = action.payload;
        }
    }

});

export const {setEntireCourse, setEntireCourseSection, setShowCourseMenu} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;