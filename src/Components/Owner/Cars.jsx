import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "reactstrap";
import { deleteCar, getOwnerCar } from "../../Redux/Action/ownerAction";
import { useNavigate } from "react-router-dom";
import EditCar from "./EditCar";

const mapDispatchToProps = (dispatch) => {
  return {
    getOwnerCar: () => dispatch(getOwnerCar()),
    deleteCar: (id, token) => dispatch(deleteCar(id, token)),
  };
};
const mapStateToProps = (state) => {
  return {
    cars: state.user.owner_cars,
    dates: state.user.booking_date,
    token: state.auth.token,
    success: state.auth.success,
    car_fatched: state.user.car_fatched,
  };
};

const Cars = (props) => {
  const [activeModal, setActiveModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [searchCar, setSearchCar] = useState([]);
  const [searchValue, setSearchValue] = useState("")

  const toggleModal = (modalId) => {
    setActiveModal(activeModal === modalId ? null : modalId);
  };
  const toggleDeleteModal = (modalId) => {
    setDeleteModal(deleteModal === modalId ? null : modalId);
  };
  useEffect(() => {
    if (props.cars.length === 0 && !props.car_fatched) {
      props.getOwnerCar();
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.success) {
      navigate("/owner/cars");
    }
  }, [props, navigate]);

  const handleSeacrh = (e) => {
    const key = e.target.value;
    setSearchValue(key)
    const result = props.cars.filter((item) =>
      item.car_name.toLowerCase().includes(key.toLowerCase())
    );
    setSearchCar(result);
    if (searchValue.length === 0) {
      setSearchCar(props.cars)
    }
  };
  useEffect(() => {
    setSearchCar(props.cars)
  }, [props])
  

  return (
    <div className="home">
      <h1 className="text-center">My Cars</h1>
      <input style={{marginBottom: "10px", width: "250px", margin:"auto", padding: "5px 10px", borderRadius: "10px", border: "1px solid black", outline: "none"}} type="text" onChange={(e) => handleSeacrh(e)} placeholder="Search a car"/>
      {
        searchValue.length > 0 && <h4 className="text-center">Results for "{searchValue}"</h4>
      }
      {searchCar.length === 0 ? (
        <h3 className="m-auto no-items">No Car</h3>
      ) : (
        <div className="cars">
          {searchCar &&
            searchCar.map((car) => (
              <div className="car-card" key={car.id}>
                {car.out_of_service && (
                  <p className="out-service">Out of service</p>
                )}
                <img className="card-image" src={`${car.image}`} alt="Car" />
                <div className="card-details">
                  <h3>Name: {car.car_name}</h3>
                  <p>
                    Brand: <span>{car.brand}</span>
                  </p>
                  <p>
                    Engine: <span>{car.engine_cc}cc</span>
                  </p>
                  <p>
                    Number Of Seats: <span>{car.number_of_seats}</span>
                  </p>
                  <p>
                    Rent Per Day: <span>{car.per_day_rent}৳</span>
                  </p>
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
      )}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
