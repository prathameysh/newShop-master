import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        product: {},
        isReviewSubmitted: false,
        isProductCreated: false,
        isProductDeleted: false,
        isProductUpdated: false,
        isReviewDeleted: false,
        reviews: [],
        error: null
    },
    reducers: {
        productRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        productSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product
            }
        },
        productFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        createReviewRequest(state) {
            return {
                ...state,
                // loading: true
            }
        },
        createReviewSuccess(state) {
            return {
                ...state,
                // loading: false,
                isReviewSubmitted: true
            }
        },
        clearReviewSubmitted(state) {
            return {
                ...state,
                isReviewSubmitted: false
            }
        },
        createReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state) {
            return {

                ...state,
                error: null
            }
        },
        clearProduct(state) {
            return {

                ...state,
                product: {}
            }
        },
        newProductRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        newProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductCreated: true
            }
        },
        newProductFail(state, action) {
            return {
                ...state,
                loading: false,
                isProductCreated: false,
                error: action.payload,
            }
        },
        clearProductCreated(state) {
            return {
                ...state,
                loading: false,
                isProductCreated: false,
            }
        },
        deleteProductRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        deleteProductSuccess(state) {
            return {
                ...state,
                loading: false,
                isProductDeleted: true
            }
        },
        deleteProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        clearProductDeleted(state) {
            return {
                ...state,
                loading: false,
                isProductDeleted: false,
            }
        },
        updateProductRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        updateProductSuccess(state, action) {
            return {
                ...state,
                loading: false,
                product: action.payload.product,
                isProductUpdated: true
            }
        },
        updateProductFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearProductUpdated(state) {
            return {
                ...state,
                loading: false,
                isProductUpdated: false,
            }
        },
        reviewsRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        reviewsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            }
        },
        reviewsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        deleteReviewRequest(state) {
            return {
                ...state,
                loading: true
            }
        },
        deleteReviewSuccess(state) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: true
            }
        },
        deleteReviewFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearReviewDeleted(state) {
            return {
                ...state,
                loading: false,
                isReviewDeleted: false
            }
        }

    }
});

const { actions, reducer } = productSlice;

export const { productRequest, productSuccess, productFail, createReviewRequest, createReviewSuccess, createReviewFail, clearError, clearReviewSubmitted, clearProduct, newProductRequest, newProductSuccess, newProductFail, clearProductCreated, deleteProductRequest, deleteProductSuccess, deleteProductFail, clearProductDeleted, updateProductRequest, updateProductSuccess, updateProductFail, clearProductUpdated, reviewsRequest, reviewsSuccess, reviewsFail, deleteReviewRequest, deleteReviewSuccess, deleteReviewFail, clearReviewDeleted } = actions;

export default reducer;

