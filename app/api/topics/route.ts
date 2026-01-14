import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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


//DELETE topic
export async function DELETE(req: Request) {
    const { id } = await req.json();

    const client = await clientPromise;
    const db = client.db("forumdata");

    await db.collection("topics").deleteOne({
        _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
}
