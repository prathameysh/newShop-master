import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
    users: [],
    isUserUpdated: false,
    isUserDeleted: false,
    error: null,
  },
  reducers: {
    usersRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    usersSuccess(state, action) {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    },
    usersFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    userRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    userSuccess(state, action) {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    userFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteUserRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserSuccess(state) {
      return {
        ...state,
        loading: false,
        isUserDeleted: true,
      };
    },
    deleteUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateUserRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserSuccess(state) {
      return {
        ...state,
        loading: false,
        isUserUpdated: true,
      };
    },
    updateUserFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUserDeleted(state) {
      return {
        ...state,
        loading: false,
        isUserDeleted: false,
      };
    },
    clearUserUpdated(state) {
      return {
        ...state,
        loading: false,
        isUserUpdated: false,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

const { actions, reducer } = userSlice;

export const {
  usersRequest,
  userSuccess,
  usersFail,
  userRequest,
  usersSuccess,
  userFail,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFail,
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  clearUserDeleted,
  clearUserUpdated,
  clearError,
} = actions;

export default reducer;
