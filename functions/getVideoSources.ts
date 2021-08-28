import { MongoClient } from 'mongodb';
require('dotenv').config({ path: '.env' });

type VideoSource = {
  title: string;
  url: string;
};

type Response = {
  body: string;
  statusCode: number;
};

const uri = process.env.MONGO_DB_URI;

const mongoDBClient = new MongoClient(uri);

const findVideoSources = async (): Promise<VideoSource[]> => {
  await mongoDBClient.connect();

  const database = mongoDBClient.db('storms-watch');

  const collection = database.collection('video-sources');

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as VideoSource[];

  return result;
};

exports.handler = async (event): Promise<Response> => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Use GET.',
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
