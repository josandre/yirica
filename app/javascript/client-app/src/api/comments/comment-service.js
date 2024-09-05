import axios from "axios";
import {useMutation, useQuery} from "react-query";


const base_url = 'http://localhost:3000/comments'

export const useAddComment = () => {
  return useMutation((params) => addComment(params.request, params.token));
}

const addComment = async (request, token) => {
  const response = await axios.post(base_url, request, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
}