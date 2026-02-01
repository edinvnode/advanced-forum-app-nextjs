import React from "react";

import { Post } from "@/types/topic";

type Props = {
  post: Post;
};

function PostArticle({ post }: Props) {
  return (
    <article className="text-white border border-white">
      <h2>{post.postTitle}</h2>
      <p>{post.postData}</p>
      <p>{new Date(post.createdAt).toLocaleString()}</p>
    </article>
  );
}

export default PostArticle;
