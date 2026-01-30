import { ObjectId } from "mongodb"

export type Post = {
    _id: ObjectId;
    postTitle: string;
    postData: string;
    postAuthor: string;
    createdAt: Date;
};

export type Topic = {
    _id: ObjectId;
    topicTitle: string;
    topicDescription: string;
    topicData: string;
    topicAuthor: string;
    posts: Post[];
    createdAt: Date;
};