import React from "react";
import { Link } from "react-router-dom";
import SectionTitleS2 from '../SectionTitleS2'

const SearchRooms = ({ rooms, addToCartProduct }) => {

  console.log("rooms", rooms)
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
                      <img src={'https://media.istockphoto.com/id/927375342/es/foto/mujer-bebiendo-t%C3%A9-en-el-balc%C3%B3n-con-vistas-a-campos-de-arroz.jpg?s=1024x1024&w=is&k=20&c=wCHTGz3SZXxmIqYlO-pmiOynZBLiHqTUj15psdRsXKQ='} alt="" />
                    </div>
                    <div className="room-content">
                      <h2><Link onClick={ClickHandler} to={`/room-single/${room.id}`}>{'title'}</Link></h2>
                      <ul>
                          <li><strong>Capacity:</strong> {10}</li>
                          <li><strong>Max Children:</strong> {10}</li>
                      </ul>
                      <h3>${10} <span>/ Night</span></h3>
                      <div className="add-to-cart">
                            <button
                            className="theme-btn mt-3"
                              data-bs-toggle="tooltip"
                              data-bs-html="true"
                              title="Add to Cart"
                              onClick={() => addToCartProduct(room)}
                            >
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
