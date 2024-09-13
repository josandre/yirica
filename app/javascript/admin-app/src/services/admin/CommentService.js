import axios from 'axios'
import {
  useMutation,
  useQuery
} from 'react-query'
import { BASE_ADMIN_URL } from './constants'
import { userIsLogged } from '../../constants/AuthConstant';

const BASE_ADMIN_COMMENT_URL = `${BASE_ADMIN_URL}/comments`
const BASE_ADMIN_RESPONSE_URL = `${BASE_ADMIN_URL}/responses`

export const useGetAllComments = () => {
  return useQuery('comments', getAllComments)
}

export const useSendResponse = () => {
  return useMutation(sendResponse)
}

const  getAllComments = async () => {
	const { token } = userIsLogged()
  
  const response = await axios.get(BASE_ADMIN_COMMENT_URL, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}

const sendResponse = (data) => {
	const { token } = userIsLogged()
  
  const request = {
    comment_response: {
        message: data.message,
        comment_id: data.commentId,
    }
};

  const response = axios.post(BASE_ADMIN_RESPONSE_URL, request, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  return response
}
