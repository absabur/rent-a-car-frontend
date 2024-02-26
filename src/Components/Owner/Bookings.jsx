import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./Booking.css";

import { ownerBookings } from "../../Redux/Action/ownerAction";

const mapDispatchToProps = (dispatch) => {
  return {
    ownerBookings: (id, token) => dispatch(ownerBookings(id, token)),
  };
};
const mapStateToProps = (state) => {
  return {
    booking: state.user.booking,
    token: state.auth.token,
    id: state.auth.userId,
  };
};

const Bookings = (props) => {
  useEffect(() => {
    props.ownerBookings(props.id, props.token);
  }, []);
  console.log(props.booking);
  return (
    <div className="booking">
      <h1 className="text-center">Booking of my cars</h1>
      <div className="cars">
        {props.booking &&
          props.booking.map((booking) => (
            <div className="owner-booking-card" key={booking.id}>
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
                className="owner-booking-card-image"
                src={`https://rentacar.pythonanywhere.com${booking.car.image}`}
              />
              <div className="owner-booking-card-details">
                <span>Car: {booking.car.car_name}</span>
                <span>Start Date: {booking.start_date}</span>
                <span>End Date: {booking.end_date}</span>
                <span>Price: {booking.price}৳</span>
                <hr />
                <span>Client Name: {booking.user.name}</span>
                <span>Email: {booking.user.email}</span>
                <span>Phone: {booking.user.phone}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
