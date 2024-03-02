import axios from "axios";
import {
  CARS_DATA,
  BOOKING_DATA,
  BOOKING_DATE,
  EMPTY_BOOKING_DATE,
  BOOKED,
  ERROR,
  RELOAD_BOOKINGS,
} from "../Constance";
import { loadingFalse, loadingTrue } from "./authAction";
import { BackendUrl } from "../../backurl";

export const getCars = () => (dispatch) => {
  axios
    .get(BackendUrl+"car/all/")
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
  dispatch(loadingTrue());
  axios
    .get(BackendUrl+"bookings/?user=" + id, header)
    .then((res) => {
      dispatch(mybooking(res.data));
      dispatch(loadingFalse());
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
      dispatch(loadingFalse());
    });
};

export const bookingList = (car) => (dispatch) => {
  axios
    .get(BackendUrl+"book/list/" + car + "/")
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
    .post(BackendUrl+"book/", car, header)
    .then((res) => {
      dispatch(loadingFalse());
      dispatch(reloadBookings());
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
export const reloadBookings = () => {
  return {
    type: RELOAD_BOOKINGS,
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
