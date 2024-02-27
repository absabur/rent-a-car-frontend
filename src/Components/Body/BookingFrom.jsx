import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  bookCar,
  bookingList,
  errorMessage,
} from "../../Redux/Action/userAction";
import { Navigate, useNavigate } from "react-router-dom";
const mapDispatchToProps = (dispatch) => {
  return {
    bookingList: (car) => dispatch(bookingList(car)),
    bookCar: (car, token) => dispatch(bookCar(car, token)),
    errorMessage: (msg) => dispatch(errorMessage(msg)),
  };
};
const mapStateToProps = (state) => {
  return {
    dates: state.user.booking_date,
    userId: state.auth.userId,
    token: state.auth.token,
    success: state.auth.success,
  };
};

const BookingForm = (props) => {
  const [day, setDay] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    props.bookingList(props.car.id);
    if (!props.userId) {
      props.errorMessage("You must login first.");
      navigate("/login");
    }
  }, []);

  function getString(dateString) {
    const dateObject = new Date(dateString);
    dateObject.setDate(dateObject.getDate());
    return dateObject.toISOString().slice(0, 10);
  }

  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    endDate = new Date(endDate);

    while (currentDate <= endDate) {
      dates.push(getString(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
  return (
    <div>
      {props.success && <Navigate replace to="/my-bookings" />}
      {props.dates.length == 0 ? (
        <h5 className="m-3 text-center">Available for any date.</h5>
      ) : (
        <h5 className="m-3 text-center">
          Not available on the following dates.
        </h5>
      )}
      {props.dates &&
        props.dates.map((date) => (
          <div className="dates" key={date.id}>
            <p>From: {date.start_date}</p>
            <p>To: {date.end_date}</p>
          </div>
        ))}
      <Formik
        onSubmit={(values) =>
          props.bookCar(
            {
              user: props.userId,
              car: props.car.id,
              owner: props.car.user,
              start_date: values.start,
              end_date: values.end,
              price: day * props.car.per_day_rent,
            },
            props.token
          )
        }
        initialValues={{
          start: "",
          end: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.start) {
            errors.start = "Required";
          }
          if (!values.end) {
            errors.end = "Required";
          }
          if (values.start > values.end) {
            errors.end =
              "End date should be greater than or equal start date";
          }
          if (
            new Date(values.start).toISOString().split("T")[0] <
            new Date().toISOString().split("T")[0]
          ) {
            errors.start = "Start date should be greater than current date";
          }
          if (values.start && values.end) {
            const dateRange = getDates(values.start, values.end);
            setDay(dateRange.length);
            for (let date of props.dates) {
              for (let newdate of dateRange) {
                if (newdate == date.start_date || newdate == date.end_date) {
                  errors.start = "Already Booked On Your Selected Range.";
                  errors.end = "Already Booked On Your Selected Range.";
                  break;
                }
              }
            }
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="p-4">
            <h1 style={{ textAlign: "center", margin: "1rem" }}>
              Enter Booking Date
            </h1>
            <form className="form" onSubmit={handleSubmit}>
              <label>Start Date: </label>{" "}
              <ErrorMessage name="start" component="span" />
              <input
                onChange={handleChange}
                value={values.start}
                className="form-control mb-4"
                type="date"
                name="start"
                required
              />
              <label>End Date: </label>{" "}
              <ErrorMessage name="end" component="span" />
              <input
                onChange={handleChange}
                value={values.end}
                className="form-control mb-4"
                type="date"
                name="end"
                required
              />
              <h3 className="text-center">
                Rent: {day * props.car.per_day_rent}৳
              </h3>
              <button
                style={{ width: "100%" }}
                className="btn btn-success"
                type="submit"
              >
                Book
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
