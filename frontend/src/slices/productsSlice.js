import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
  },
  reducers: {
    productsRequest() {
      return {
        loading: true,
      };
    },
    productsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.count,
        resPerPage: action.payload.resPerPage,
      };
    },
    productsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    productsOffRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    productsOffSuccess(state, action) {
      return {
        ...state,
        loading: false,
        productsOff: action.payload.products,
        productsOffCount: action.payload.count,
        resPerPageOff: action.payload.resPerPage,
      };
    },
    productsOffFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    productsCatRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    productsCatSuccess(state, action) {
      return {
        ...state,
        loading: false,
        productsCat: action.payload.products,
        productsCatCount: action.payload.count,
        resPerPageCat: action.payload.resPerPage,
      };
    },
    productsCatFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminProductsRequest() {
      return {
        loading: true,
      };
    },
    adminProductsSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
      };
    },
    adminProductsFail(state, action) {
      return {
        loading: false,
        error: action.payload,
      };
    },
    clearError(state) {
      return {
        ...state,
        loading: false,
        error: null,
      };
    },
  },
});

const { actions, reducer } = productsSlice;

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  productsOffRequest,
  productsOffSuccess,
  productsOffFail,
  productsCatRequest,
  productsCatSuccess,
  productsCatFail,
  adminProductsRequest,
  adminProductsSuccess,
  adminProductsFail,
  clearError,
} = actions;

export default reducer;
