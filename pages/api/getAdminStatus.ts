import type { NextApiRequest, NextApiResponse } from "next";

type Response = boolean | string;

const { ADMIN_PASSPHRASE } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { headers, method } = req;

  if (method !== "GET") {
    res.status(405).send("Method not allowed. Use GET.");
  }

  try {
    res.status(200).json(headers["admin-passphrase"] === ADMIN_PASSPHRASE);
  } catch (error) {
    res
      .status(500)
      .json(error instanceof Error ? error.message : "Unexpected error");
  }
}

export { handler };
