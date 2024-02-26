import { ErrorMessage, Formik } from "formik";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../Redux/Action/authAction";
const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}
const mapStateToProps = (state) => {
  return {
    success: state.auth.success,
    userId: state.auth.userId,
  }
}

const Login = (props) => {
  return (
    <div className="mt-2 mb-2">
      {props.userId && <Navigate replace to="/" />}
      <Formik
        onSubmit={(values) => props.login(values.email, values.password)}
        initialValues={{
          email: "",
          password: "",
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

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="p-4" style={{ boxShadow: "0 0 5px black" }}>
            <div style={{ textAlign: "center" }}>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
            <h1 style={{ textAlign: "center", margin: "1rem" }}>Login</h1>
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
              <button
                style={{ width: "100%" }}
                className="btn btn-success"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);
