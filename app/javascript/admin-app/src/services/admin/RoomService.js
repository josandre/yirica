import axios from 'axios'
import {
  useMutation,
  useQuery
} from 'react-query'
import { BASE_ADMIN_URL } from './constants'
import { userIsLogged } from '../../constants/AuthConstant';

const BASE_ADMIN_ROOM_URL = `${BASE_ADMIN_URL}/rooms`

export const useGetAllRooms = () => {
  return useQuery('rooms', getAllRooms)
}

export const useGetRoomTypes = () => {
  return useQuery('room-types', getRoomTypes)
}

export const useCreateNewRoom = () => {
  return useMutation(createNewRoom)
}

const createNewRoom = (data) => {
	const { token } = userIsLogged()
  
  const request = {
    room: {
        adult_price: data.adultPrice,
        kids_price: data.kidsPrice,
        number: parseInt(data.number, 10),
        location: data.location,
        room_type_id: data.type,
        is_beachfront: data.isBeachFront,
        sqm: parseInt(data.sqm, 10),
        bathrooms: parseInt(data.bathrooms, 10),
        beds: parseInt(data.beds, 10),
        image: data.image
    }
};

  const response = axios.post(BASE_ADMIN_ROOM_URL, request, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response
}

const  getAllRooms = async () => {
	const { token } = userIsLogged()
  
  const response = await axios.get(BASE_ADMIN_ROOM_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}

const  getRoomTypes = async () => {
	const { token } = userIsLogged()
  
  const response = await axios.get(`${BASE_ADMIN_URL}/room_types`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}
