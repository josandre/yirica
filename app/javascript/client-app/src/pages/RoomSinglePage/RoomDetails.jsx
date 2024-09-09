import React, {useMemo, useState} from 'react'
import { Link } from 'react-router-dom'
import {userIsLogged} from "../../utils";
import {useAddComment} from "../../api/comments/comment-service";
import {toast} from "react-toastify";


const RoomDetails = ({ room, room_type, image_rooms, amenities, services, comments })  => {
    const url = window.location.href;

    const [commentsList, setCommentsList] = useState(comments);

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const roomId = useMemo(() => url.split("/").pop(), [])
    const { isUserLogged, userId, token} = userIsLogged()
    const addCommentMutation = useAddComment()

    const SubmitHandler = (e) => {
        e.preventDefault()

        if(review.length < 1){
            toast.error("You need to add a valid comment")
            return
        }

        const request = {
            comment: {
                comment: review,
                punctuation: rating,
                user_id: userId,
                room_id: roomId,
            }
        }

        addCommentMutation.mutate({ request }, {
            onSuccess: (res) => {
                if(!res.data.is_legal) {
                    toast.warn("Your comment is under review, it will show up as soon as our moderator approves")
                    return
                }

                setCommentsList([...commentsList, res.data])
            }
        })

        setRating(0);
        setReview('');
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <div className="Room-details-area pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12">
                        <div className="room-description">
                            <div className="room-title">
                                <h2>Description</h2>
                            </div>
                            <p className="p-wrap">{room_type.description}</p>
                        </div>
                        <div className="room-details-service">
                            <div className="row">
                                <div className="room-details-item">
                                    <div className="row">
                                        <div className="col-md-5 col-sm-5">
                                            <div className="room-d-text">
                                                <div className="room-title">
                                                    <h2>Amenities</h2>
                                                </div>
                                                <ul>
                                                    {amenities.map((amenity, index) => (
                                                      <li key={index}>
                                                          <Link onClick={ClickHandler} to="#">
                                                              {amenity.name}
                                                          </Link>
                                                      </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-7">
                                            <div className="room-d-img">
                                                <img src={image_rooms[0].image} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-7 col-sm-7">
                                            <div className="room-d-img">
                                                <img src={image_rooms[0].image} alt=""/>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-5">
                                            <div className="room-d-text2">
                                                <div className="room-title">
                                                    <h2>Room Services</h2>
                                                </div>
                                                <ul>
                                                    {services.map((service, index) => (
                                                      <li key={index}>
                                                          <Link onClick={ClickHandler} to="#">
                                                              {service.name}
                                                          </Link>
                                                      </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-area">
                        </div>
                        <div className="room-review">
                            <div className="room-title">
                                <h2>Room Reviews</h2>
                            </div>

                            {commentsList.map((comment, index) => (
                              <div key={index} className="review-item">
                                  <div className="review-text">
                                      <div className="r-title">
                                          <h2>{comment.user.name} {comment.user.last_name}</h2>
                                          <ul>
                                              {[...Array(comment.punctuation)].map((_, starIndex) => (
                                                <li key={starIndex}>
                                                    <i className="fa fa-star" aria-hidden="true"></i>
                                                </li>
                                              ))}
                                          </ul>
                                      </div>
                                      <p>{comment.comment}</p>
                                  </div>
                              </div>
                            ))}

                        </div>

                        {isUserLogged && (
                          <div className="add-review">
                              <div className="room-title">
                                  <h2>Add Review</h2>
                              </div>
                              <div className="wpo-blog-single-section review-form ">
                                  <div className="give-rat-sec">
                                      <p>Your rating *</p>
                                      <div className="give-rating">
                                          {[1, 2, 3, 4, 5].map((starValue) => (
                                            <label key={starValue}>
                                                <input
                                                  type="radio"
                                                  name="stars"
                                                  value={starValue}
                                                  checked={rating === starValue}
                                                  onChange={() => setRating(starValue)} // Update rating
                                                />
                                                {Array(starValue).fill().map((_, i) => (
                                                  <span key={i} className="icon">★</span>
                                                ))}
                                            </label>
                                          ))}
                                      </div>
                                  </div>
                                  <div className="review-add">
                                      <div className="comment-respond">
                                          <form id="commentform" className="comment-form" onSubmit={SubmitHandler}>
                                              <div className="form-textarea">
                                                    <textarea
                                                      id="comment"
                                                      placeholder="Your Review"
                                                      value={review}
                                                      onChange={(e) => setReview(e.target.value)}
                                                    ></textarea>
                                              </div>
                                              <div className="form-check">

                                              </div>
                                              <div className="form-submit">
                                                  <input id="submit" value="Submit Now" type="submit" />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomDetails;