import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { IconButton, ModalContent } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import "./PostPage.css";

const PostPage = () => {
	const [post, setPost] = useState([]);
	const [comments, setComments] = useState([]);

	const loadPost = async (e) => {
		const payload = {
			method: "GET",
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		};

		try {
			const res = await fetch(`http://localhost:5005/posts/${id}`, payload);
			const posts = await res.json();
			setPost(posts);
		} catch (err) {
			console.error(err);
		}
	};

	const loadComment = async (e) => {
		const payload = {
			method: "GET `http://localhost:5005/posts/:p_id/comments/`",
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		};

		try {
			const res = await fetch(`http://localhost:5005/posts/${id}/comments/`);
			const comments = await res.json;
			setComments(comments);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(loadPost, loadComment, []);

	const { id } = useParams();

	const { content, creator, fame_count, famed, lamed, tag, title } = post;

	const cancelVote = async (e) => {
		e.preventDefault();
		const postID = id;
		const data = {
			voteType: "",
		};
		const payload = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(data),
		};
		try {
			const res = await fetch(
				`http://localhost:5005/posts/${postID}/vote`,
				payload
			);
			if (res.ok) {
				loadPost();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const upvote = async (e) => {
		if (famed) {
			cancelVote(e);
			return;
		}

		e.preventDefault();
		const postID = id;
		const data = {
			voteType: "fame",
		};
		const payload = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(data),
		};
		try {
			const res = await fetch(
				`http://localhost:5005/posts/${postID}/vote`,
				payload
			);
			if (res.ok) {
				loadPost();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const downvote = async (e) => {
		if (lamed) {
			cancelVote(e);
			return;
		}

		e.preventDefault();
		const postID = id;
		const data = {
			voteType: "lame",
		};
		const payload = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify(data),
		};
		try {
			const res = await fetch(
				`http://localhost:5005/posts/${postID}/vote`,
				payload
			);
			if (res.ok) {
				loadPost();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const UpvoteIcon = (
		<TriangleUpIcon w={20} h={20} _hover={{ color: "#644aff" }} />
	);

	const DownvoteIcon = (
		<TriangleDownIcon w={20} h={20} _hover={{ color: "#ffd25e" }} />
	);

	return (
		<div className="page">
			<section className="page--content">
				<h3 className="page--content--title">{title}</h3>
				<p className="page--content--body">{content}</p>
				<div className="page--content--famelame">
					<IconButton
						icon={UpvoteIcon}
						backgroundColor="transparent"
						boxShadow="none !important"
						border="none"
						cursor="pointer"
						onClick={upvote}
					></IconButton>
					<div
						className="page--content--famelame--famecount"
						style={{ color: fame_count >= 0 ? "#b2a5ff" : "#ffd25e" }}
					>
						{fame_count}
					</div>
					<IconButton
						icon={DownvoteIcon}
						backgroundColor="transparent"
						boxShadow="none !important"
						border="none"
						cursor="pointer"
						onClick={downvote}
					></IconButton>
				</div>
				<div
					className={
						fame_count >= 0 ? "page--metadata famed" : "page--metadata lamed"
					}
				>
					<div className="page--metadata--creator">
						&lt;author&gt; {creator} &lt;/author&gt;
					</div>
					<div className="page--metadata--tag">
						&lt;tag&gt; {tag} &lt;/tag&gt;
					</div>
				</div>
			</section>
			<section className="page--comments">
				<div className="page--comments--top">
					<h3 className={"page--comments--top--title"}>C O M M E N T S</h3>
					<textarea
						type="text"
						className="page--comments--top--input"
						placeholder="Enter comment here"
					/>
				</div>
				<ul className="page--comments--commentlist">
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>1</li>
					<li>4</li>
					<li>5</li>
					<li>6</li>
					<li>7</li>
					<li>85</li>
					<li>2</li>
				</ul>
			</section>
		</div>
	);
};

export default PostPage;
