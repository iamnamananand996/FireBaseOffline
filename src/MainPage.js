import React, { Component } from "react";
import * as firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCnB6bVU3l1o6NSim96hYMqVYQXT8p-1ek",
	authDomain: "stet-d84bf.firebaseapp.com",
	databaseURL: "https://stet-d84bf.firebaseio.com",
	projectId: "stet-d84bf",
	storageBucket: "stet-d84bf.appspot.com",
	messagingSenderId: "851022538939",
	appId: "1:851022538939:web:6314530885f6b6dadb619e",
	measurementId: "G-9SNP6LVLN7"
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
	cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase
	.firestore()
	.enablePersistence()
	.then(res => {
		console.log("offline Mode Enabale");
	})
	.catch(function(err) {
		if (err.code == "failed-precondition") {
		} else if (err.code == "unimplemented") {
		}
	});

export default class MainPage extends Component {
	state = {
		formData: "",
		flag: false,
		offline: false,
		online: false
	};

	connectionCheck = () => {
		window.addEventListener(
			"online",
			function(e) {
				console.log("online");
				this.setState({ online: true });
			},
			false
		);

		window.addEventListener(
			"offline",
			function(e) {
				console.log("offline");
				this.setState({ offline: true });
			},
			false
		);
	};

	sendDatatoFirebase = () => {
		if (this.state.online) {
			firebase
				.firestore()
				.enableNetwork()
				.then(function() {
					// Do online actions
					// ...
				});
		} else {
			firebase
				.firestore()
				.disableNetwork()
				.then(function() {
					// Do offline actions
					// ...
				});
		}
	};

	componentDidMount() {
		this.connectionCheck();
	}

	render() {
		return (
			<div>
				<div className="jumbotron text-center">
					<h1>FireBase DataStore</h1>
				</div>

				<div className="container">
					<div>
						<input
							className="form-control"
							type="text"
							onChange={e => {
								this.setState({ formData: e.target.value });
							}}
							value={this.state.formData}
						/>
						<br />
						<button
							className="btn btn-primary"
							onClick={() => this.setState({ flag: true })}
						>
							Add Data to FireBase
						</button>
					</div>
				</div>
			</div>
		);
	}
}
