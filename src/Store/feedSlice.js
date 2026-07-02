import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload;
        },
        filterFeed:(state,action)=>{
            return action.payload;
        }
    }

})

export const { addFeed , filterFeed} = feedSlice.actions
export default feedSlice.reducer;