import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requestData",
    initialState:null,
    reducers:{
        addReqData:(state , action)=>{
            return action.payload;
        },
        filterReqData:(state , action)=>{
            return action.payload
        }

    }
})

export const {addReqData , filterReqData} = requestSlice.actions
export default requestSlice.reducer