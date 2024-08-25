import React from "react";
import { Link } from "react-router-dom";
import SectionTitleS2 from '../SectionTitleS2'
import { connect } from "react-redux";
import {useMostUsedRooms} from "../../api/rooms/room-service";


const Rooms = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { data: rooms, error, isLoading } = useMostUsedRooms();
  console.log("lenght", rooms)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rooms</div>;



  return (
    <div className="wpo-room-area section-padding">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-md-8">
            <SectionTitleS2 MainTitle={'Our Most Popular Room'} />
          </div>
        </div>
        <div className="room-wrap">
          <div className="row">
            {rooms.length > 0 &&
              rooms.slice(0, 3).map((room, item) => (
                <div className="col-lg-4 col-md-6 col-12" key={item}>
                  <div className="room-item">
                    <div className="room-img">
                      <img src={'https://media.istockphoto.com/id/927375342/es/foto/mujer-bebiendo-t%C3%A9-en-el-balc%C3%B3n-con-vistas-a-campos-de-arroz.jpg?s=1024x1024&w=is&k=20&c=wCHTGz3SZXxmIqYlO-pmiOynZBLiHqTUj15psdRsXKQ='} alt="" />
                    </div>
                    <div className="room-content">
                      <h2><Link onClick={ClickHandler} to={`/room-single/${room.id}`}>{room.room_type.name}</Link></h2>
                      <ul>
                        <li><i className="fi flaticon-expand-arrows"></i>{room.sqm} sqm</li>
                        <li><i className="fi flaticon-bed"></i>{room.beds} Bed</li>
                        <li><i className="fi flaticon-bathtub"></i>{room.bathrooms} Bathroom</li>
                      </ul>
                      <h3>${room.adult_price} <span>/ Night</span></h3>
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

export default connect(null)(Rooms);
