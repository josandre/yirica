import React, { Fragment } from 'react';
import PageTitle from '../../components/pagetitle/PageTitle';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Scrollbar from '../../components/scrollbar';
import { connect } from "react-redux";
import Footer from '../../components/footer';
import Logo from '../../images/logo.png';
import RoomDetails from './RoomDetails';
import { useGetRoomById } from "../../api/rooms/room-service";


const RoomSinglePage = () => {
  const { id } = useParams();
  const { data: roomData, error, isLoading } = useGetRoomById(id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading room</div>;
  const { room, room_type, image_rooms } = roomData || {};
  if (!room) return <div>No room data found</div>;

  return (
    <Fragment>
      <Navbar topbarBlock={'wpo-header-style-2'} Logo={Logo}/>
      <PageTitle pageTitle={room_type ? room_type.name : null} pagesub={'Room'} />
      <div className="room-details-section">
        <div className="room-details-inner">
          <div className="wpo-hotel-details-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="wpo-hotel-details-wrap">
                    <div className="wpo-hotel-details-area">
                      <form className="clearfix">
                        <div className="details-sub">
                          <span>BEDS</span>
                          <h2>{room.beds} Double Bed</h2>
                        </div>
                        <div className="details-sub">
                          <span>ROOM SIZE</span>
                          <h2>870 sq ft / {room.sqm} sqm</h2>
                        </div>
                        <div className="details-sub">
                          <span>OCCUPANCY</span>
                          <h2>{room_type.max_people} People</h2>
                        </div>
                        <div className="details-sub">
                          <span>Bathrooms</span>
                          <h2>{room.bathrooms} Shower bath</h2>
                        </div>
                        <div className="details-sub">
                          <span> /Night</span>
                          <h2>${room.adult_price} Adults</h2>
                          {room_type.kids_accepted && (
                            <h2> ${room.kids_price} Kids</h2>
                          )}
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RoomDetails room={room} room_type={room_type} image_rooms={image_rooms} />
        </div>
      </div>

      <Footer />
      <Scrollbar />
    </Fragment>
  );
};



export default connect(null)(RoomSinglePage);
