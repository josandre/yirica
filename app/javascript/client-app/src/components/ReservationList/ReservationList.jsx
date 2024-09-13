import React, {useState} from 'react';
import SectionTitleS2 from "../SectionTitleS2";
import "./styles.css"
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SimpleReactValidator from "simple-react-validator";
import {useCreateCancelRequest} from "../../api/cancelRequests/cancel-request-service";
import {toast} from "react-toastify";
import { useQueryClient } from 'react-query';


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };

  const parts = date.toLocaleDateString('en-US', options).replace(/,/g, '').split(' ');
  return `${parts[0]} ${parts[1]}  ${parts[2]}`;
};

const ReservationList = ({ reservations, isUserLogged, manualSearch, userId }) => {
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const cancelRequestMutation = useCreateCancelRequest()

  const amountOfKids = (reservation) => {
    const reservationRoom = reservation.reservation_room[0];
    const kids = reservationRoom.kids_amount ;
    const adults = reservationRoom.adults_amount ;
    return [kids, adults];
  };

  const [value, setValue] = useState({
    reason: ''});

  const cancelRequest = (reservationId) => {
    setShowModal(true)
    setSelectedReservationId(reservationId)
  }

  const handleClose = () => {
    setShowModal(false)
    setSelectedReservationId(null)
  }

  const [validator] = React.useState(new SimpleReactValidator({
    className: 'errorMessage'
  }));

  const changeHandler = (e) => {
    setValue({...value, [e.target.name]: e.target.value});
    validator.showMessages();
  };

  const handleSaveChange = (e) => {
    if (validator.allValid()) {
      const params = {
        reason: value.reason,
        reservationId: selectedReservationId

      }


      cancelRequestMutation.mutate({ params }, {

        onSuccess: (res) => {
          queryClient.invalidateQueries(`reservationByUser-${userId}`);
          toast.success(res.data.status.message)
          handleClose();
        },
        onError: (err) => {
          console.log("error", err);
          toast.error("The request can not be created, contact support.")
        }
      })


    } else {

      setValue({...value, [e.target.name]: e.target.value});
      validator.showMessages();

    }
  }

  const notLoggedInEmptyState = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card text-center p-4">
            <h2>You can search your reservation</h2>
            <p>Use the search code sent in your reservation email to find your booking information.</p>
          </div>
        </div>
      </div>
    )
  }

  const emptyListState = () => {
    return (
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="card text-center p-4">
            <h2>No reservations found</h2>
            <p>You currently don't have any reservations. Start booking now!</p>
          </div>
        </div>
      </div>
    )
  }
  let subtitle;

  const reservationListComponent = () => {
    return <>

      <div className="destination-wrap">

        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Reason to request a cancellation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <TextField
             label="Reason"
             placeholder="Enter the reason for cancellation"
             fullWidth
             multiline
             rows={4}
             value={value.reason}
             variant="outlined"
             name="reason"
             InputLabelProps={{
               shrink: true,
             }}
             onBlur={(e) => changeHandler(e)}
             onChange={(e) => changeHandler(e)}
           />{validator.message('reason', value.reason, 'required|alpha_space')}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => handleSaveChange(e)}
                    className="theme-btn"
                    data-bs-toggle="tooltip"
                    data-bs-html="true"
            >Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


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
                              <Link to={`/app/room-single/${reservationRoom.room_id}`}>
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

                    {reservation.reservation_state.state === 'Active' && (
                      <div className="add-to-cart display-box">
                        <button
                          className="theme-btn mt-3"
                          data-bs-toggle="tooltip"
                          data-bs-html="true"
                          title="Add to Cart"
                          onClick={() => cancelRequest(reservation.id)}
                        >
                          Cancel request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  }

  return (
    <div className={`wpo-destination-area ${reservations.length === 1 ? 'single-reservation' : ''}`}>
      <div className="container">
        <SectionTitleS2 MainTitle={''} link={'/destination'}/>
        {
          isUserLogged || manualSearch ?
            (reservations.length > 0 ? reservationListComponent() : emptyListState()) :
            notLoggedInEmptyState()
        }
      </div>
    </div>
  );
};

export default ReservationList;
