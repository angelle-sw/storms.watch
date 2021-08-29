import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
require("dotenv").config({ path: ".env" });

type VideoSource = {
  id: string;
  status: boolean;
  title: string;
  url: string;
};

type Response = {
  body: string;
  statusCode: number;
};

const { MONGO_DB_URI } = process.env;

const mongoDBClient = new MongoClient(MONGO_DB_URI);

const collectionEnv = process.env.NETLIFY_DEV
  ? "video-sources-test"
  : "video-sources";

const findVideoSources = async (): Promise<VideoSource[]> => {
  await mongoDBClient.connect();

  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(collectionEnv);

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as VideoSource[];

  return result;
};

const handler: Handler = async (event): Promise<Response> => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method not allowed. Use GET.",
    };
  }

  try {
    const videoSources = await findVideoSources();

    return {
      statusCode: 200,
      body: JSON.stringify(videoSources),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error?.message,
      }),
    };
  }
};

export { handler };
