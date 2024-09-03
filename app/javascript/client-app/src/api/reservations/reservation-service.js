import axios from "axios";
import { useQuery } from "react-query";


const base_url = 'http://localhost:3000/users'

export const useGetReservationByUser = (user_id, token) => {
  return useQuery('reservationByUser', () =>fetchReservationByUserId(user_id, token));
}

const fetchReservationByUserId = async (user_id, token) => {
  console.log("id", user_id)
  const endpoint = `${base_url}/${user_id}/reservations`;
  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

