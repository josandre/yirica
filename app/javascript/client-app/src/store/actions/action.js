import * as types from "./type";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";



export const addToCart = (room, qty, color, size) => (dispatch) => {

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



