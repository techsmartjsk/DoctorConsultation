import { createStore } from 'redux'
import mainReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    mainReducer,
    composeWithDevTools()
)

export default store;