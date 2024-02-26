import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./MyBooking.css";
import { myBookings } from "../../Redux/Action/userAction";

const mapDispatchToProps = (dispatch) => {
  return {
    myBookings: (id, token) => dispatch(myBookings(id, token)),
  };
};
const mapStateToProps = (state) => {
  return {
    booking: state.user.booking,
    token: state.auth.token,
    id: state.auth.userId,
  };
};

const MyBookings = (props) => {
  useEffect(() => {
    props.myBookings(props.id, props.token);
  }, []);
  return (
    <div className="booking">
      <h1 className="text-center">My Bookings</h1>
      <div className="cars">
        {props.booking &&
          props.booking.map((booking) => (
            <div className="booking-card" key={booking.id}>
              {new Date(booking.start_date) > new Date() ? (
                <p className="upcoming">Upcoming</p>
              ) : null}
              {new Date(booking.end_date) < new Date() ? (
                <p className="over">Over</p>
              ) : null}
              {new Date(booking.start_date) <= new Date() &&
              new Date(booking.end_date) >= new Date() ? (
                <p className="running">Running</p>
              ) : null}

              <img
                className="booking-card-image"
                src={`https://rentacar.pythonanywhere.com${booking.car.image}`}
              />
              <div className="booking-card-details">
                <span>Car: {booking.car.car_name}</span>
                <span>Start Date: {booking.start_date}</span>
                <span>End Date: {booking.end_date}</span>
                <span>Rent: {booking.price}৳</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBookings);
