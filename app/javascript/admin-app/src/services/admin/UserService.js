import axios from 'axios'
import {
  useQuery
} from 'react-query'
import { BASE_ADMIN_URL } from './constants'
import { userIsLogged } from '../../constants/AuthConstant';

const BASE_ADMIN_USER_URL = `${BASE_ADMIN_URL}/users`

export const useGetAllUsers = () => {
  return useQuery('users', getAllUsers)
}

const  getAllUsers = async () => {
	const { token } = userIsLogged()
  
  const response = await axios.get(BASE_ADMIN_USER_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}