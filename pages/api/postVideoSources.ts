import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { IVideoSource } from "../../types";

type Response = IVideoSource[] | string;

const { ADMIN_PASSPHRASE, DEPLOYMENT_ENVIRONMENT, MONGO_DB_URI } = process.env;

const mongoDBClient = new MongoClient(MONGO_DB_URI as string);

const videoSourcesCollectionName =
  DEPLOYMENT_ENVIRONMENT === "production"
    ? "video-sources"
    : "video-sources-test";

const insertVideoSources = async (
  videoSources: IVideoSource[]
): Promise<IVideoSource[]> => {
  await mongoDBClient.connect();
  const database = mongoDBClient.db("storms-watch");

  const collection = database.collection(videoSourcesCollectionName);

  await collection.deleteMany({});

  await collection.insertMany(videoSources);

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
  const { body, headers, method } = req;

  if (method !== "POST") {
    res.status(405).send("Method not allowed. Use POST.");
  }

  if (headers["admin-passphrase"] !== ADMIN_PASSPHRASE) {
    res.status(401).send("Unauthorized");
  }

  const videoSources = JSON.parse(body || "");

  try {
    const updatedVideoSources = await insertVideoSources(videoSources);

    res.status(200).json(updatedVideoSources);
  } catch (error) {
    res
      .status(500)
      .json(error instanceof Error ? error.message : "Unexpected error");
  }
}
