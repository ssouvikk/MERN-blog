import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { register } from '../actions/auth'

export class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        err: null
    }

    handleChange = (e) => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {
        e.preventDefault()
        const { name, email, password } = this.state
        this.props.register({ name, email, password })
    }

    render() {
        const { error } = this.props
        if (this.props.auth.isAuthenticated) {
            return <Redirect to={`/${localStorage.getItem('lastPage') ? localStorage.getItem('lastPage') : "dashboard"}`} />
        }
        return (
            <>
                <h1 className="text-center">Register</h1>
                {error.status && error.msg !== 'no token, authorisation denied' ? (
                    <div className="alert alert-danger" role="alert">
                        {error.msg}
                    </div>
                ) : ''}
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name </label>
                        <input value={this.state.name} onChange={this.handleChange} required type="text" className="form-control" id="name" name="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input value={this.state.email} onChange={this.handleChange} required type="email" className="form-control" id="email" name="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input value={this.state.password} onChange={this.handleChange} required type="password" className="form-control" id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </>
        )
    }
}

const stateToProps = (globalStore) => ({
    auth: globalStore.auth,
    error: globalStore.error
})

export default connect(stateToProps, { register })(Register)
