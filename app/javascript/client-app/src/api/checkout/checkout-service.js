import {useMutation} from "react-query";
import axios from "axios";

const base_url = 'http://localhost:3000'

export const useCheckout = () => {
  return useMutation(checkout)
}

const checkout = (data) => {
  const endpoint = `${base_url}/checkout`
  return axios.post(endpoint, data);
}