import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
require("dotenv").config({ path: ".env" });

type Response = {
  body: string;
  statusCode: number;
};

const { MONGO_DB_URI } = process.env;

const mongoDBClient = new MongoClient(MONGO_DB_URI as string);

const stormModeStatusEnv = process.env.NETLIFY_DEV
  ? "storm-mode-status-test"
  : "storm-mode-status";

const getStormModeStatus = async (): Promise<boolean> => {
  await mongoDBClient.connect();
  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(stormModeStatusEnv);

  const result = (await collection.find({}).project({ _id: 0 }).toArray())[0]
    .stormModeStatus;

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
    const stormModeStatus = await getStormModeStatus();

    return {
      statusCode: 200,
      body: JSON.stringify(stormModeStatus),
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
