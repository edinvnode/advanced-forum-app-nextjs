import { Post } from "@/types/topic";

type Props = {
  post: Post;
};

function PostArticle({ post }: Props) {
  //helper function
  function timeAgo(date: string | Date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, "second");
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, "minute");
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return rtf.format(-diffInHours, "hour");
    }

    const diffInDays = Math.floor(diffInHours / 24);
    return rtf.format(-diffInDays, "day");
  }

  return (
    <article className="text-white border border-blue-700">
      <h2 className="border border-white mx-2">{post.postTitle}</h2>
      <p className="border border-white mx-2">{post.postData}</p>
      <p className="text-sm border border-white mx-2">
        {timeAgo(post.createdAt)}
      </p>
      <p className="border border-white mx-2">Post author: {post.postAuthor}</p>
      <div className="flex justify-between mx-2">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </article>
  );
}

export default PostArticle;
