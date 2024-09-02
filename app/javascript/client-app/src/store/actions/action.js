import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_COMPARE_LIST,
  ADD_TO_COMPARE,
} from "./type";

export const fetchProductsBegin = () => ({
  type: types.FETCH_PRODUCTS_BEGIN,
});

export const receiveProducts = (products) => ({
  type: types.RECEIVE_PRODUCTS,
  products,
});

export const addToCart = (room, qty, color, size) => (dispatch) => {
  toast.success("Room Added to Cart");
  dispatch({
    type: types.ADD_TO_CART,
    room,
    qty,
    color,
    size
  });
};

export const removeFromCart = (product_id) => (dispatch) => {
  toast.success("Room Removed from Cart");
  dispatch({
    type: types.REMOVE_FROM_CART,
    product_id,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_CART,
  })
}



