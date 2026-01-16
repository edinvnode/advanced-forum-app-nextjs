import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Props = {
  params: { id: string };
};

export default async function TopicPage({ params }: Props) {
  const client = await clientPromise;
  const db = client.db("forumdata");

  const topic = await db.collection("topics").findOne({
    _id: new ObjectId(params.id),
  });

  if (!topic) {
    return <div className="p-10">Topic not found</div>;
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{topic.topicTitle}</h1>
      <p className="text-gray-600 mb-2">{topic.topicDescription}</p>
      <p className="mb-4">{topic.topicData}</p>
      <span className="text-sm text-gray-500">
        Created by: {topic.topicAuthor}
      </span>
    </div>
  );
}
