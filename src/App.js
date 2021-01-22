import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

import './App.scss';
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			userDetails: {},
			isUserLoggedIn: false,
		};
	}

	componentDidMount() {
		const details = localStorage.getItem('userDetails');
		console.log(JSON.parse(details));
		if (details) {
			this.setState({ userDetails: JSON.parse(details), isUserLoggedIn: true });
		}
	}

	responseGoogle = (response) => {
		console.log(response.profileObj);
		localStorage.setItem('userDetails', JSON.stringify(response.profileObj));
		this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
	};

	errorResponse = (response) => {
		alert("Failed to login");
	};

	logout = () => {
		localStorage.clear();
		this.setState({ userDetails: {}, isUserLoggedIn: false });
	};

	render() {
		if (!this.state.isUserLoggedIn) {
			return (
				<div className="App">
					<div className="box">
						<h2>BIT Wifi</h2>
						<GoogleLogin
							clientId="901118527459-ftq3sn8gtdoihl62alnjrbonubt5qrlp.apps.googleusercontent.com"
							render={(renderProps) => (
								<button
									className="button"
									onClick={renderProps.onClick}
									disabled={renderProps.disabled}
								>
									<img
										src="icons/google.svg"
										alt="google login"
										className="icon"
									></img>
									<span className="buttonText">Sign in with Google</span>
								</button>
							)}
							onSuccess={this.responseGoogle}
							onFailure={this.errorResponse}
						/>
					</div>
				</div>
			);
		}

		return (
			<div className="App">
				<div className="userDetails-wrapper">
					<div className="details-wrapper">
						<GoogleLogout
							clientId="901118527459-ftq3sn8gtdoihl62alnjrbonubt5qrlp.apps.googleusercontent.com"
							render={(renderProps) => (
								<button className="logout-button" onClick={renderProps.onClick}>
									Log Out
								</button>
							)}
							onLogoutSuccess={this.logout}
						/>

						<div className="image">
							<img src={this.state.userDetails.imageUrl} alt="User" />
						</div>
						<div className="name">
							Welcome Mr. {this.state.userDetails.givenName}{' '}
							{this.state.userDetails.familyName}
						</div>
						<div className="email">
							<i>{this.state.userDetails.email}</i>
						</div>
					</div>
					{/*<div className="bar" />
					<div className="stand" />*/}
				</div>
			</div>
		);
	}
}

export default App;