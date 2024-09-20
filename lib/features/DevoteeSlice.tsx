import { createSlice } from "@reduxjs/toolkit";

const DevoteeSlice = createSlice({
    name: "payment",
    initialState: {
        payments: [],
        devoteeId: "",
        profile: {},
        donation : [],
        unpaidDonation : []
    },
    reducers: {
        setDevoteeId(state: any, actions: any) {
            return {
                ...state, devoteeId : actions.payload
            }
        },
        setPayment(state: any,actions: any){
            return {
                ...state, payments : actions.payload
            }
        },
        setDonation(state: any,actions: any){
            return {
                ...state, donation : actions.payload
            }
        },
        setUnpaidDonation(state: any,actions: any){
            return {
                ...state, unpaidDonation : actions.payload
            }
        }
    }
})

export const DevoteeAction = DevoteeSlice.actions;
export default DevoteeSlice.reducer;