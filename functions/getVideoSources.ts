import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { IVideoSource } from "../types";
require("dotenv").config({ path: ".env" });

type Response = {
  body: string;
  statusCode: number;
};

const { MONGO_DB_URI } = process.env;

const mongoDBClient = new MongoClient(MONGO_DB_URI || "");

const collectionEnv = process.env.NETLIFY_DEV
  ? "video-sources-test"
  : "video-sources";

const findVideoSources = async (): Promise<IVideoSource[]> => {
  await mongoDBClient.connect();

  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(collectionEnv);

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as IVideoSource[];

  return result;
};

const handler: Handler = async (event): Promise<Response> => {
  const { httpMethod } = event;

  if (httpMethod !== "GET") {
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
        error: error instanceof Error && error.message,
      }),
    };
  }
};

export { handler };
