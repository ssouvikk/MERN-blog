import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSingleBlog } from '../actions/blog'


export class BlogDetails extends Component {

    componentDidMount = () => this.props.getSingleBlog(this.props.match.params.id)

    render() {
        const { title, body } = this.props.currentBlog
        if (!title || !body) return (<h1>Loading...</h1>)
        return (
            <div className="card text-center m-4">
                <div className="card-header">Blog Details </div>
                <div className="card-body">
                    <h5 className="card-title"> {title} </h5>
                    <p className="card-text"> {body} </p>
                </div>
            </div>
        )
    }
}


const mapStatesToProps = (globalStore) => ({
    currentBlog: globalStore.blog.currentBlog
})

export default connect(mapStatesToProps, { getSingleBlog })(BlogDetails)