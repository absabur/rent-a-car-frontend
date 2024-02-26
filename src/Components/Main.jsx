import React, { useEffect, useState } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Link,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { FaBars } from "react-icons/fa6";
import { GiTireIronCross } from "react-icons/gi";
import "./Main.css";

import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import OwnerCreation from "./Auth/OwnerCreation";
import {
  authCheck,
  clearMessage,
  userDeatils,
} from "../Redux/Action/authAction";
import Home from "./Body/Home";
import MyBookings from "./Body/MyBookings";
import Profile from "./Body/Profile";
import CreateCar from "./Owner/CreateCar";
import Bookings from "./Owner/Bookings";
import Cars from "./Owner/Cars";
import { category } from "../Redux/Action/ownerAction";
import LoadingPage from "./Loading/Loading";
import UpdateProfile from "./Body/UpdateProfile";

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => dispatch(clearMessage()),
    authCheck: () => dispatch(authCheck()),
    userDeatils: () => dispatch(userDeatils()),
    category: () => dispatch(category()),
  };
};
const mapStateToProps = (state) => {
  return {
    success: state.auth.success,
    error: state.auth.error,
    userId: state.auth.userId,
    token: state.auth.token,
    userData: state.auth.userData,
    isLoading: state.auth.isLoading,
  };
};

const Main = (props) => {
  const location = useLocation();
  const [render, setrender] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    props.authCheck();
    props.userDeatils();
    setrender(true);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.error == "Given token not valid for any token type") {
      navigate("login");
    }
  }, [props]);
  useEffect(() => {
    props.authCheck();
    props.userDeatils();
    props.category();
  }, [location.pathname]);

  useEffect(() => {
    if (props.success) {
      toast.success(props.success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.clearMessage();
    }
    if (props.error) {
      toast.error(
        props.error == "Given token not valid for any token type"
          ? "Token Expired, Login Again."
          : props.error,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      props.clearMessage();
    }
  }, [props]);
  return (
    <>
      {props.isLoading ? (
        <LoadingPage />
      ) : (
        <>
          {props.userId && props.userData.role === "owner" && (
            <>
              <button
                className={`owner-toggle ${toggle && "rotate"}`}
                type="button"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <GiTireIronCross /> : <FaBars />}
              </button>
              <div
                onClick={() => setToggle(false)}
                className={`owner-bar ${toggle && "open"}`}
              >
                <Link to="/create/car">Create a car</Link>
                <Link to="/owner/booking">Bookings</Link>
                <Link to="/owner/cars">Cars</Link>
              </div>
            </>
          )}
          <ToastContainer />
          {render && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/owner-account/create" element={<OwnerCreation />} />
              <Route path="/login" element={<Login />} />
              {props.userId && (
                <>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/my-bookings" element={<MyBookings />} />
                  {props.userData.role === "owner" && (
                    <>
                      <Route path="/create/car" element={<CreateCar />} />
                      <Route path="/owner/booking" element={<Bookings />} />
                      <Route path="/owner/cars" element={<Cars />} />
                    </>
                  )}
                </>
              )}
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
