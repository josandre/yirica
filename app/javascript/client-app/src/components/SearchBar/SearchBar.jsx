import React, {useEffect, useMemo, useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { decodeJWT } from "../../utils";
import {useGetReservationBySearchCode, useGetReservationByUser} from "../../api/reservations/reservation-service";
import ReservationList from "../ReservationList/ReservationList";


const SearchBar = () => {
  const token = localStorage.getItem('token');

  const [searchCode, setSearchCode] = useState('');
  const [manualSearch, setManualSearch] = useState(false);
  const [searched, setSearched] = useState(false);
  const [allReservations, setAllReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);

  let userId = useMemo(() => {
    if(!token) {
      return undefined
    }

    const decoded_token = decodeJWT(token);

    return decoded_token.user_id
  }, [token]);

  let isUserLoggedIn = useMemo(() => userId !== undefined, [userId])

  const { data: reservation, error: searchByCodeError, isLoading: searchByCodeLoading } = useGetReservationBySearchCode(searchCode, {
    enabled: !isUserLoggedIn && manualSearch,
    onError: (err) => {
      setManualSearch(false);
      setSearched(true);
      setFilteredReservations([]);
    },
    retry: () => false
  })

  const { data: reservations, error, isLoading } = useGetReservationByUser(userId, token, {
    enabled: isUserLoggedIn
  });


  useEffect(() => {
    if (isUserLoggedIn && reservations) {
      setAllReservations(reservations ?? [])
      setFilteredReservations(reservations);
    }
    else if(!isUserLoggedIn && reservation) {
      const reservationFound = []
      reservationFound.push(reservation)
      setManualSearch(false)
      setSearched(true);
      setFilteredReservations(reservationFound);
    }

  }, [reservations, reservation]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;

    if(isUserLoggedIn) {
      setFilteredReservations(allReservations.filter(reservation => {
        return reservation.search_code?.includes(value)
      }));
    }

    setSearchCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUserLoggedIn) {
      const filtered = allReservations.filter((reservation) =>
        reservation.search_code &&
        reservation.search_code.toLowerCase().includes(searchCode.toLowerCase())
      );

      setFilteredReservations(filtered);
    }else{
      setManualSearch(true);
    }
  };

  if (isLoading || searchByCodeLoading) {
    return <div>Loading...</div>;
  }

  if (error || searchByCodeLoading) {
    return <div>Error loading reservations</div>;
  }

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
                      value={searchCode}
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
        <ReservationList reservations={filteredReservations} isUserLogged={isUserLoggedIn} manualSearch={manualSearch || searched} />
      </div>
    </div>
  );
};

export default SearchBar;
