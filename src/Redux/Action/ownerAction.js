import axios from "axios";
import { BOOKING_LIST_UPDATED, CAR_CREATED, CAR_LIST_UPDATED, CATEGORY, ERROR, OWNER_BOOKING_DATA, OWNER_CARS_DATA } from "../Constance";
import { errorMessage } from "./userAction";
import { loadingFalse, loadingTrue } from "./authAction";
import { BackendUrl } from "../../backurl";

export const createCar = (data) => (dispatch) => {
  const token = localStorage.getItem("rent-a-car-token");
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(loadingTrue());
  axios
    .post(BackendUrl+"cars/", data, header)
    .then((res) => {
      dispatch(carListUpdate());
      dispatch(loadingFalse());
      dispatch(carAdd("Car Added"));
    })
    .catch((error) => {
      dispatch(loadingFalse());
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
      dispatch(errorMessage(error.response.data[key]));
    });
};
export const getOwnerCar = () => (dispatch) => {
  const token = localStorage.getItem("rent-a-car-token");
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(loadingTrue());
  axios
    .get(BackendUrl+"cars/",  header)
    .then((res) => {
      dispatch(ownerCarsData(res.data));
      dispatch(loadingFalse());
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
      dispatch(loadingFalse());
    });
};
export const ownerCarsData = (data) => {
  return {
    type: OWNER_CARS_DATA,
    payload: data,
  };
};

export const editCar = (data, id) => (dispatch) => {
  const token = localStorage.getItem("rent-a-car-token");
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(loadingTrue());
  axios
    .put(BackendUrl+"cars/" + id + "/", data, header)
    .then((res) => {
      dispatch(carListUpdate());
      dispatch(loadingFalse());
      dispatch(carAdd("Car Updated"));
    })
    .catch((error) => {
      dispatch(loadingFalse());
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
      dispatch(errorMessage(error.response.data[key]));
    });
};

export const ownerBookings = (id, token) => (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(loadingTrue());
  axios
    .get(BackendUrl+"bookings/?owner=" + id, header)
    .then((res) => {
      dispatch(ownerBooking(res.data));
      dispatch(loadingFalse());
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
      dispatch(loadingFalse())
    });
};
export const ownerBooking = (data) => {
  return {
    type: OWNER_BOOKING_DATA,
    payload: data,
  };
};
export const category = () => (dispatch) => {
  axios
    .get(BackendUrl+"category/all/")
    .then((res) => {
      dispatch(categorySet(res.data));
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
};
export const deleteCar = (id, token) => (dispatch) => {
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(loadingTrue());
  axios
    .delete(BackendUrl+"cars/" + id + "/", header)
    .then((res) => {
      dispatch(carListUpdate());
      dispatch(loadingFalse());
      dispatch(carAdd("Car is deleted"));
    })
    .catch((error) => {
      dispatch(loadingFalse());
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
      dispatch(errorMessage(error.response.data[key]));
    });
};

export const carAdd = (msg) => {
  return {
    type: CAR_CREATED,
    payload: {
      success: msg,
    },
  };
};
export const carListUpdate = () => {
  return {
    type: CAR_LIST_UPDATED,
  };
};
export const ownerBookingList = () => {
  return {
    type:BOOKING_LIST_UPDATED,
  };
};

export const categorySet = (data) => {
  return {
    type: CATEGORY,
    payload: data,
  };
};
