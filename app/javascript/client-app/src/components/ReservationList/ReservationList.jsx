import React from 'react';
import SectionTitleS2 from "../SectionTitleS2";
import "./styles.css"
import {Link} from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };

  const parts = date.toLocaleDateString('en-US', options).replace(/,/g, '').split(' ');

  return `${parts[0]} ${parts[1]}  ${parts[2]}`;
};


const ReservationList = ({ reservations }) => {
  const amountOfKids = (reservation) => {
    const reservationRoom = reservation.reservation_room[0];
    const kids = reservationRoom.kids_amount;
    const adults = reservationRoom.adults_amount;
    return [kids, adults];
  };

  const clickHandler =  () =>{

  }

  return (
    <div className={`wpo-destination-area ${reservations.length === 1 ? 'single-reservation' : ''}`}>
      <div className="container">
        <SectionTitleS2 MainTitle={''} link={'/destination'}/>
        <div className="destination-wrap">
          <div className={`row ${reservations.length === 1 ? 'justify-content-center' : ''}`}>
            {reservations.map((reservation, index) => {
              const [kids, adults] = amountOfKids(reservation);

              return (
                <div className="col-lg-4 col-md-6 col-12" key={reservation.id}>
                  <div className="destination-item">
                    <div className="destination-img"></div>
                    <div className="destination-content">
                      <div className="reservation-header">
                    <span className="sub">
                      {reservation.search_code || "No code"}
                    </span>
                        <span
                          className={`status ${reservation.reservation_state.state
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                        >
                      {reservation.reservation_state.state}
                    </span>
                      </div>
                      <h2 className="date-reservation-title">
                        {formatDate(reservation.checking_date)} -{" "}
                        {formatDate(reservation.checkout_date)}
                      </h2>

                      <div className='content-rooms'>
                        {reservation.reservation_room.map((reservationRoom, roomIndex) => (
                          <div className="destination-bottom" key={roomIndex} style={{display: 'inline'}}>
                            <p className="room-capacity">
                              <h2 className='room-type'>
                                <Link onClick={clickHandler} to={`/app/room-single/${reservationRoom.room_id}`}>
                                  {reservationRoom.room.room_type.name}
                                </Link>
                              </h2>
                              {roomIndex !== reservation.reservation_room.length - 1 && (
                                <span className="separator">|</span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p className="room-capacity">
                        <span className="children-accepted">Kids {kids}</span>
                        <span className="separator">|</span>
                        <span className="children-accepted">Adults {adults}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
