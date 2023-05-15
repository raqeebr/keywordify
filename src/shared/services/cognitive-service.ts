import { AzureKeyCredential, KeyPhraseExtractionResult, KeyPhraseExtractionSuccessResult, TextAnalysisClient } from "@azure/ai-language-text";

const endpoint = process.env.COGNITIVE_SERVICES_ENDPOINT;
const apiKey = process.env.LANGUAGE_API_KEY;

if (!endpoint) {
    throw new Error("Cognitive Services Endpoint env var missing");
}
if (!apiKey) {
    throw new Error("Cognitive Service ApiKey env var missing");
}

let client: TextAnalysisClient;
try {
    client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
} catch (error) {
    console.log(error);
    throw error;
}

export async function extractKeywords(text: string): Promise<string[]> {
    let results: KeyPhraseExtractionResult[];
    try {
        results = await client.analyze("KeyPhraseExtraction", [text]);
    } catch (error) {
        console.log(error);
        throw error;
    }

    return results.flatMap((r) => (r as KeyPhraseExtractionSuccessResult).keyPhrases);
}