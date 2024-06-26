// ** Redux, Thunk & Root Reducer Imports
import rootReducer from '../reducers/rootReducer'
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'

// ** Create store
const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store;