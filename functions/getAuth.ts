import { Handler } from "@netlify/functions";
require("dotenv").config({ path: ".env" });

type Response = {
  body: string;
  statusCode: number;
};

const { REACT_APP_DASHBOARD_PASSPHRASE } = process.env;

const handler: Handler = async (event): Promise<Response> => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method not allowed. Use GET.",
    };
  }

  try {
    const { token } = event.headers;

    return {
      statusCode: 200,
      body: JSON.stringify(token === REACT_APP_DASHBOARD_PASSPHRASE),
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

export { handler };
