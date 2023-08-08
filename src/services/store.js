import { configureStore} from "@reduxjs/toolkit";
import { capsuleApi } from "./capsule";


export const store = configureStore({
    reducer: {
        [capsuleApi.reducerPath]: capsuleApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(capsuleApi.middleware)
})