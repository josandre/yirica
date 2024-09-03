import React, {useEffect, useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import {formatDateToYYYYMMDD, objectToQueryParams} from "../../utils";
import "./styles.css"



const SearchBar = () => {

  const SubmitHandler = () => {
    console.log("hello")
  }


  return (
    <div className="wpo-select-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="wpo-select-wrap">
              <div className="wpo-select-area">
                <form onSubmit={SubmitHandler}>
                  <div className="search-container">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search here..."
                    />
                    <button type="submit">
                      <i className="fi flaticon-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default SearchBar;

