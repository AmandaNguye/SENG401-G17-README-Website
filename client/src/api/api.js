export const loadPostsByUser = async () => {};

export const loadPosts = async () => {
  const payload = {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  };

  try {
    const res = await fetch(`http://localhost:5001/posts`, payload); // Port 5001 for postService
    const posts = await res.json();
    return posts;
    // console.log(posts);
  } catch (err) {
    console.error(err);
  }
};
