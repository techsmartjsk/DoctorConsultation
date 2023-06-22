import { combineReducers } from 'redux'
import dasboardReducers from './reducers/dashboardReducer'

export default combineReducers({
    dashboard: dasboardReducers,
})
