import React, {useEffect, useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"
import {decodeJWT} from "../../utils";
import {useMostUsedRooms} from "../../api/rooms/room-service";
import {useGetReservationByUser} from "../../api/reservations/reservation-service";
import ReservationList from "../ReservationList/ReservationList";



const SearchBar = () => {

  const token = localStorage.getItem('token');

  let reservationsList = []
  if(token){
    const token_decoded = decodeJWT(token)
    const user_id = token_decoded.user_id
    const { data: reservations, error, isLoading } = useGetReservationByUser(user_id, token);
    reservationsList = reservations;

    if (isLoading || !reservations) return <div>Loading...</div>;
    if (error) return <div>Error loading reservations</div>;
  }




  const SubmitHandler = () => {
    console.log("hello")
  }


  return (
    <div className="wpo-select-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="wpo-select-wrap">
              <div className="wpo-select-area">
                <form onSubmit={SubmitHandler}>
                  <div className="search-container">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search here..."
                    />
                    <button type="submit">
                      <i className="fi flaticon-search"></i>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </div>
        <ReservationList reservations={reservationsList}/>
      </div>
    </div>

  )
}


export default SearchBar;

