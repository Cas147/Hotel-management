import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface IroomsType {
  id: number
  name: string,
  price?: number,
  tax?: number,
  guests?: number,
  image?: string,
  hotelId: number,
}

type InitialState = {
  data: IroomsType[]
}

const initialState: InitialState = {
  data: [
    {
      hotelId: 1,
      id: 0,
      name: "Luxure room",
      price: 100,
      tax: 5,
      guests: 4,
    },
    {
      hotelId: 0,
      id: 1,
      name: "Single room",
      price: 30,
      tax: 6,
      guests: 1,
    }
  ]
}

export const roomSTypelice = createSlice({
  name: 'roomsType',
  initialState,
  reducers: {
    addNewRoomType: (state: InitialState, action) => {
      state.data = [action.payload, ...state.data];

    },
    editRoomType: (state: InitialState, action) => {
      const elementToReplace:number = (state?.data || [])?.findIndex(x => {
        return x.id === action.payload.id
      })
      const newArr = [...state.data]
      newArr.splice(elementToReplace, 1, action.payload)
      state.data = newArr
    },
  }
})

export const { addNewRoomType, editRoomType } = roomSTypelice.actions

export default roomSTypelice.reducer