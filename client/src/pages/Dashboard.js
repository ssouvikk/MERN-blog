import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllBlogs, deleteBlog } from '../actions/blog'
import { Redirect } from 'react-router'
import Pagination from '../components/Pagination'

export class Dashboard extends Component {
    state = {
        currentPage: 1,
        itemsPerPage: 3
    }

    paginate = (pageNumber) => this.setState({ currentPage: pageNumber })

    componentDidMount = () => this.props.getAllBlogs()

    handleDelete = (id) => this.props.deleteBlog(id)


    render() {
        localStorage.setItem('lastPage', 'dashboard')
        const { blogs, auth } = this.props
        const { currentPage, itemsPerPage } = this.state

        if (!auth.isAuthenticated) {
            return <Redirect to="/login" />
        }

        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem)

        return (
            <>
                <h1>Your blogs </h1>
                {currentItems.map(item => (


                    <div key={item._id} className="row m-2">
                        <div className="col">
                            <Link onClick={() => this.handleDelete(item._id)} to="#" className="m-2 btn btn-danger btn-sm" tabIndex="-1" role="button">Delete</Link>
                            <Link to={`/edit/${item._id}`} className="m-2 btn btn-primary btn-sm" tabIndex="-1" role="button">Edit</Link>
                        </div>
                        <div className="col"><h3>  {item.title}</h3></div>
                        <div className="col"><h5> {item.body.substr(0, 20)} .. </h5> </div>
                    </div>
                ))}
                <Pagination itemsPerPage={itemsPerPage} totalItems={blogs.length} paginate={this.paginate} />

            </>
        )
    }
}


const mapStatesToProps = (globalStore) => ({
    blogs: globalStore.blog.blogs,
    auth: globalStore.auth,
})

export default connect(mapStatesToProps, { getAllBlogs, deleteBlog })(Dashboard)
