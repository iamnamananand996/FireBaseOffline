import React, { Component } from "react";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage.js";

class App extends Component {
	render() {
		return (
			// <BrowserRouter>
			// 	<div>
			// 		<Route exact path="/" component={MainPage} />
			// 		{/* <Route path="/completed" component={CompletedTasks} /> */}
			// 	</div>
			// </BrowserRouter>
			<MainPage />
		);
	}
}

export default App;
