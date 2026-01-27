import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type TopicMongo = {
    posts?: unknown[];
};

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("forumdata");

    const collection = db.collection<TopicMongo>("topics");

    const result = await collection.updateOne(
        { _id: new ObjectId(params.id) },
        {
            $push: {
                posts: {
                    postTitle: body.postTitle,
                    postData: body.postData,
                    postAuthor: body.postAuthor ?? "admin",
                    createdAt: new Date(),
                },
            },
        }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}
