import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { addBlog } from '../actions/blog'


export class Add extends Component {
    state = { title: '', body: '' }

    handleChage = (e) => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = (e) => {
        e.preventDefault()
        const val = {
            title: this.state.title,
            body: this.state.body,
        }
        this.props.addBlog(val)
        this.props.history.push('/dashboard')
    }


    render() {
        localStorage.setItem('lastPage', 'add')
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <h1>Add </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title </label>
                        <input required onChange={this.handleChage} value={this.state.title} name="title" type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Body  </label>
                        <input required onChange={this.handleChage} value={this.state.body} name="body" type="text" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}


const mapStatesToProps = (globalStore) => ({
    auth: globalStore.auth
})

export default connect(mapStatesToProps, { addBlog })(Add)