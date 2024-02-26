import { BOOKING_DATA, BOOKING_DATE, CARS_DATA, CATEGORY, EMPTY_BOOKING_DATE } from "../Constance";
  
  const initialState = {
    cars: [],
    booking: [],
    booking_date: [],
    category: [],
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case CARS_DATA:
        return {
          ...state,
          cars: action.payload
        };
      case BOOKING_DATA:
        return {
          ...state,
          booking: action.payload
        };
      case BOOKING_DATE:
        return {
          ...state,
          booking_date: action.payload
        };
      case EMPTY_BOOKING_DATE:
        return {
          ...state,
          booking_date: []
        };
      case CATEGORY:
        return {
         ...state,
          category: action.payload
        };
  
      default:
        return state;
    }
  };
  