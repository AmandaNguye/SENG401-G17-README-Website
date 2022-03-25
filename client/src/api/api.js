export const loadPostsByUser = async () => {};

export const loadPosts = async () => {
  const payload = {
    method: "GET",
    headers: {
      "x-access-token": localStorage.getItem("token"),
    },
  };

  try {
    const res = await fetch(`http://localhost:5005/posts`, payload);
    const posts = await res.json();
    return posts;
    // console.log(posts);
  } catch (err) {
    console.error(err);
  }
};
