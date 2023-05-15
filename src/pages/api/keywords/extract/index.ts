import { extractKeywords } from "@/shared/services/cognitive-service";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[]>
): Promise<void> {
    const data = await extractKeywords(req.body as string);
    return res.status(200).json(data);
}
