import { Handler } from "@netlify/functions";
require("dotenv").config({ path: ".env" });

type Response = {
  body: string;
  statusCode: number;
};

const { ADMIN_PASSPHRASE } = process.env;

const handler: Handler = async (event): Promise<Response> => {
  const { headers, httpMethod } = event;

  if (httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method not allowed. Use GET.",
    };
  }

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(headers["admin-passphrase"] === ADMIN_PASSPHRASE),
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
