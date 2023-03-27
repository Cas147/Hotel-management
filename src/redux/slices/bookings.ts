import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface IBookings {
  id: number
  name: string,
  lastName: string,
  sex: number,
  email: string,
  phoneNumber: string,
  room: number,
  birthDate: string,
  document: string,
  checkin: string | Date
  checkout: string | Date
  emergencyName: string,
  emergencyPhone: string,
}

type InitialState = {
  data: IBookings[]
}

const initialState: InitialState = {
  data: [
    {
      id: 0,
      name: "Andres",
      lastName: "Castilla",
      sex: 0,
      email: "andrescas1948@gmail.com",
      phoneNumber: "3243020521",
      room: 0,
      birthDate: "2001-05-12",
      document: "1231123",
      checkin: "2023-03-28",
      checkout: "2023-04-03",
      emergencyName: "Juan",
      emergencyPhone: "123123123",
    },
    {
      id: 1,
      name: "jhon",
      lastName: "Doe",
      sex: 0,
      email: "jhon-48@gmail.com",
      phoneNumber: "32123421",
      room: 1,
      birthDate: "2000-05-12",
      document: "321231",
      checkin: "2023-05-12",
      checkout: "2023-05-14",
      emergencyName: "Juan",
      emergencyPhone: "123",
    }
  ]
}

export const bookingslice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state: InitialState, action) => {
      state.data = [action.payload, ...state.data];

    },
    deleteHotel: (state: InitialState, action) => {
      state.data = state.data.filter(item => action.payload !== item.id)
    },
    editHotel: (state: InitialState, action) => {
      const elementToReplace:number = (state?.data || [])?.findIndex(x => {
        return x.id === action.payload.id
      })
      const newArr = [...state.data]
      newArr.splice(elementToReplace, 1, action.payload)
      state.data = newArr
    },
    handleStatus: (state: InitialState, action) => {
      const elementToReplace:number = (state?.data || [])?.findIndex(x => {
        return x.id === action.payload.id
      })
      const newArr = [...state.data]
      newArr.splice(elementToReplace, 1, action.payload)
      state.data = newArr
    }
  }
})

export const { addBooking, deleteHotel, handleStatus, editHotel } = bookingslice.actions

export default bookingslice.reducer