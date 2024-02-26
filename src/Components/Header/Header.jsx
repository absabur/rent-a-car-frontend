import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { logout } from "../../Redux/Action/authAction";
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

const Header = (props) => {
  
  return (
    <div className="header">
      <div className="container inner-header">
        <a href="/">Rent Car</a>
        <div className="nav">
          <Link to="/">Home</Link>
          {/* <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link> */}
          {props.userId ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
