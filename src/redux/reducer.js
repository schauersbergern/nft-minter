import {createSlice} from '@reduxjs/toolkit'

export const statusSlice = createSlice({
  name: 'status',
  initialState: {
    value: '',
  },
  reducers: {
    updateStatus: (state, action) => {
      state.value = action.payload
    }
  },
})

export const { updateStatus } = statusSlice.actions
export default statusSlice.reducer