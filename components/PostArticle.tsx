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
    <article className="text-white">
      <h2 className="border border-white">{post.postTitle}</h2>
      <p className="border border-white">{post.postData}</p>
      <span className="text-sm border border-white">
        {timeAgo(post.createdAt)}
      </span>
    </article>
  );
}

export default PostArticle;
