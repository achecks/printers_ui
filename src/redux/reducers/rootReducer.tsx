// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import printerReducer from './printer'

const rootReducer = combineReducers({
    printerReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer
