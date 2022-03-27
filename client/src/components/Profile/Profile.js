import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostList from "../PostList/PostList";

const Profile = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch("https://api-gqqz6zzd4a-uc.a.run.app/isUserAuth", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		})
			.then((res) => res.json())
			.then((data) =>
				data.isLoggedIn ? setUsername(data.username) : navigate("/login")
			)
			.then(() => setIsLoggedIn(true));
	});

	const handleLogout = (e) => {
		e.preventDefault();
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		navigate("/login");
	};

	const handleDashboard = (e) => {
		e.preventDefault();
		navigate("/dashboard");
	};

	const loadPosts = async () => {
		const payload = {
			method: "GET",
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		};

		if (username) {
			try {
				console.log(username);
				const res = await fetch(
					`https://api-gqqz6zzd4a-uc.a.run.app/posts/user/${username}`,
					payload
				); // Port 5001 for postService
				const posts = await res.json();
				setPosts(posts);
				//console.log(posts);
			} catch (err) {
				console.error(err);
			}
		}
	};

	useEffect(() => {
		loadPosts();
	}, [username]);

	return (
		isLoggedIn && (
			<div>
				<button type="button" onClick={(e) => handleLogout(e)}>
					Log Out
				</button>
				<button type="button" onClick={(e) => handleDashboard(e)}>
					Dashboard
				</button>
				<h1>Welcome, {username} </h1>
				<h2>Your Posts:</h2>
				<PostList posts={posts} refreshPosts={loadPosts} />
			</div>
		)
	);
};

export default Profile;
