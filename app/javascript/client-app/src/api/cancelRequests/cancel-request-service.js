import axios from "axios";
import {getHeader} from "../header";
import {useMutation} from "react-query";


const base_url = "http://localhost:3000/cancel_requests"

export const useCreateCancelRequest = () => {
  return useMutation((params) => cancelRequest(params));
}

const cancelRequest = (data) => {
  const endpoint = `${base_url}`

  const cancelRequestData = {
    'cancel_request': {
      reason: data.params.reason,
      reservation_id: data.params.reservationId,
    }
  }

  return axios.post(endpoint, cancelRequestData, getHeader());
}
