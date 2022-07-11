import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { IVideoSource } from "../types";
require("dotenv").config({ path: ".env" });

type Response = {
  body: string;
  statusCode: number;
};

const { MONGO_DB_URI, ADMIN_PASSPHRASE } = process.env;

const mongoDBClient = new MongoClient(MONGO_DB_URI as string);

const collectionEnv = process.env.NETLIFY_DEV
  ? "video-sources-test"
  : "video-sources";

const insertVideoSources = async (
  videoSources: IVideoSource[]
): Promise<IVideoSource[]> => {
  await mongoDBClient.connect();
  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(collectionEnv);

  await collection.deleteMany({});

  await collection.insertMany(videoSources);

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as IVideoSource[];

  return result;
};

const handler: Handler = async (event): Promise<Response> => {
  const { body, headers, httpMethod } = event;

  if (httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method not allowed. Use POST.",
    };
  }

  if (headers["admin-passphrase"] !== ADMIN_PASSPHRASE) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  const videoSources = JSON.parse(body || "");

  try {
    const updatedVideoSources = await insertVideoSources(videoSources);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedVideoSources),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error && error.message,
      }),
    };
  }
};

export { handler };
