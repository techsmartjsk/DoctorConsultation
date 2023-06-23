import { combineReducers } from 'redux'
import dasboardReducers from './reducers/dashboardReducer'
import callReducer from './reducers/callReducer'
export default combineReducers({
    dashboard: dasboardReducers,
    call:callReducer
})
