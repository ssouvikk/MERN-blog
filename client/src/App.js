import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import { loadUser } from './actions/auth'
import Add from './pages/Add';
import Edit from './pages/Edit';
import HomePage from './pages/HomePage';
import BlogDetails from './pages/BlogDetails';

class App extends Component {

	componentDidMount = () => this.props.loadUser()

	render() {
		return (
			<BrowserRouter>
				<NavBar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/add" component={Add} />
						<Route exact path="/edit/:id" component={Edit} />
						<Route exact path="/details/:id" component={BlogDetails} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default connect(null, { loadUser })(App)