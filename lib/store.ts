import { configureStore } from "@reduxjs/toolkit";
import userslice from "./features/userslice.tsx";
import devoteeSlice from "./features/DevoteeSlice.tsx";

const Store = configureStore({
    reducer : {
        devotee : userslice,
        devotees : devoteeSlice
    }
});

export default Store