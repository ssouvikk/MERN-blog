import { CLEAR_ERROR, LOAD_ERROR } from './types'

// export const loadErrors = (msg, status, id = null) =>{
export const loadErrors = ({ data, status }, id = null) => {
    return {
        type: LOAD_ERROR,
        payload: { msg: data.msg, status, id }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERROR
    }
}