import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
	const [posts, setPosts] = useState([
		{
			_id: 1,
			title: "How I met your dad",
			content:
				"He said he was buying milk and cigarettes. I had the feeling he wasn't buying milk and cigeratcigarettestes.",
			tag: "MeIRL",
			fame_count: 101,
			lame_count: 1,
			famer: [],
			lamer: [],
			creator: "Yyccccccccccccchad",
		},
		{
			_id: 2,
			title: "Questions regarding poor eyesight",
			content:
				"Does using a computer for extended periods of time make you blind as a bat? It probably does doesn't it? Eventually I'll become Batman!",
			tag: "Dazed and Confused",
			fame_count: 69,
			lame_count: 69,
			famer: [],
			lamer: [],
			creator: "Robin",
		},
		{
			_id: 3,
			title: "How to find an element easily!",
			content:
				"arr.find( e => (condition involving e)), this will return the first item which meets your condition!",
			tag: "Actually helpful",
			fame_count: 2,
			lame_count: 420,
			famer: [],
			lamer: [],
			creator: "FacebookDev",
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
