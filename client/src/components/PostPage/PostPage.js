import React, { useContext } from "react";
import { useParams } from "react-router";
import { IconButton, ModalContent } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { PostContext } from "../Contexts/PostContext";
import "./PostPage.css";
import PostList from "../PostList/PostList";

const PostPage = () => {
	const [posts, setPosts] = useContext(PostContext);
	const { id } = useParams();

	const { content, creator, fame_count, lame_count, tag, title } = posts.find(
		(post) => post._id == id
	);

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
					<div className="page--content--famelame--famecount">{fame_count}</div>
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
					<div className="page--content--famelame--lamecount">{lame_count}</div>
				</div>
				<div
					className={
						fame_count >= lame_count
							? "page--metadata page--metadata__famed"
							: "page--metadata page--metadata__lamed"
					}
				>
					<p className="page--metadata--creator">Author: {creator}</p>
					<p className="page--metadata--tag">Tag: {tag}</p>
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
