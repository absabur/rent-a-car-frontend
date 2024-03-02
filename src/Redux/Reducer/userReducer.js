import { BOOKING_DATA, BOOKING_DATE, CARS_DATA, CATEGORY, EMPTY_BOOKING_DATE, OWNER_BOOKING_DATA, OWNER_CARS_DATA, RELOAD_BOOKINGS } from "../Constance";
  
  const initialState = {
    cars: [],
    booking: [],
    booking_date: [],
    category: [],
    owner_cars: [],
    owner_booking: [],
    car_fatched: false,
    booking_fatched: false,
    user_booking_fatched: false,
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case CARS_DATA:
        return {
          ...state,
          cars: action.payload
        };
      case OWNER_CARS_DATA:
        return {
          ...state,
          owner_cars: action.payload,
          car_fatched: true,
        };
      case BOOKING_DATA:
        return {
          ...state,
          booking: action.payload,
          user_booking_fatched: true,
        };
      case RELOAD_BOOKINGS:
        return {
          ...state,
          user_booking_fatched: false,
        };
      case OWNER_BOOKING_DATA:
        return {
          ...state,
          owner_booking: action.payload,
          booking_fatched: true,
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
  