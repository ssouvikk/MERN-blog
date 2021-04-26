import React, { Component } from 'react'
import { login } from '../actions/auth'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'

class Login extends Component {
    state = {
        email: '',
        password: '',
    }
    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()
        const { email, password } = this.state
        this.props.login({ email, password })
    }

    render() {
        const { error } = this.props
        if (this.props.auth.isAuthenticated) {
            return <Redirect to={`/${localStorage.getItem('lastPage') ? localStorage.getItem('lastPage') : "dashboard"}`} />
        }
        return (
            <>
                <h1 className="text-center">Login</h1>
                {error.status && error.msg !== 'no token, authorisation denied' ? (
                    <div className="alert alert-danger" role="alert">
                        {error.msg}
                    </div>
                ) : ''}
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input required onChange={this.handleChange} type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input required onChange={this.handleChange} type="password" className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </>
        )
    }
}

const mapStatesToProps = (globalStore) => ({
    auth: globalStore.auth,
    error: globalStore.error
})

export default connect(mapStatesToProps, { login })(Login)
