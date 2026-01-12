import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

let client = new MongoClient(uri);
let clientPromise = client.connect();

export default clientPromise;
