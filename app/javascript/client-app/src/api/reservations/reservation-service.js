import axios from "axios";
import { useQuery } from "react-query";


const base_url = 'http://localhost:3000/users'
const base_url_reservations = 'http://localhost:3000'

export const useGetReservationByUser = (user_id, token, options) => {
  return useQuery(
    `reservationByUser-${user_id}`,
    () =>fetchReservationByUserId(user_id, token),
    options);
}

export const useGetReservationBySearchCode = (search_code, options) => {
  return useQuery(
    `reservationBySearchCode-${search_code}`,
    () =>fetchReservationBySearchCode(search_code),
    options);
}

const fetchReservationByUserId = async (user_id, token) => {
  const endpoint = `${base_url}/${user_id}/reservations`;
  const response = await axios.get(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}

const fetchReservationBySearchCode = async (search_code) => {
  const endpoint = `${base_url_reservations}/reservations/${search_code}`;
  const response = await axios.get(endpoint)

  return response.data;

}

