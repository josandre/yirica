import {useMutation} from "react-query";
import axios from "axios";


const base_url = "https://hotelhub-hdhrg0gsfmg9ahbr.centralus-01.azurewebsites.net"
// const base_url = 'http://localhost:3000'

export const useCheckout = () => {
  return useMutation(checkout)
}

const checkout = (data) => {
  const endpoint = `${base_url}/checkout`
  return axios.post(endpoint, data);
}