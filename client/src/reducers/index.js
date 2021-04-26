import { combineReducers } from 'redux'
import auth from './auth'
import error from './error'
import blog from './blog'

export default combineReducers({
    auth,
    error,
    blog
})