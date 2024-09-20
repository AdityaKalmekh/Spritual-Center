import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name: 'use',
    initialState: {
        users: [],
        editUserData: {},
        search : "",
        searchResult : [],
        messages : []
    },
    reducers: {
        addUsers(state: any, action: any) {
            return { ...state, users: action.payload }
        },
        deleteUser(state: any, action: any) {
            return {
                ...state, users: state.users.filter((devotee: any) => devotee._id != action.payload)
            }
        },
        editUser(state: any, action: any) {
            return {
                ...state, editUserData : action.payload
            }
        },
        searchBy(state: any, action: any) {
            state.users.filter((stat:any) => console.log(stat));
        },
        setMessages(state: any, action:any) {
            return {
                ...state, messages: action.payload
            }
        }
    }
})

export const userAction = UserSlice.actions;
export default UserSlice.reducer;