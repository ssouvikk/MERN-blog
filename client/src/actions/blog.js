import axios from 'axios'
import { GET_PUBLIC_BLOG, GET_BLOG, ADD_BLOG, DELETE_BLOG, GET_SPECIFIC_BLOG, UPDATE_BLOG } from './types'
import { tokenConfig, noTokenConfig } from './auth'
import { loadErrors, clearErrors } from './error'

//add
export const addBlog = blogData => (dispatch, getState) => {
    axios.post('/api/blogs', blogData, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_BLOG,
            payload: res.data
        }))
        .catch((err) => {
            dispatch(loadErrors(err.response))
        })
}


//getAll
export const getAllBlogs = () => (dispatch, getState) => {
    axios.get('/api/blogs', tokenConfig(getState)).then(res => {
        dispatch(clearErrors())
        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
    }).catch((err) => {
        dispatch(loadErrors(err.response))
    })
}

//delete
export const deleteBlog = id => (dispatch, getState) => {
    axios.delete(`/api/blogs/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_BLOG,
                payload: id
            })
        }).catch((err) => {
            dispatch(loadErrors(err.response))
        })

}

//getSingle
export const getSingleBlog = id => (dispatch, getState) => {
    axios.get(`/api/blogs/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_SPECIFIC_BLOG,
                payload: res.data
            })
        }).catch((err) => {
            dispatch(loadErrors(err.response))
        })

}



//update
export const updateBlog = (blogData, id) => (dispatch, getState) => {
    axios.patch(`/api/blogs/${id}`, blogData, tokenConfig(getState))
        .then(res => {
            dispatch({ type: UPDATE_BLOG })
        })
        .catch((err) => {
            dispatch(loadErrors(err.response))
        })
}


//get all public blogs
export const getAllPublicBlogs = () => (dispatch, getState) => {
    axios.get('/api/blogs/public', noTokenConfig()).then(res => {
        dispatch(clearErrors())
        dispatch({
            type: GET_PUBLIC_BLOG,
            payload: res.data
        })
    }).catch((err) => {
        dispatch(loadErrors(err.response))
    })
}