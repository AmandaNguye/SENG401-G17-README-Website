import React from "react";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import "./Comment.css";

const CommentCard = ({ comment, refreshComments, canDelete }) => {
	const famed = comment.famed;
	const lamed = comment.lamed;

	const size = 15;
	const upvoteColor = "#644aff";
	const downvoteColor = "#ffd25e";

	const token = localStorage.getItem("token");

	const cancelVote = async (e) => {
		e.preventDefault();
		const postID = comment.post;
		const commentID = comment._id;

		const data = {
			voteType: "",
		};
		const payload = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": token,
			},
			body: JSON.stringify(data),
		};
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/posts/${postID}/comments/${commentID}/vote`,
				payload
			);
			if (res.ok) {
				refreshComments();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const upvote = async (e) => {
		const postID = comment.post;
		const commentID = comment._id;
		if (famed) {
			cancelVote(e);
			return;
		}
		e.preventDefault();
		const data = {
			voteType: "fame",
		};
		const payload = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": token,
			},
			body: JSON.stringify(data),
		};
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/posts/${postID}/comments/${commentID}/vote`,
				payload
			);
			if (res.ok) {
				refreshComments();
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
		const postID = comment.post;
		const commentID = comment._id;

		e.preventDefault();
		const data = {
			voteType: "lame",
		};
		const payload = {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": token,
			},
			body: JSON.stringify(data),
		};
		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/posts/${postID}/comments/${commentID}/vote`,
				payload
			);
			if (res.ok) {
				refreshComments();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deleteComment = async (e) => {
		const postID = comment.post;
		const commentID = comment._id;
		const payload = {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"x-access-token": token,
			},
		};

		try {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/posts/${postID}/comments/${commentID}`,
				payload
			);
			if (res.ok) {
				refreshComments();
			}
		} catch (err) {
			console.error(err);
		}
	};

	const UpvoteIcon = (
		<TriangleUpIcon w={size} h={size} _hover={{ color: upvoteColor }} />
	);

	const DownvoteIcon = (
		<TriangleDownIcon w={size} h={size} _hover={{ color: downvoteColor }} />
	);

	return (
		<div className="comment--container">
			<div className="comment-card">
				<div className="vote-box">
					<IconButton
						role="group"
						onClick={upvote}
						backgroundColor="transparent"
						color={famed ? upvoteColor : "gray"}
						boxShadow="none !important"
						border="none"
						cursor="pointer"
						icon={UpvoteIcon}
					/>
					<p>{comment.fame_count}</p>
					<IconButton
						role="group"
						onClick={downvote}
						backgroundColor="transparent"
						color={lamed ? downvoteColor : "gray"}
						boxShadow="none !important"
						border="none"
						cursor="pointer"
						icon={DownvoteIcon}
					/>
				</div>
				<div className="comment-content">
					<p className="comment-text">
						<span>{comment.creator} |</span> {comment.content}
					</p>
				</div>
				{canDelete && (
					<a className="comment-delete" onClick={deleteComment}>
						del
					</a>
				)}
			</div>
		</div>
	);
};

export default CommentCard;
