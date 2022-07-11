import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Response = boolean | string;

const { ADMIN_PASSPHRASE, MONGO_DB_URI } = process.env;

const mongoDBClient = new MongoClient(MONGO_DB_URI as string);

const stormModeStatusEnv =
  process.env.NODE_ENV === "development"
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { headers, method } = req;

  if (method !== "POST") {
    res.status(405).send("Method not allowed. Use POST.");
  }

  if (headers["admin-passphrase"] !== ADMIN_PASSPHRASE) {
    res.status(401).send("Unauthorized");
  }

  try {
    const currentStormModeStatus = await getStormModeStatus();

    const newStormModeStatus = await toggleStormModeStatus(
      currentStormModeStatus
    );

    res.status(200).json(newStormModeStatus);
  } catch (error) {
    res
      .status(500)
      .json(error instanceof Error ? error.message : "Unexpected error");
  }
}
