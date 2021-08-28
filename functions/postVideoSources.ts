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

const insertVideoSources = async (videoSources): Promise<VideoSource[]> => {
  await mongoDBClient.connect();
  const database = mongoDBClient.db('storms-watch');

  const collection = database.collection('video-sources');

  await collection.deleteMany({});

  await collection.insertMany(videoSources);

  const result = (await collection
    .find({})
    .project({ _id: 0 })
    .toArray()) as VideoSource[];

  return result;
};

exports.handler = async (event): Promise<Response> => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method not allowed. Use POST.',
    };
  }

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
        error: error?.message,
      }),
    };
  }
};
