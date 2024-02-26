import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCars } from "../../Redux/Action/userAction";
import { Button, Modal } from "reactstrap";
import { deleteCar } from "../../Redux/Action/ownerAction";
import { Navigate, useNavigate } from "react-router-dom";
import CreateCar from "./CreateCar";
import EditCar from "./EditCar";

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(getCars()),
    deleteCar: (id, token) => dispatch(deleteCar(id, token)),
  };
};
const mapStateToProps = (state) => {
  return {
    cars: state.user.cars,
    dates: state.user.booking_date,
    token: state.auth.token,
    success: state.auth.success,
  };
};

const Cars = (props) => {
  const [activeModal, setActiveModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const toggleModal = (modalId) => {
    setActiveModal(activeModal === modalId ? null : modalId);
  };
  const toggleDeleteModal = (modalId) => {
    setDeleteModal(deleteModal === modalId ? null : modalId);
  };
  useEffect(() => {
    props.getCars();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.success) {
      navigate("/");
      setTimeout(() => {
        navigate("/owner/cars");
      }, 100);
    }
  }, [props]);
  return (
    <div className="home">
      <h1 className="text-center">My Cars</h1>
      <div className="cars">
        {props.cars &&
          props.cars.map((car) => (
            <div className="car-card" key={car.id}>
              {car.out_of_service && (
                <p className="out-service">Out of service</p>
              )}
              <img
                className="card-image"
                src={`https://rentacar.pythonanywhere.com${car.image}`}
              />
              <div className="card-details">
                <h3>Car Name: {car.car_name}</h3>
                <p>Brand: {car.brand}</p>
                <p>Engine: {car.engine_cc}cc</p>
                <p>Number Of Seats: {car.number_of_seats}</p>
              </div>
              <div className="book-now">
                <button
                  onClick={() => toggleModal(car.id)}
                  className="btn btn-warning"
                  type="button"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleDeleteModal(car.id)}
                  className="btn btn-danger"
                  type="button"
                >
                  Delete
                </button>
                <Modal
                  isOpen={activeModal === car.id}
                  toggle={() => toggleModal(car.id)}
                >
                  <Button
                    color="secondary"
                    className="w-100"
                    onClick={() => toggleModal(car.id)}
                  >
                    Cancel
                  </Button>
                  <EditCar car={car} />
                </Modal>
                <Modal
                  isOpen={deleteModal === car.id}
                  toggle={() => toggleDeleteModal(car.id)}
                >
                  <Button
                    color="secondary"
                    className="w-100"
                    onClick={() => toggleDeleteModal(car.id)}
                  >
                    Cancel
                  </Button>
                  <h3 className="text-center m-2">
                    Are you sure to delete this car?
                  </h3>
                  <p className="text-center m-2">
                    Once you delete all bookings of this car will be remove.
                  </p>
                  <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => props.deleteCar(car.id, props.token)}
                  >
                    Delete
                  </button>
                </Modal>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
