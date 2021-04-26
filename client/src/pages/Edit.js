import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { getSingleBlog, updateBlog } from '../actions/blog'


class Edit extends Component {
    state = {
        title: '',
        body: ''
    }

    handleChage = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const val = {
            title: this.state.title || this.props.currentBlog.title,
            body: this.state.body || this.props.currentBlog.body,
        }
        this.props.updateBlog(val, this.props.match.params.id)
        this.props.history.push('/dashboard')
    }

    componentDidMount = () => this.props.getSingleBlog(this.props.match.params.id)


    render() {
        localStorage.setItem('lastPage', 'edit/' + this.props.match.params.id)
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/login" />
        }
        return (
            <div>
                <h1>Update Contact </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Title </label>
                        <input required value={this.state.title || this.props.currentBlog.title || ''} onChange={this.handleChage} name="title" type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Body  </label>
                        <input required value={this.state.body || this.props.currentBlog.body || ''} onChange={this.handleChage} name="body" type="body" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

const mapStatesToProps = (globalStore) => ({
    auth: globalStore.auth,
    currentBlog: globalStore.blog.currentBlog
})

export default connect(mapStatesToProps, { getSingleBlog, updateBlog })(Edit)
