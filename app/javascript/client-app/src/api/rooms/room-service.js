import axios from "axios";
import { useQuery } from "react-query";


const base_url = 'https://hotelhub-hdhrg0gsfmg9ahbr.centralus-01.azurewebsites.net/rooms'
// const base_url = 'http://localhost:3000/rooms'



export const useMostUsedRooms = () => {
  return useQuery('mostUsedRooms', fetchMostUsedRooms);
}

export const useSearchAvailableRooms = (params) => {
  const { checkIn, checkOut, adults, kids, rooms } = params
  return useQuery(
    'availableRooms',
    () => fetchAvailableRooms(checkIn, checkOut, adults, kids, rooms)
  );
}

export const useGetRoomById = (id) => {
  return useQuery(`roomById-${id}`, () =>fetchById(id));
}

export const useGetAllRooms = () => {
  return useQuery('allRooms', () => fetchAllRooms());
}

const fetchMostUsedRooms = async () => {
  const endpoint = `${base_url}/most_used`
  const response = await axios.get(endpoint);
  return response.data;
}

const fetchAvailableRooms = async (check_in, check_out, adults, kids, rooms) => {
  const endpoint = `${base_url}/search`
  const params = {check_in, check_out, adults, kids, rooms}
  const url = axios.getUri({url: endpoint, params })

  const response = await axios.get(url);
  return response.data;
}

const fetchAllRooms = async () => {
    const response = await axios.get(base_url)
    return response.data;
}

const fetchById = async (id) => {
  const endpoint = `${base_url}/${id}`
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }

}