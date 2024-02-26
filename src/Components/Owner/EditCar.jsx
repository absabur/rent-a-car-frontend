import { ErrorMessage, Formik } from "formik";
import React, { useState } from "react";
import { connect } from "react-redux";
import { editCar } from "../../Redux/Action/ownerAction";
import { Navigate } from "react-router-dom";
const mapDispatchToProps = (dispatch) => {
  return {
    editCar: (data, id) => dispatch(editCar(data, id)),
  };
};
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    category: state.user.category,
    success: state.auth.success,
  };
};

const EditCar = (props) => {
  const [image, setImage] = useState(null);
  const handleFormSubmit = (values) => {
    const formData = new FormData();
    formData.append("category", values.category);
    formData.append("car_name", values.car_name);
    formData.append("brand", values.brand);
    if (image) {
      formData.append("image", image);
    }
    formData.append("user", props.userId);
    formData.append("engine_cc", values.engine_cc);
    formData.append("number_of_seats", values.number_of_seats);
    formData.append("out_of_service", values.out_of_service);
    formData.append("per_day_rent", values.per_day_rent);
    props.editCar(formData, props.car.id);
  };

  return (
    <div className="">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          category: props.car.category,
          car_name: props.car.car_name,
          brand: props.car.brand,
          engine_cc: props.car.engine_cc,
          number_of_seats: props.car.number_of_seats,
          out_of_service: props.car.out_of_service,
          per_day_rent: props.car.per_day_rent,
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
              Edit car details
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
              <div className="d-flex flex-column w-100">
                <h4>Previous Image</h4>
                <img
                  style={{
                    objectFit: "contain",
                    borderRadius: "100%",
                    backgroundColor: "black",
                    margin: "auto",
                  }}
                  width={150}
                  height={150}
                  src={`https://rentacar.pythonanywhere.com${props.car.image}`}
                />
              </div>
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
                placeholder="Enter Rent Per Day"
              />
              <label>Out Of Service: </label>{" "}
              <ErrorMessage name="out_of_service" component="span" />
              <select
                onChange={handleChange}
                value={values.out_of_service}
                className="form-control mb-4"
                name="out_of_service"
              >
                <option value="">Select Out Of Service</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <button
                style={{ width: "100%" }}
                className="btn btn-success"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCar);
