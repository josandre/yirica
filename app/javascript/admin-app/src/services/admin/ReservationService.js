import axios from 'axios'
import {
  useMutation,
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

export const useApproveOrRejectCancelRequest = () => {
  return useMutation(approveOrRejectCancelRequest)
}

const approveOrRejectCancelRequest = (data) => {
  const { token } = userIsLogged()

  const request = {
    reservation_id: data.reservationId,
    response: data.response,
    cancel_request_id: data.cancelRequestId
  };

  const response = axios.post(`${BASE_ADMIN_URL}/response_cancel_requests`, request, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response
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
