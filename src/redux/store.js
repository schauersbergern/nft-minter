import { configureStore } from '@reduxjs/toolkit'
import statusReducer from './reducer'

export default configureStore({
  reducer: {
    status: statusReducer,
  },
})