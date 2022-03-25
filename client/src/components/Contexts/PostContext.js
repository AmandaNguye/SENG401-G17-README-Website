import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
	const [posts, setPosts] = useState([
		{
			_id: 1,
			title: "Lorem ipsum dolor sit amet.",
			content:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis non, corrupti culpa magnam atque facilis?",
			tag: "meme",
			fame_count: 1,
			famer: [],
			lamer: [],
			creator: 1,
		},
	]);

	return (
		<PostContext.Provider value={[posts, setPosts]}>
			{props.children}
		</PostContext.Provider>
	);
};

// title: {
// 	type: String,
// 	required: true,
// 	minLength: 5,
//   },
//   content: {
// 	type: String,
// 	required: true,
// 	minLength: 5,
//   },
//   tag: {
// 	type: String,
//   },
//   fame_count: {
// 	type: Number,
// 	default: 0,
//   },
//   famer: {
// 	type : [String],
// 	default: [],
//   },
//   lamer: {
// 	type : [String],
// 	default: [],
//   }
//   ,
//   creator: {
// 	type: String,
// 	required: true,
// 	immutable: true,
//   },
// },
// { timestamps: true }
