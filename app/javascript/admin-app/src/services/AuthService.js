import axios from 'axios'
import { BASE_APP_URL } from './admin/constants'
import { useMutation } from 'react-query'

export const useSignIn = () => {
	return useMutation(signIn)
}

const signIn = (data) => {
  const endpoint = `${BASE_APP_URL}/login`

  const userData = {
    'user':{
      password: data.password,
      email: data.email
    }
  }

  return axios.post(endpoint, userData)
}