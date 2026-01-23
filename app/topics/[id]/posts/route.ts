import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

type Post = {
    postTitle: string;
    postData: string;
    postAuthor: string;
    createdAt: Date;
};

type Topic = {
    _id: ObjectId;
    topicTitle: string;
    topicDescription: string;
    topicData: string;
    topicAuthor: string;
    createdAt: Date;
    posts: Post[]; // ✅ important
};

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("forumdata");

    const newPost: Post = {
        postTitle: body.postTitle,
        postData: body.postData,
        postAuthor: body.postAuthor || "admin",
        createdAt: new Date(),
    };

    const result = await db.collection<Topic>("topics").updateOne(
        { _id: new ObjectId(id) },
        { $push: { posts: newPost } } // ✅ no TS error now
    );

    if (result.matchedCount === 0) {
        return NextResponse.json(
            { success: false, message: "Topic not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true });
}
