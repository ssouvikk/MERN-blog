import { GET_PUBLIC_BLOG, UPDATE_BLOG, GET_BLOG, ADD_BLOG, DELETE_BLOG, GET_SPECIFIC_BLOG } from '../actions/types'

const initialState = {
    blogs: [],
    currentBlog: {},
    publicBlogs: []
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BLOG:
            return { ...state, blogs: action.payload }

        case ADD_BLOG:
            return { ...state, blogs: [...state.blogs, action.payload] }

        case DELETE_BLOG:
            return { ...state, blogs: state.blogs.filter(blog => blog._id !== action.payload) }

        case GET_SPECIFIC_BLOG:
            return { ...state, currentBlog: action.payload }

        case UPDATE_BLOG:
            return { ...state, currentBlog: {} }

        case GET_PUBLIC_BLOG:
            return { ...state, publicBlogs: action.payload }

        default:
            return { ...state }
    }
}

export default blogReducer