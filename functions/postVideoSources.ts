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

const { MONGO_DB_URI, ADMIN_PASSPHRASE } = process.env;

// @ts-expect-error
const mongoDBClient = new MongoClient(MONGO_DB_URI);

const collectionEnv = process.env.NETLIFY_DEV
  ? "video-sources-test"
  : "video-sources";

// @ts-expect-error
const insertVideoSources = async (videoSources): Promise<VideoSource[]> => {
  await mongoDBClient.connect();
  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(collectionEnv);

  await collection.deleteMany({});

  await collection.insertMany(videoSources);

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as VideoSource[];

  return result;
};

const handler: Handler = async (event): Promise<Response> => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method not allowed. Use POST.",
    };
  }

  if (event.headers.token !== ADMIN_PASSPHRASE) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }

  // @ts-expect-error
  const videoSources = JSON.parse(event.body);

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
        // @ts-expect-error
        error: error?.message,
      }),
    };
  }
};

export { handler };
