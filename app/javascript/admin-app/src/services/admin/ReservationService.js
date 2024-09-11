import axios from 'axios'
import {
  useQuery
} from 'react-query'
import { BASE_ADMIN_URL } from './constants'
import { userIsLogged } from '../../constants/AuthConstant';

const BASE_ADMIN_RESERVATION_URL = `${BASE_ADMIN_URL}/reservations`

export const useGetAllReservations = () => {
  return useQuery('reservations', getAllReservations)
}


export const useGetReservationStates = () => {
  return useQuery('reservation-states', getReservationStates)
}

const  getAllReservations = async () => {
	const { token } = userIsLogged()
  
  const response = await axios.get(BASE_ADMIN_RESERVATION_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}

const  getReservationStates = async () => {
	const { token } = userIsLogged()
  
  const response = await axios.get(`${BASE_ADMIN_URL}/reservation_states`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}
