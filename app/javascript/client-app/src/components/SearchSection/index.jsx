import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {formatDateToYYYYMMDD, objectToQueryParams} from "../../utils";


const SearchSection = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchActive, setSearchState] = useState(false);
    const [adult, setCount] = useState(0);
    const [child, setChild] = useState(0);
    const [room, setRoom] = useState(0);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        validateForm()
    }, [startDate, endDate, adult, child, room]);

    const validateForm = () => {
        const isValid = startDate && endDate && adult > 0 && room >0
        setIsButtonEnabled(isValid)
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const adultIncrementCount = () => {
        setCount(adult + 1);
    };
    const adultDecrementCount = () => {
        setCount(adult - 1);
    };

    const childIncrementCount = () => {
        setChild(child + 1);
    };
    const childDecrementCount = () => {
        setChild(child - 1);
    };

    const roomIncrementCount = () => {
        setRoom(room + 1);
    };
    const roomDecrementCount = () => {
        setRoom(room - 1);
    };

    const getSelectedDataAsQueryParams = () => {
        const params = {
            checkIn: formatDateToYYYYMMDD(startDate),
            checkOut: formatDateToYYYYMMDD(endDate),
            adults: adult,
            kids: child,
            rooms: room
        }

        return objectToQueryParams(params);
    }


    return (
        <div className={`wpo-select-section ${props.svClass}`}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wpo-select-wrap">
                            <div className="wpo-select-area">
                                <form className="clearfix" onSubmit={SubmitHandler}>
                                    <div className="select-sub">
                                        <div className="input-group date">
                                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}
                                            minDate={new Date()}/>
                                            <i className="fi flaticon-calendar"></i>
                                        </div>
                                    </div>
                                    <div className="select-sub">
                                        <div className="input-group date">
                                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}
                                            minDate={startDate}/>
                                            <i className="fi flaticon-calendar"></i>
                                        </div>
                                    </div>
                                    <div className="select-sub">
                                        <div className="form-group tourist-group">
                                            <div className="tourist-group-wrap">
                                                <div className="tourist-inner" onClick={() => setSearchState(!searchActive)}>
                                                    <i className="fi flaticon-user"></i>
                                                    <ul>
                                                        <li><input disabled type="text" id="adults" value={adult}/>Adults
                                                        </li>
                                                        <li><input disabled type="text" id="children" value={child}/>
                                                            Children</li>
                                                        <li><input disabled type="text" id="rooms" value={room}/> Room</li>
                                                    </ul>
                                                    <i className={`ti-angle-down ${searchActive ? "rotate" : ""}`}></i>
                                                </div>
                                                <div className={`tourist-dropdown ${searchActive ? "active" : ""}`}>
                                                    <div className="tourist-item">
                                                        <span>Adults</span>
                                                        <div className="tourist-item-group">
                                                            <button type="button" onClick={adultDecrementCount} id="adults_dec">-</button>
                                                            <input disabled id="adults_val" value={adult} type="text" />
                                                            <button type="button" onClick={adultIncrementCount} id="adults_inc">+</button>
                                                        </div>
                                                    </div>
                                                    <div className="tourist-item">
                                                        <span>Children</span>
                                                        <div className="tourist-item-group">
                                                            <button type="button" onClick={childDecrementCount} id="children_dec">-</button>
                                                            <input disabled id="children_val" value={child} type="text" />
                                                            <button type="button" onClick={childIncrementCount} id="children_inc">+</button>
                                                        </div>
                                                    </div>
                                                    <div className="tourist-item">
                                                        <span>Rooms</span>
                                                        <div className="tourist-item-group">
                                                            <button type="button" onClick={roomDecrementCount} id="rooms_dec">-</button>
                                                            <input disabled id="rooms_val" value={room} type="text" />
                                                            <button type="button" onClick={roomIncrementCount} id="rooms_inc">+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="select-sub">
                                        <Link className="theme-btn"
                                              to={`/app/search-result?${getSelectedDataAsQueryParams()}`}
                                              onClick={e => !isButtonEnabled && e.preventDefault()}
                                              style={{
                                                  backgroundColor: isButtonEnabled ? '#081424' : 'gray',
                                                  cursor: isButtonEnabled ? 'pointer' : 'not-allowed',
                                                  color: 'white'
                                              }}>
                                            Check Availability
                                        </Link>
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


export default SearchSection;

