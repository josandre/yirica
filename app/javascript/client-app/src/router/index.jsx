import React from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "../pages/home/home";
import SignIn from "../pages/sign-in";
import SearchResults from "../pages/search-results";
import SignUp from "../pages/sign-up";
import ForgotPassword from "../pages/ForgotPassword";
import CheckoutPage from "../pages/CheckoutPage";
import RoomSinglePage from "../pages/RoomSinglePage";
import Reservations from "../pages/reservations/Reservations";
import AllRooms from "../pages/AllRooms";


const AllRoute = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/app' element={<Home />} />
            <Route path='/app/home' element={<Home />} />
          <Route path='/app/sign-in' element={<SignIn />} />
          <Route path='/app/search-result' element={<SearchResults />} />
          <Route path='/app/sign-up' element={<SignUp />} />
          <Route path='/app/forgot-password' element={<ForgotPassword />} />
          <Route path='/app/checkout' element={<CheckoutPage />} />
          <Route path='/app/room-single/:id' element={<RoomSinglePage />} />
          <Route path='/app/reservations' element={<Reservations />} />
          <Route path='/app/rooms' element={<AllRooms />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default AllRoute;
