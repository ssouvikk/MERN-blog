import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logout2 } from '../actions/auth'
import { connect } from 'react-redux'

export class NavBar extends Component {
    render() {
        const { isAuthenticated } = this.props.auth
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Homepage</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {isAuthenticated ? (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">Dashboard </Link>
                                    </li>
                                ) : ''}
                                {isAuthenticated ? (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/add">Add</Link>
                                    </li>
                                ) : ''}
                                {isAuthenticated ? (
                                    <li className="nav-item">
                                        <Link onClick={() => this.props.logout2()} className="nav-link mr-2 ml-2" to="#">Logout </Link>
                                    </li>
                                ) : ''}

                                {isAuthenticated ? '' : (
                                    <li className="nav-item">
                                        <Link className="nav-link mr-2 ml-2" to="/login">Login</Link>
                                    </li>
                                )}
                                {isAuthenticated ? '' : (
                                    <li className="nav-item">
                                        <Link className="nav-link mr-2 ml-2" to="/register">Register </Link>
                                    </li>
                                )}

                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}

const mapStatesToProps = (globalStore) => ({
    auth: globalStore.auth,
})

export default connect(mapStatesToProps, { logout2 })(NavBar)
