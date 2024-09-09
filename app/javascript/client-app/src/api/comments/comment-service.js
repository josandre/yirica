import axios from "axios";
import {useMutation, useQuery} from "react-query";
import {getHeader} from "../header";


const base_url = 'http://localhost:3000/comments'

export const useAddComment = () => {
  return useMutation((params) => addComment(params.request));
}

const addComment = async (request) => {
  const response = await axios.post(base_url, request, getHeader());
  return response.data;
}