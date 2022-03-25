import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Landing from "./components/Landing Page/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import PostPage from "./components/PostPage/PostPage";
import Greeting from "./components/Greeting/Greeting";

const App = () => {
	return (
		<div className="wrapper">
			<h1>README</h1>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Greeting />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/post-page:id" element={<PostPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
