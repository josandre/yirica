import {useMutation} from "react-query";
import axios from "axios";

const base_url = 'http://localhost:3000/rooms'

export const useCheckout = () => {
  return useMutation(checkout)
}

const checkout = (data) => {
  const endpoint = `${base_url}/checkout`

  const userData = {
    'user_id': data.userId,
    'card': {
      number: data.number,
      exp_month: data.exp_month,
      exp_year:  data.exp_year,
      cvc: data.cvc,
    },
    'reservation': {
      checkIn: data.reservation.checkIn,
      checkOut: data.reservation.checkOut,
      isRefundable: data.reservation.isRefundable,
    },
    'metadata': {
      room_type: data.info.roomType,
      kids: data.info.kids,
      total_kids: data.info.total_kids,
      adults: data.info.total_adults,
      rooms: data.info.rooms,
      total: data.info.total
    }
  }

  return axios.post(endpoint, userData);
}