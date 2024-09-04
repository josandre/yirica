import {
  ADD_TO_CART, CLEAR_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
} from "../actions/type";
import { minValueOne } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";


const init = {
  cart: [],
};

export const cartReducer = (state = init, action) => {

  switch (action.type) {
    case ADD_TO_CART:

      const room = action.room
      const roomId = room.id;
      const productQty = action.qty ? action.qty : 1;
      const roomCheckIn = new Date(room.reservation.checkIn).toISOString().split('T')[0];
      const roomCheckOut = new Date(room.reservation.checkOut).toISOString().split('T')[0];

      if (state.cart.length > 0) {
        const cartRoomCheckIn = new Date(state.cart[0].reservation.checkIn).toISOString().split('T')[0];
        const cartRoomCheckOut = new Date(state.cart[0].reservation.checkOut).toISOString().split('T')[0];


        if (roomCheckIn !== cartRoomCheckIn || roomCheckOut !== cartRoomCheckOut) {
          toast.error("You cannot add rooms with different check-in or check-out dates.")
          return state;
        }
      }

      if (state.cart.findIndex((room) => room.id === roomId) !== -1) {
        console.log("room in the if", room)
        const cart = state.cart.reduce((cartAcc, room) => {
          if (room.id === roomId) {
            cartAcc.push({
              ...room,
              selected_color: action.color,
              selected_size: action.size,
              qty: room.qty + productQty,
              sum:
                ((room.adult_price * room.kids_price) / 100) *
                (room.qty + productQty),
            });
          } else {
            cartAcc.push(room);
          }

          return cartAcc;
        }, []);
        toast.success("Room added to cart successfully.");
        return { ...state, cart };
      }

      toast.success("Room added to cart successfully.");
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.room,
            selected_color: action.color,
            selected_size: action.size,
            qty: action.qty,
            sum:
              ((action.room.adult_price * action.room.kids_price) / 100) *
              action.qty,
          },
        ],
      };

    case REMOVE_FROM_CART:
      return {
        cart: state.cart.filter((item) => item.id !== action.product_id),
      };

    case CLEAR_CART:
      return {
        cart: []
      }

    case INCREMENT_QUANTITY:
      const inc_productId = action.room.id;
      const new_cart = state.cart.reduce((cartAcc, room) => {
        if (room.id === inc_productId) {
          cartAcc.push({
            ...room,
            qty: room.qty + 1,
          });
        } else {
          cartAcc.push(room);
        }
        return cartAcc;
      }, []);
      return { ...state, cart: new_cart };

    case DECREMENT_QUANTITY:
      const decProductId = action.product_id;
      const decCart = state.cart.reduce((cartAcc, product) => {
        if (product.id === decProductId) {
          cartAcc.push({
            ...product,
            qty: minValueOne(product.qty - 1),
          });
        } else {
          cartAcc.push(product);
        }
        return cartAcc;
      }, []);

      return { ...state, cart: decCart };

    default:
      return state;
  }
};

export default cartReducer;
