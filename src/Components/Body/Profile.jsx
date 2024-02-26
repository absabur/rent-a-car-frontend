import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Home.css";
import { logout, userDeatils } from "../../Redux/Action/authAction";
import { Button, Modal } from "reactstrap";
import { Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

const mapDispatchToProps = (dispatch) => {
  return {
    userDeatils: () => dispatch(userDeatils()),
    logout: () => dispatch(logout()),
  };
};
const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

const Profile = (props) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modal, setModal] = useState(false);
  const toggleModal = (modalId) => {
    setActiveModal(activeModal === modalId ? null : modalId);
  };
  useEffect(() => {
    props.userDeatils();
  }, []);
  return (
    <div className="home">
      <p className="logout btn btn-danger" onClick={() => setModal(true)}>
        Logout
      </p>
      <Modal isOpen={modal}>
        <button className="btn btn-info" onClick={() => setModal(false)}>
          Close
        </button>
        <h2 className="m-auto p-4">Are you sure to logout?</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            marginBottom: "1rem",
          }}
        >
          <button
            className="btn btn-danger"
            onClick={() => {
              props.logout();
              setModal(false);
            }}
          >
            Log Out
          </button>
          <button className="btn btn-info" onClick={() => setModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>
      <h1 className="text-center">My Profile</h1>
      <div className="d-flex flex-column w-100 align-items-center mt-4">
        <h3>Name: {props.userData.name}</h3>
        <h3>Email: {props.userData.email}</h3>
        <h3>Phone: {props.userData.phone}</h3>
        <button onClick={() => toggleModal(props.userData.id)} className="btn btn-warning">
          Update Profile
        </button>
      </div>

      <Modal isOpen={activeModal === props.userData.id} toggle={() => toggleModal(props.userData.id)}>
        <Button
          color="secondary"
          className="w-100"
          onClick={() => toggleModal(props.userData.id)}
        >
          Cancel
        </Button>
        <UpdateProfile />
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
