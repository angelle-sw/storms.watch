import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { IVideoSource } from "../../types";

type Response = IVideoSource[] | string;

export const getVideoSources = async (): Promise<IVideoSource[]> => {
  const { DEPLOYMENT_ENVIRONMENT, MONGO_DB_URI } = process.env;

  const mongoDBClient = new MongoClient(MONGO_DB_URI || "");

  const videoSourcesCollectionName =
    DEPLOYMENT_ENVIRONMENT === "production"
      ? "video-sources"
      : "video-sources-test";

  await mongoDBClient.connect();

  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(videoSourcesCollectionName);

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as IVideoSource[];

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
    const videoSources = await getVideoSources();

    res.status(200).json(videoSources);
  } catch (error) {
    res
      .status(500)
      .json(error instanceof Error ? error.message : "Unexpected error");
  }
}
