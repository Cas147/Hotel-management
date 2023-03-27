import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

type InitialState = {
  id?: number
  email: string
  loginType: number
  userName?: string
}

const initialState: InitialState = {
  id: 0,
  email: "",
  loginType: 0,
  userName: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleLogin: (state: InitialState, action) => {
      const { id, email, loginType, userName } = action.payload;
      state.id = id || 0;
      state.loginType = loginType;
      state.email = email;
      state.userName = userName || null;
    },
    handleLogout: (state: InitialState) => {
      state.id = 0;
      state.loginType = 0;
      state.email = "";
      state.userName = "";
    }
  }
})

export const { handleLogin, handleLogout } = userSlice.actions

export default userSlice.reducer