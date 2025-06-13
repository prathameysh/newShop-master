import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: {},
    userOrders: [],
    loading: false,
    adminOrders: [],
    isOrderDeleted: false,
    isOrderUpdated: false,
    buyNow: {},
  },
  reducers: {
    buyNow(state, action) {
      return {
        ...state,
        buyNow: action.payload,
      };
    },
    buyNowClose(state) {
      return {
        ...state,
        buyNow: {},
      };
    },
    createOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    createOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    createOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearError(state) {
      return {
        ...state,
        error: null,
      };
    },
    userOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    userOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        userOrders: action.payload.orders,
      };
    },
    userOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    orderDetailRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    orderDetailSuccess(state, action) {
      return {
        ...state,
        loading: false,
        orderDetail: action.payload.order,
      };
    },
    orderDetailFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    adminOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    adminOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        adminOrders: action.payload.orders,
      };
    },
    adminOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    deleteOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    updateOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateOrderSuccess(state) {
      return {
        ...state,
        loading: false,
        isOrderUpdated: true,
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearOrderDeleted(state) {
      return {
        ...state,
        isOrderDeleted: false,
      };
    },
    clearOrderUpdated(state) {
      return {
        ...state,
        isOrderUpdated: false,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  buyNow,
  buyNowClose,
  createOrderRequest,
  createOrderSuccess,
  createOrderFail,
  clearError,
  userOrderRequest,
  userOrderSuccess,
  userOrderFail,
  orderDetailRequest,
  orderDetailSuccess,
  orderDetailFail,
  adminOrderRequest,
  adminOrderSuccess,
  adminOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
  clearOrderDeleted,
  clearOrderUpdated,
} = actions;

export default reducer;
