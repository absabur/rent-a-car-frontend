import {
  REGISTER_LOGIN,
  LOGOUT,
  ERROR,
  CLEAR_MESSAGE,
  AUTHENTICATED,
  LOADING_TRUE,
  LOAIDNG_FALSE,
  BOOKED,
  USER_DATA,
  CAR_CREATED,
} from "../Constance";

const initialState = {
  token: null,
  userId: null,
  expired: null,
  success: null,
  error: null,
  userData: {},
  isLoading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        expired: action.payload.expired,
        success: action.payload.success,
      };
    case AUTHENTICATED:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        expired: action.payload.expired,
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        expired: null,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload.error,
      };

    case CLEAR_MESSAGE:
      return {
        ...state,
        error: null,
        success: null,
      };
    case BOOKED:
    case CAR_CREATED:
      return {
       ...state,
        success: action.payload.success,
      };

    case LOADING_TRUE:
      return {
        ...state,
        isLoading: true,
      };

    case LOAIDNG_FALSE:
      return {
        ...state,
        isLoading: false,
      };
    case USER_DATA: 
      return {
      ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};
