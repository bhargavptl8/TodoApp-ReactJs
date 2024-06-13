import { createSlice } from '@reduxjs/toolkit'


export const signupSlice = createSlice({
  name: 'SignUp',
  initialState: [],
  reducers: {

    receiveData: (state, action) => {
      return action.payload
    }
  }
})

export const { receiveData } = signupSlice.actions

export default signupSlice.reducer