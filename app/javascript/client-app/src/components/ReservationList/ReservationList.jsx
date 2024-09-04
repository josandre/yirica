import React from 'react';
import SectionTitleS2 from "../SectionTitleS2";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };

  const parts = date.toLocaleDateString('en-US', options).replace(/,/g, '').split(' ');

  return `${parts[0]} ${parts[1]}  ${parts[2]}`;
};


const ReservationList = ({ reservations }) => {

  const rowClass = reservations.length === 1 ? 'row justify-content-center' : 'row';

  return (
    <div className={`wpo-destination-area`}>
      <div className="container">
        <SectionTitleS2 MainTitle={''} link={'/destination'} />
        <div className="destination-wrap">
          <div className={rowClass}>
            {reservations.map((reservation, index) => (
              <div className="col-lg-4 col-md-6 col-12" key={reservation.id}>
                <div className="destination-item">
                  <div className="destination-img">

                  </div>
                  <div className="destination-content">
                    <div className="reservation-header">
                      <span className="sub">
                        {reservation.search_code || "No code"}
                      </span>
                      <span className={`status ${reservation.reservation_state.state.toLowerCase().replace(/\s+/g, '-')}`}>
                        {reservation.reservation_state.state}
                      </span>
                    </div>
                    <h2 className="date-reservation-title">
                      {formatDate(reservation.checking_date)} - {formatDate(reservation.checkout_date)}
                    </h2>

                    {reservation.reservation_room.map((reservationRoom, roomIndex) => (
                      <div className="destination-bottom" key={roomIndex}>
                        <div className="room-details">
                          {/* Room Type */}
                          <h3 className="room-type">
                            <u>{reservationRoom.room.room_type.name}</u>
                          </h3>

                          {/* Capacity and Children Accepted */}
                          <p className="room-capacity">
                            Capacity <strong>{reservationRoom.room.room_type.max_people}</strong>
                            <span className="children-accepted">
          {reservationRoom.room.room_type.kids_accepted ? 'Children accepted' : 'Children not accepted'}
        </span>
                          </p>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
