import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface IRooms {
  id: number
  roomTypeID: number | string,
  hotelId: number | string,
  state?: number,
  name?: string,
}

type InitialState = {
  data: IRooms[]
}

const initialState: InitialState = {
  data: [
    {
      id: 0,
      roomTypeID: 1,
      state: 1,
      name: "Room 1",
      hotelId: 1
    },
    {
      id: 1,
      roomTypeID: 0,
      state: 1,
      name: "Room 2",
      hotelId: 0
    }
  ]
}

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addNewRoom: (state: InitialState, action) => {
      state.data = [action.payload, ...state.data];

    },
    editRoom: (state: InitialState, action) => {
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

export const { addNewRoom, editRoom, handleStatus } = roomsSlice.actions

export default roomsSlice.reducer