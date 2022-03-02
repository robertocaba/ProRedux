import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAll, reset } from "../../../features/posts/postsSlice";

const Post = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getAll());
    await dispatch(reset());
  }, []);

  if (isLoading) {
    return <h1>Cargando posts...</h1>;
  }

  const post = posts.map((post) => {
    return (
      <ul className="post" key={post.id}>
          <li>{post.title}</li>
          <button onClick={() => dispatch(deletePost(post.id))}>X</button>
      </ul>
    );
  });
  return <div>{post}</div>;
};

export default Post;
