import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <h1 className="text-center">404!</h1>
            <h2 className="text-center">Not Found Page!</h2>
            <Link to="/login">
                <button className="m-2 btn-lg btn btn-block btn-success"> Login </button>
            </Link>
            <Link to="/register">
                <button className="m-2 btn-lg btn btn-block btn-success"> Register </button>
            </Link>
        </>
    )
}

export default NotFound
