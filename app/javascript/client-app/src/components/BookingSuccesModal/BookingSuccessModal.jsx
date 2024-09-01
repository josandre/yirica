import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const BookingSuccessModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="order-top">
          <h2 className='white-color'>Thank You for Your
            Booking! <span>Your reservation has been successfully received.</span></h2>
          <h3 className='white-color'>A confirmation email with your reservation and billing details has been sent to
            you. We look forward to welcoming you soon!</h3>
          <Link to='/app' className="theme-btn" onClick={onClose}>Back Home</Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
