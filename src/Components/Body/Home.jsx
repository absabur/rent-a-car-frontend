import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./Home.css";
import { getCars } from "../../Redux/Action/userAction";
import { Button, Modal } from "reactstrap";
import BookingFrom from "./BookingFrom";
import Loading from "../Loading/Loading"

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => dispatch(getCars()),
  };
};
const mapStateToProps = (state) => {
  return {
    cars: state.user.cars,
    dates: state.user.booking_date,
    category: state.user.category,
  };
};

const Home = (props) => {
  const [activeModal, setActiveModal] = useState(null);

  const toggleModal = (modalId) => {
    setActiveModal(activeModal === modalId ? null : modalId);
  };
  useEffect(() => {
    props.getCars();
  }, []);
  return (
    <div className="home">
      <h1 className="text-center">Rent A Car</h1>
      {props.cars.length === 0 || props.cars.length === 0 ? <Loading /> :
      <div className="cars">
        {props.category &&
          props.category.map((category) => (
            <div className="w-100 category" key={category.id}>
              <h3
                style={{ marginLeft: "1rem", padding: "10px 0" }}
                className="card-title text-primary"
              >
                Category: {category.name}
              </h3>
              <div className="cars">
                
                {props.cars &&
                  props.cars.map((car) =>
                    car.category === category.id ? (
                      <div className="car-card" key={car.id}>
                        {car.out_of_service && (
                          <p className="out-service">Out of service</p>
                        )}
                        <img
                          className="card-image"
                          src={`https://rentacar.pythonanywhere.com${car.image}`}
                          alt="Car"
                        />
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
                            className="btn btn-primary"
                            type="button"
                            disabled={car.out_of_service}
                          >
                            Book Now
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
                            <BookingFrom car={car} />
                          </Modal>
                        </div>
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          ))}
      </div>
      }
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
