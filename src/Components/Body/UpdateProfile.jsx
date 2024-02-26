import { ErrorMessage, Formik } from "formik";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateProfile, userDeatils } from "../../Redux/Action/authAction";
const mapDispatchToProps = (dispatch) => {
  return {
    userDeatils: () => dispatch(userDeatils()),
    updateProfile: (email, name, phone) =>
      dispatch(updateProfile(email, name, phone)),
  };
};
const mapStateToProps = (state) => {
  return {
    success: state.auth.success,
    userId: state.auth.userId,
    userData: state.auth.userData,
  };
};

const UpdateProfile = (props) => {
  useEffect(() => {
    props.userDeatils();
  }, []);
  return (
    <div>
      <Formik
        onSubmit={(values) =>
          props.updateProfile(values.email, values.name, values.phone)
        }
        initialValues={{
          email: props.userData.email,
          name: props.userData.name,
          phone: props.userData.phone,
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

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="p-4">
            <h1 style={{ textAlign: "center", margin: "1rem" }}>
              Update Profile
            </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
