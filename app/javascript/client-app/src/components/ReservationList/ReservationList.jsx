import React from 'react';
import { Link } from 'react-router-dom'
import SectionTitleS2 from "../SectionTitleS2";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };

  const parts = date.toLocaleDateString('en-US', options).replace(/,/g, '').split(' ');

  // Format: Fri-Sep20-2024
  return `${parts[0]}-${parts[1]}${parts[2]}-${parts[3]}`;
};



const ReservationList = ({reservations}) => {
  console.log("reservations", reservations);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <div className={`wpo-destination-area `}>
      <div className="container">
        <SectionTitleS2 MainTitle={''} link={'/destination'}/>
        <div className="destination-wrap">
          <div className="row">

            {reservations.map((reservation, index) => (
              <div className="col-lg-4 col-md-6 col-12">
                <div className="destination-item">
                  <div className="destination-img">
                    {/*<img  alt="test"/>*/}
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

                    <h2 className='date-reservation-title'>
                      {formatDate(reservation.checking_date)} to {formatDate(reservation.checkout_date)}
                    </h2>
                    <div className="destination-bottom">
                      <p>$00 Per Night</p>
                      <div className="destination-bottom-right">
                        <ul>
                          <li><i className="fa fa-star" aria-hidden="true"></i></li>
                          <li><i className="fa fa-star" aria-hidden="true"></i></li>
                          <li><i className="fa fa-star" aria-hidden="true"></i></li>
                          <li><i className="fa fa-star" aria-hidden="true"></i></li>
                          <li><span><i className="fa fa-star" aria-hidden="true"></i></span></li>
                        </ul>
                        <small>4.5</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>

  )

}

export default ReservationList;
