import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import PostList from "../PostList/PostList";
import PostForm from "../PostForm/PostForm";
import { PostContext } from "../Contexts/PostContext";
import CondensedPostForm from "../CondensedPostForm/CondensedPostForm";

import "./Dashboard.css";

const Dashboard = () => {
	const navigate = useNavigate();

	const [posting, setPosting] = useState(false);

	useEffect(() => {
		fetch("http://localhost:5005/isUserAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((data) =>
				data.isLoggedIn ? console.log(data.username) : navigate("/login")
			);
	});

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		navigate("/login");
	};

	const handleProfile = (e) => {
		e.preventDefault();
		navigate("/profile");
	};

	// const [posts, setPosts] = useState([]);
	const [posts, setPosts] = useContext(PostContext);

	const loadPosts = async () => {
		const payload = {
			method: "GET",
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		};

		try {
			const res = await fetch(`http://localhost:5005/posts`, payload);
			const posts = await res.json();
			setPosts(posts);
			// console.log(posts);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadPosts();
	}, []);

	return (
		<div className="dashboard-wrapper">
			<h2>Dashboard</h2>
			<button type="button" onClick={(e) => handleLogout(e)}>
				Log Out
			</button>
			<button type="button" onClick={(e) => handleProfile(e)}>
				Profile
			</button>
			{posting ? (
				<PostForm refreshPosts={loadPosts} setForm={setPosting} />
			) : (
				<CondensedPostForm setForm={setPosting} />
			)}
			<PostList posts={posts} refreshPosts={loadPosts} />
		</div>
	);
};

export default Dashboard;
