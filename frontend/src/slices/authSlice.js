import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'product',
    initialState: {
        loading: true,
        isAuthenticated: false
    },
    reducers: {

        loginRequest() {
            return {
                loading: true,
                isAuthenticated: false
            }
        },
        loginSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loginFail(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null
            }
        },
        registerRequest() {
            return {
                loading: true,
                isAuthenticated: false
            }
        },
        registerSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        registerFail(state, action) {
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            }
        },
        clearAuthError(state) {
            return {
                ...state,
                error: null,
            }
        },
        loadUserRequest(state) {
            return {
                ...state,
                isAuthenticated: false,
                loading: true
            }
        },
        loadUserSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        loadUserFail(state) {
            return {
                ...state,
                loading: false,
            }
        },
        logoutSuccess(state) {
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            }
        },
        logoutFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },

        updateProfileRequest(state) {
            return {
                ...state,
                loading: true,
                isUpdated: false,
                error: null
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true,
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearUpdateProfile(state) {
            return {
                ...state,
                isUpdated: false
            }
        },
        updatePasswordRequest(state) {
            return {
                ...state,
                loading: true,
                isUpdated: false,
                error: null
            }
        },
        updatePasswordSuccess(state) {
            return {
                ...state,
                loading: false,
                isUpdated: true,
            }
        },
        updatePasswordFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        forgotPasswordRequest() {
            return {
                loading: true,
                error: null,
                message: null
            }
        },
        forgotPasswordSuccess(state, action) {
            return {
                loading: false,
                message: action.payload
            }
        },
        forgotPasswordFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        resetPasswordRequest() {
            return {
                loading: true,
                error: null,
                message: null
            }
        },
        resetPasswordSuccess(state, action) {
            return {
                loading: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        },
        resetPasswordFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
    }
});

const { actions, reducer } = authSlice;

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    registerRequest,
    registerSuccess,
    registerFail,
    clearAuthError,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutFail,
    logoutSuccess,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearUpdateProfile,
    updatePasswordFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    forgotPasswordRequest,
    forgotPasswordFail,
    forgotPasswordSuccess,
    resetPasswordRequest,
    resetPasswordFail,
    resetPasswordSuccess
} = actions;

export default reducer;

