import axios from "axios";
import {useMutation} from "react-query";

const server = 'http://localhost:3000/signup'

export const useSignUp = () => {
  return useMutation(signUp)
}

const signUp = (data) => {
  const userData = {
    'user': {
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      password: data.password,
      email: data.email
    }
  }

  return axios.post(server, userData);
}
