import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
require("dotenv").config({ path: ".env" });

type Response = {
  body: string;
  statusCode: number;
};

const { ADMIN_PASSPHRASE, MONGO_DB_URI } = process.env;

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

const toggleStormModeStatus = async (
  currentStormModeStatus: boolean
): Promise<boolean> => {
  await mongoDBClient.connect();
  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(stormModeStatusEnv);

  await collection.deleteMany({});

  await collection.insertMany([{ stormModeStatus: !currentStormModeStatus }]);

  const result = (await collection.find({}).project({ _id: 0 }).toArray())[0]
    .stormModeStatus;

  return result;
};

const handler: Handler = async (event): Promise<Response> => {
  const { headers, httpMethod } = event;

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

  try {
    const currentStormModeStatus = await getStormModeStatus();

    const newStormModeStatus = await toggleStormModeStatus(
      currentStormModeStatus
    );

    return {
      statusCode: 200,
      body: JSON.stringify(newStormModeStatus),
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
