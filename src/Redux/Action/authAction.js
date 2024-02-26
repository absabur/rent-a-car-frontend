import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  AUTHENTICATED,
  CLEAR_MESSAGE,
  ERROR,
  LOADING_TRUE,
  LOAIDNG_FALSE,
  LOGOUT,
  REGISTER_LOGIN,
  USER_DATA,
} from "../Constance";
import { carAdd } from "./ownerAction";

export const register =
  (email, password, name, role = "user", phone) =>
  (dispatch) => {
    const data = {
      email: email,
      password: password,
      name: name,
      role: role,
      phone: phone,
    };
    dispatch(loadingTrue());
    axios
      .post("https://rentacar.pythonanywhere.com/users/", data)
      .then((res) => {
        dispatch(loadingFalse());
        dispatch(login(data.email, data.password));
      })
      .catch((error) => {
        dispatch(loadingFalse());
        const key = Object.keys(error.response.data)[0];
        dispatch(errorAction(error.response.data[key]));
      });
  };
export const updateProfile =
  (email, name,  phone) =>
  (dispatch) => {
    const token = localStorage.getItem("rent-a-car-token");
    const id = localStorage.getItem("rent-a-car-userId");
    const header = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const data = {
      email: email,
      name: name,
      phone: phone,
    };
    dispatch(loadingTrue());
    axios
      .patch("https://rentacar.pythonanywhere.com/users/"+id+"/", data, header)
      .then((res) => {
        dispatch(loadingFalse());
        dispatch(carAdd("Profile Updated!"));
      })
      .catch((error) => {
        dispatch(loadingFalse());
        console.log(error);
        const key = Object.keys(error.response.data)[0];
        dispatch(errorAction(error.response.data[key][0]));
      });
  };
export const login = (email, password) => (dispatch) => {
  const data = {
    email: email,
    password: password,
  };
  dispatch(loadingTrue());
  axios
    .post("https://rentacar.pythonanywhere.com/token/", data)
    .then((res) => {
      dispatch(loadingFalse());
      dispatch(loginAction(res.data.access, "Login successful"));
    })
    .catch((error) => {
      dispatch(loadingFalse());
      const key = Object.keys(error.response.data)[0];
      dispatch(errorAction(error.response.data[key]));
    });
};
export const userDeatils = () => (dispatch) => {
  const token = localStorage.getItem("rent-a-car-token");
  const id = localStorage.getItem("rent-a-car-userId");
  const header = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  axios
    .get("https://rentacar.pythonanywhere.com/users/" + id + "/", header)
    .then((res) => {
      dispatch(userData(res.data));
    })
    .catch((error) => {
      const key = Object.keys(error.response.data)[0];
      console.log(error.response.data[key]);
    });
};

export const loginAction = (access, message) => {
  const token = jwtDecode(access);
  const expires = new Date(token.exp * 1000);
  localStorage.setItem("rent-a-car-token", access);
  localStorage.setItem("rent-a-car-userId", token.user_id);
  localStorage.setItem("rent-a-car-expires", JSON.stringify(expires));
  return {
    type: REGISTER_LOGIN,
    payload: {
      token: access,
      userId: token.user_id,
      expired: token.exp,
      success: message,
    },
  };
};

export const authCheck = () => (dispatch) => {
  const token = localStorage.getItem("rent-a-car-token");
  if (!token) {
    dispatch(logout());
  } else {
    const expires = JSON.parse(localStorage.getItem("rent-a-car-expires"));
    if (new Date(expires) <= new Date()) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("rent-a-car-userId");
      dispatch(isauthenticated(token, userId));
    }
  }
};

export const userData = (data) => {
  return {
    type: USER_DATA,
    payload: data,
  };
};

export const isauthenticated = (token, userId) => {
  return {
    type: AUTHENTICATED,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const errorAction = (error) => {
  return {
    type: ERROR,
    payload: {
      error: error,
    },
  };
};

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};

export const logout = () => {
  localStorage.removeItem("rent-a-car-token");
  localStorage.removeItem("rent-a-car-userId");
  localStorage.removeItem("rent-a-car-expires");
  return {
    type: LOGOUT,
  };
};
export const loadingTrue = () => {
  return {
    type: LOADING_TRUE,
  };
};
export const loadingFalse = () => {
  return {
    type: LOAIDNG_FALSE,
  };
};
