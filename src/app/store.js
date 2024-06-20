import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersSlice from "../features/auth/usersSlice";
import { userDashboard } from "../features/auth/userDasbord";

export const store = configureStore({
    reducer: {
        [userDashboard.reducerPath]: userDashboard.reducer,
        auth: authReducer,
        users: usersSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userDashboard.middleware)
})

// setupListeners(store.dispatch);
export default store;