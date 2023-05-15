import { services } from "google-ads-api";
import type { NextApiRequest, NextApiResponse } from "next";
import { generateKeywordIdeas } from "../../../../shared/services/google-ads-service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<services.IGenerateKeywordIdeaResult[]>
): Promise<void> {
  const data = await generateKeywordIdeas(req.query.query as string);
  return res.status(200).json(data);
}
