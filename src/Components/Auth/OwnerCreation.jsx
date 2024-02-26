import { ErrorMessage, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../Redux/Action/authAction";
const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password, name, role, phone) => dispatch(register(email, password, name, "owner", phone)),
  };
};
const mapStateToProps = (state) => {
  return {
    success: state.auth.success,
    userId: state.auth.userId,
  };
};

const Register = (props) => {
  return (
    <div className="mt-2 mb-2">
    {props.userId && <Navigate replace to="/" />}
    <Formik
      onSubmit={(values) => props.register(values.email, values.password, values.name, values.phone)}
      initialValues={{
        email: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
      }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.name) {
          errors.name = "Required";
        }

        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6) {
          errors.password = "Password must be at least 6 characters";
        }

        if (!values.confirmPassword) {
          errors.confirmPassword = "Required";
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword =
            "Password and Confirm Password did not match";
        }

        return errors;
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <div className="p-4" style={{ boxShadow: "0 0 5px black" }}>
          <div style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
          </div>
          <Link to='/signup' type="button" className="mt-3 w-100 btn btn-primary" >Create User Account</Link>
          <h1 style={{ textAlign: "center", margin: "1rem" }}>Create Owner Account</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label>Email: </label>{" "}
            <ErrorMessage name="email" component="span" />
            <input
              onChange={handleChange}
              value={values.email}
              className="form-control mb-4"
              type="text"
              name="email"
              placeholder="Enter Email"
            />
            <label>Name: </label>{" "}
            <ErrorMessage name="name" component="span" />
            <input
              onChange={handleChange}
              value={values.name}
              className="form-control mb-4"
              type="text"
              name="name"
              placeholder="Enter You Name"
            />
            <label>Phone: </label>{" "}
            <ErrorMessage name="phone" component="span" />
            <input
              onChange={handleChange}
              value={values.phone}
              className="form-control mb-4"
              type="text"
              name="phone"
              placeholder="Enter You Phone Number"
            />
            <label>Password: </label>{" "}
            <ErrorMessage name="password" component="span" />
            <input
              onChange={handleChange}
              value={values.password}
              className="form-control mb-4"
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <label>Confirm Password: </label>{" "}
            <ErrorMessage name="confirmPassword" component="span" />
            <input
              onChange={handleChange}
              value={values.confirmPassword}
              className="form-control mb-4"
              type="password"
              name="confirmPassword"
              placeholder="Enter Password Again"
            />
            <button
              style={{ width: "100%" }}
              className="btn btn-success"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
    </Formik>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

