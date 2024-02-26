import axios from "axios";
import {
  CARS_DATA,
  BOOKING_DATA,
  BOOKING_DATE,
  EMPTY_BOOKING_DATE,
  BOOKED,
  ERROR,
} from "../Constance";
import { loadingFalse, loadingTrue } from "./authAction";

export const getCars = () => (dispatch) => {
  axios
    .get("https://rentacar.pythonanywhere.com/car/all/")
    .then((res) => {
      dispatch(carsData(res.data));
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
};

export const myBookings = (id, token) => (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  axios
    .get("https://rentacar.pythonanywhere.com/bookings/?user=" + id, header)
    .then((res) => {
      dispatch(mybooking(res.data));
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
};

export const bookingList = (car) => (dispatch) => {
  axios
    .get("https://rentacar.pythonanywhere.com/book/list/" + car + "/")
    .then((res) => {
      dispatch(bookingDate(res.data));
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
};

export const bookCar = (car, token) => (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(loadingTrue());
  axios
    .post("https://rentacar.pythonanywhere.com/book/", car, header)
    .then((res) => {
      dispatch(loadingFalse());
      dispatch(booked());
    })
    .catch((error) => {
      dispatch(loadingFalse());
      const key = Object.keys(error.response.data)[0];
      dispatch(errorMessage(error.response.data[key]));
    });
};

export const booked = () => {
  return {
    type: BOOKED,
    payload: {
      success: "Car Book was successfull!",
    },
  };
};
export const errorMessage = (msg) => {
  return {
    type: ERROR,
    payload: {
      error: msg,
    },
  };
};
export const carsData = (data) => {
  return {
    type: CARS_DATA,
    payload: data,
  };
};
export const mybooking = (data) => {
  return {
    type: BOOKING_DATA,
    payload: data,
  };
};
export const bookingDate = (data) => {
  return {
    type: BOOKING_DATE,
    payload: data,
  };
};
export const emptybookingDate = () => {
  return {
    type: EMPTY_BOOKING_DATE,
  };
};
