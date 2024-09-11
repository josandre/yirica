import { combineReducers } from 'redux'
import theme from './slices/themeSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
