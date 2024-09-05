import React, { useEffect, useMemo, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import { decodeJWT } from "../../utils";
import { useGetAllRooms } from "../../api/rooms/room-service";
import RoomsList from "../RoomsList/RoomsList";

const SearchBarRooms = () => {
  const token = localStorage.getItem('token');
  const [searchRoom, setSearchRoom] = useState('');
  const [allRooms, setAllRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  let userId = useMemo(() => {
    if (!token) {
      return undefined;
    }

    const decoded_token = decodeJWT(token);
    return decoded_token.user_id;
  }, [token]);

  const { data: rooms, error, isLoading } = useGetAllRooms();

  useEffect(() => {
    if (rooms) {
      setAllRooms(rooms.data);
      setFilteredRooms(rooms.data);
    }
  }, [rooms]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rooms</div>;

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchRoom(searchValue);

    if (searchValue.trim() === "") {
      setFilteredRooms(allRooms);
    } else {
      const filtered = allRooms.filter((room) =>
        room.room_type.name.toLowerCase().includes(searchValue) ||
        room.adult_price.toString().includes(searchValue) // Adjust if `adult_price` is a number
      );
      setFilteredRooms(filtered);
    }
  };

  return (
    <div className="wpo-select-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="wpo-select-wrap">
              <div className="wpo-select-area">
                <div className="search-container">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here by room type or by price..."
                    value={searchRoom}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <RoomsList rooms={filteredRooms}></RoomsList>
      </div>
    </div>
  );
};

export default SearchBarRooms;
