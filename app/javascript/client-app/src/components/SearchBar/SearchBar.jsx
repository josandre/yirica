import React, { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { decodeJWT } from "../../utils";
import { useGetReservationByUser } from "../../api/reservations/reservation-service";
import ReservationList from "../ReservationList/ReservationList";


const SearchBar = () => {
  const token = localStorage.getItem('token');

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);

  let reservationsList = [];
  if (token) {
    const token_decoded = decodeJWT(token);
    const user_id = token_decoded.user_id;
    const { data: reservations, error, isLoading } = useGetReservationByUser(user_id, token);
    reservationsList = reservations;

    useEffect(() => {
      if (reservations) {
        setFilteredReservations(reservations);
      }
    }, [reservations]);

    if (isLoading || !reservations) return <div>Loading...</div>;
    if (error) return <div>Error loading reservations</div>;
  }

  console.log(reservationsList);
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = reservationsList.filter((reservation) =>
      reservation.search_code &&
      reservation.search_code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredReservations(filtered);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filtered = reservationsList.filter((reservation) =>
      reservation.search_code &&
      reservation.search_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReservations(filtered);
  };




  return (
    <div className="wpo-select-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="wpo-select-wrap">
              <div className="wpo-select-area">
                <form onSubmit={handleSubmit}>
                  <div className="search-container">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search here by reservation code..."
                      value={searchQuery}
                      onChange={handleSearchInputChange}
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
        <ReservationList reservations={filteredReservations} />
      </div>
    </div>
  );
};

export default SearchBar;
