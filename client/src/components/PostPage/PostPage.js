import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { IconButton } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon, UpDownIcon } from "@chakra-ui/icons";

import "./PostPage.css";

const PostPage = () => {
	const { id } = useParams();

	const token = localStorage.getItem("token");
	const UpvoteIcon = (
		<TriangleUpIcon w={20} h={20} _hover={{ color: "644aff" }} />
	);

	const DownvoteIcon = (
		<TriangleDownIcon w={20} h={20} _hover={{ color: "ffd25e" }} />
	);

	return (
		<div className="page">
			<section className="page--content">
				<h3 className="page--content--title">Title</h3>
				<p className="page--content--body">Body</p>
				<div className="page--content--likedislike">
					<IconButton
						icon={UpvoteIcon}
						backgroundColor="transparent"
						boxShadow="none !important"
						border="none"
						cursor="pointer"
					></IconButton>
					<IconButton
						icon={DownvoteIcon}
						backgroundColor="transparent"
						boxShadow="none !important"
						border="none"
						cursor="pointer"
					></IconButton>
				</div>
			</section>
			<section className="page--comments">
				<div className="page--comments--top">
					<h3 className="page--comments--top--title">Comment title</h3>
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
