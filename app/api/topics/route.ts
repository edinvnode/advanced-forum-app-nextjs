import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET all topics
export async function GET() {
    const client = await clientPromise;
    const db = client.db("forumdata");

    const topics = await db.collection("topics").find({}).toArray();

    return NextResponse.json(topics);
}

// POST new topic
export async function POST(req: Request) {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("forumdata");

    const result = await db.collection("topics").insertOne({
        topicTitle: body.topicTitle,
        topicDescription: body.topicDescription,
        topicData: body.topicData,
        topicAuthor: body.topicAuthor,
        createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
}
