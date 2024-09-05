import { Link } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const RoomsList = ({ rooms }) => {

  console.log("rooms", rooms)
  const ClickHandler = (e) => {
    // Add your click handler logic here
  }

  return (
    <div className="wpo-room-area section-padding">
      <div className="container">
        <div className="room-wrap">
          <div className="row">
            {rooms.length > 0 &&
              rooms.map((room, index) => (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <div className="room-item">
                    <div className="room-img">
                      <img
                        src={room.image_rooms.length > 0
                          ? room.image_rooms[0].image
                          : "https://placehold.co/30/cccccc/000000/600x400.png?text=NO IMAGE"}
                        alt="Room Image"
                      />
                    </div>
                    <div className="room-content">
                      <h2>
                        <Link onClick={ClickHandler} to={`/app/room-single/${room.id}`}>
                          {room.room_type.name}
                        </Link>
                      </h2>
                      <ul>
                        <li>
                          <i className="fi flaticon-expand-arrows"></i>{room.sqm} sqm
                        </li>
                        <li>
                          <i className="fi flaticon-bed"></i>{room.beds} Bed
                        </li>
                        <li>
                          <i className="fi flaticon-bathtub"></i>{room.bathrooms} Bathroom
                        </li>

                      </ul>
                      <ul>
                        {room.room_type.kids_accepted && (
                          <li>
                            <i className="fi flaticon-user"></i>Kids Accepted
                          </li>
                        )}
                      </ul>
                      <h3>${room.adult_price} <span>/ Night</span></h3>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null)(RoomsList);
