import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

type Response = boolean | string;

export const getStormModeStatus = async (): Promise<boolean> => {
  const { MONGO_DB_URI } = process.env;

  const mongoDBClient = new MongoClient(MONGO_DB_URI as string);

  const stormModeStatusEnv =
    process.env.ENVIRONMENT === "production" ||
    process.env.NODE_ENV === "production"
      ? "storm-mode-status"
      : "storm-mode-status-test";

  await mongoDBClient.connect();
  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(stormModeStatusEnv);

  const result = (await collection.find({}).project({ _id: 0 }).toArray())[0]
    .stormModeStatus;

  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { method } = req;

  if (method !== "GET") {
    res.status(405).send("Method not allowed. Use GET.");
  }

  try {
    const stormModeStatus = await getStormModeStatus();

    res.status(200).json(stormModeStatus);
  } catch (error) {
    res
      .status(500)
      .json(error instanceof Error ? error.message : "Unexpected error");
  }
}

export { handler };
