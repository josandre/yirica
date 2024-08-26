import axios from "axios";
import {useMutation} from "react-query";


const base_url = 'http://localhost:3000'

export const useSignUp = () => {
  return useMutation(signUp)
}

export const useSignIn = () => {
  return useMutation(signIn)
}

const signUp = (data) => {
  const endpoint = `${base_url}/signup`

  const userData = {
    'user': {
      name: data.name,
      last_name: data.last_name,
      phone: data.phone,
      password: data.password,
      email: data.email
    }
  }

  return axios.post(endpoint, userData);
}

const signIn = (data) => {
  const endpoint = `${base_url}/login`
  const userData = {
    'user':{
      password: data.password,
      email: data.email
    }
  }

  return axios.post(endpoint, userData)
}
