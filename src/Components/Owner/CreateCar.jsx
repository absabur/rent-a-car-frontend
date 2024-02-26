import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createCar } from "../../Redux/Action/ownerAction";
const mapDispatchToProps = (dispatch) => {
  return {
    createCar: (data) => dispatch(createCar(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    category: state.user.category,
    success: state.auth.success,
  };
};

const CreateCar = (props) => {
  const [image, setImage] = useState(null);
  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("car_name", values.car_name);
    formData.append("brand", values.brand);
    formData.append("image", image);
    formData.append("user", props.userId);
    formData.append("engine_cc", values.engine_cc);
    formData.append("number_of_seats", values.number_of_seats);
    formData.append("out_of_service", values.out_of_service);
    formData.append("per_day_rent", values.per_day_rent);
    props.createCar(formData);
  };
  return (
    <div className="form-parent">
      {props.success && <Navigate replace to="/owner/cars" />}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          category: "",
          car_name: "",
          brand: "",
          engine_cc: "",
          number_of_seats: "",
          out_of_service: "",
          per_day_rent: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.category) {
            errors.category = "Required";
          }

          if (!values.car_name) {
            errors.car_name = "Required";
          }

          if (!values.brand) {
            errors.brand = "Required";
          }

          if (!values.engine_cc) {
            errors.engine_cc = "Required";
          }
          if (!values.number_of_seats) {
            errors.number_of_seats = "Required";
          }
          if (!values.per_day_rent) {
            errors.per_day_rent = "Required";
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="p-4">
            <h1 style={{ textAlign: "center", margin: "1rem" }}>
              Create A Car
            </h1>
            <form className="form" onSubmit={handleSubmit}>
              <label>Category: </label>{" "}
              <ErrorMessage name="category" component="span" />
              <select
                onChange={handleChange}
                value={values.category}
                className="form-control mb-4"
                name="category"
                style={{ cursor: "pointer" }}
              >
                <option value="">Select Category</option>
                {props.category &&
                  props.category.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <label>Car Name: </label>{" "}
              <ErrorMessage name="car_name" component="span" />
              <input
                onChange={handleChange}
                value={values.car_name}
                className="form-control mb-4"
                type="text"
                name="car_name"
                placeholder="Enter Car Name"
              />
              <label>Brand: </label>{" "}
              <ErrorMessage name="brand" component="span" />
              <input
                onChange={handleChange}
                value={values.brand}
                className="form-control mb-4"
                type="text"
                name="brand"
                placeholder="Enter Car Brand"
              />
              <label>Image: </label>{" "}
              <ErrorMessage name="image" component="span" />
              <input
                onChange={(event) => {
                  const file = event.currentTarget.files[0]; // Get the selected file
                  setImage(file); // Update the 'image' state with the selected file
                }}
                className="form-control mb-4"
                type="file"
                name="image"
                required
              />
              <label>Engine cc: </label>{" "}
              <ErrorMessage name="engine_cc" component="span" />
              <input
                onChange={handleChange}
                value={values.engine_cc}
                className="form-control mb-4"
                type="text"
                name="engine_cc"
                placeholder="1000"
              />
              <label>Number Of Seats: </label>{" "}
              <ErrorMessage name="number_of_seats" component="span" />
              <input
                onChange={handleChange}
                value={values.number_of_seats}
                className="form-control mb-4"
                type="text"
                name="number_of_seats"
                placeholder="How many Seats"
              />
              <label>Rent: </label>{" "}
              <ErrorMessage name="per_day_rent" component="span" />
              <input
                onChange={handleChange}
                value={values.per_day_rent}
                className="form-control mb-4"
                type="text"
                name="per_day_rent"
                placeholder="Enter Per Day Rent"
              />
              <label>Out Of Service: </label>{" "}
              <ErrorMessage name="out_of_service" component="span" />
              <input
                onChange={handleChange}
                value={values.out_of_service}
                className="mb-4"
                type="checkbox"
                name="out_of_service"
              />
              <button
                style={{ width: "100%" }}
                className="btn btn-success"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCar);
