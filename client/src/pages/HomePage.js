import React, { Component } from 'react'
import { getAllPublicBlogs } from '../actions/blog'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


export class HomePage extends Component {

    componentDidMount = () => this.props.getAllPublicBlogs()

    render() {
        const { publicBlogs } = this.props
        if (publicBlogs.length === 0) return (<h2>Loading...</h2>)
        return (
            <>
                <h1>Blogs</h1>
                <div className="row">
                    {publicBlogs.map((item, index) => (
                        <div key={index} className="col-sm-6 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.body.substr(0, 25)}...</p>
                                    <Link to={`/details/${item._id}`} className="btn btn-primary">Details </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </>
        )
    }
}
const stateToProps = (globalStore) => ({
    publicBlogs: globalStore.blog.publicBlogs
})

export default connect(stateToProps, { getAllPublicBlogs })(HomePage)
