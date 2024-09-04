import React from "react";
import { Link } from "react-router-dom";
import SectionTitleS2 from '../SectionTitleS2'

const SearchRooms = ({ rooms, addToCartProduct }) => {

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };


  return (
    <div className="wpo-room-area section-padding">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-md-8">
            <SectionTitleS2 MainTitle={'Search Result'} />
          </div>
        </div>
        <div className="room-wrap">
          <div className="row">
            {rooms.length > 0 &&
              rooms.slice(0, 6).map((room, item) => (
                <div className="col-lg-4 col-md-6 col-12" key={item}>
                  <div className="room-item">
                    <div className="room-img">
                      <img src={room.image_rooms[0].image} alt="" />
                    </div>
                    <div className="room-content">
                      <div>
                        <h2><Link onClick={ClickHandler} to={`/app/room-single/${room.id}`}>{room.room_type.name}</Link>
                        </h2>
                      </div>
                      <ul>
                        <li><strong>Capacity</strong> {room.room_type.max_people}</li>
                        {room.room_type.kids_accepted && (
                          <li><strong>Children accepted</strong></li>
                        )}
                      </ul>
                        <h3>${room.adult_price} <span>Adult / Night</span></h3>
                        {room.room_type.kids_accepted && (
                          <h3>${room.kids_price} <span>Kid / Night</span></h3>
                        )}
                      <div className="add-to-cart">
                        <button
                          className="theme-btn mt-3"
                          data-bs-toggle="tooltip"
                          data-bs-html="true"
                          title="Add to Cart"
                          onClick={() =>  addToCartProduct(room)}>
                          Select this room
                        </button>
                      </div>
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

export default SearchRooms;
