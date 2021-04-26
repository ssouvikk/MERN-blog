import { CLEAR_ERROR, LOAD_ERROR } from '../actions/types'

const initialState = {
    msg: {},
    status: null,
    id: null
}

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ERROR:
            const { msg, status, id } = action.payload
            return { msg, status, id }

        case CLEAR_ERROR:
            return { msg: {}, status: null, id: null }

        default:
            return state
    }
}

export default errorReducer