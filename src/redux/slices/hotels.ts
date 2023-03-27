import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export interface IHotels {
  id: number
  name: string,
  subdomain?: string | null,
  stars?: number | null,
  email: string,
  phoneNumber: string,
  streetName: string,
  streetNumber: string,
  zipCode: string,
  city: string,
  country: string,
  state: number,
  image?: string
}

type InitialState = {
  data: IHotels[]
}

const initialState: InitialState = {
  data: [
    {
      id: 0,
      name: "Andre's Hotel",
      subdomain: "https://github.com/Cas147",
      stars: 4,
      email: "andrescas1948@gmail.com",
      phoneNumber: "3243020521",
      streetName: "cra 30",
      streetNumber: "#89-12",
      zipCode: "103213",
      city: "Medellin",
      country: "Colombia",
      state: 0,
      image: "https://economictimes.indiatimes.com/thumb/msid-73023854,width-1200,height-900,resizemode-4,imgsize-235513/hotel-agencies.jpg?from=mdr"
    },
    {
      id: 1,
      name: "jhon's doe Hotel",
      subdomain: "",
      stars: null,
      email: "jhonDoe@gmail.com",
      phoneNumber: "+1 3232323",
      streetName: "cra 23",
      streetNumber: "#19-12",
      zipCode: "112313",
      city: "New York",
      country: "USA",
      state: 1
    }
  ]
}

export const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    addNewHotel: (state: InitialState, action) => {
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

export const { addNewHotel, deleteHotel, handleStatus, editHotel } = hotelSlice.actions

export default hotelSlice.reducer