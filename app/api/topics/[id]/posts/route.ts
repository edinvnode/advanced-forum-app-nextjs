import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type TopicMongo = {
    posts?: unknown[];
};

/*
export async function POST(
    req: Request,
    context: { params: { id: string } }
) {
    const { id } = context.params;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("forumdata");

    const collection = db.collection<TopicMongo>("topics");

    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
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
        return NextResponse.json(
            { error: "Topic not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true });
}
*/

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params; // ✅ REQUIRED in Next 15

    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("forumdata");
    const collection = db.collection("topics");

    const result = await collection.updateOne(
        { _id: new ObjectId(id) },
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

    return NextResponse.json({ success: true });
}
