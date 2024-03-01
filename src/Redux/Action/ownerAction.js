import axios from "axios";
import { CAR_CREATED, CATEGORY, ERROR } from "../Constance";
import { carsData, errorMessage, mybooking } from "./userAction";
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
  axios
    .get(BackendUrl+"cars/",  header)
    .then((res) => {
      dispatch(carsData(res.data));
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
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
  axios
    .get(BackendUrl+"bookings/?owner=" + id, header)
    .then((res) => {
      dispatch(mybooking(res.data));
      console.log(res);
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
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

export const categorySet = (data) => {
  return {
    type: CATEGORY,
    payload: data,
  };
};
