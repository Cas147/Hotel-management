// ** Reducers Imports
import user from "./slices/user"
import hotels from "./slices/hotels"
import roomTypes from "./slices/roomTypes"
import rooms from "./slices/rooms"
import bookings from "./slices/bookings"

import { combineReducers } from "redux"



const rootReducer = combineReducers({
  user,
  hotels,
  roomTypes,
  rooms,
  bookings
})

export default rootReducer
