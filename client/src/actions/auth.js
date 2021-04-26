import axios from 'axios'
import { USER_LOAD_FAIL, REGISTER_FAIL, REGISTER_SUCCESS, USER_LOAD_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOG_OUT } from './types'
import { clearErrors, loadErrors } from '../actions/error'

export const loadUser = () => (dispatch, getState) => {
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOAD_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(loadErrors(err.response))
            dispatch({ type: USER_LOAD_FAIL })
        })
}

export const tokenConfig = getState => {
    const token = getState().auth.token
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config
}


export const register = (data) => dispatch => {
    axios.post('/api/users', data, noTokenConfig())
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(loadErrors(err.response))
            dispatch({
                type: REGISTER_FAIL,
            })
        })
}


export const noTokenConfig = () => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return config
}

export const login = ({ email, password }) => dispatch => {
    axios.post('/api/auth', { email, password }, noTokenConfig())
        .then(res => {
            dispatch(clearErrors())
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(loadErrors(err.response))
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response
            })
        })
}


export const logout = () => dispatch => {
    dispatch({
        type: LOG_OUT,
    })
}

export const logout2 = () => ({
    type: LOG_OUT,
})