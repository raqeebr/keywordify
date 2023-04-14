import { KeywordIdea } from "@/types/api";
import { GoogleAdsApi, services } from "google-ads-api";

const googleAdsClientId = process.env.GOOGLE_ADS_CLIENT_ID;
const googleAdsClientSecret = process.env.GOOGLE_ADS_CLIENT_SECRET;
const googleAdsDevToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN;
const googleAdsRefreshToken = process.env.GOOGLE_ADS_REFRESH_TOKEN;
const googleAdsCustomerId = process.env.GOOGLE_ADS_CUSTOMER_ID;

if (!googleAdsClientId) {
    throw new Error("Google Ads client id env var missing");
}
if (!googleAdsClientSecret) {
    throw new Error("Google Ads client secret env var missing");
}
if (!googleAdsDevToken) {
    throw new Error("Google Ads developer token env var missing");
}
if (!googleAdsRefreshToken) {
    throw new Error("Google Ads Refresh token env var missing");
}
if (!googleAdsCustomerId) {
    throw new Error("Google Ads Customer id env var missing");
}

// Create the Google Ads API client object
const googleAdsClient = new GoogleAdsApi({
    client_id: googleAdsClientId,
    client_secret: googleAdsClientSecret,
    developer_token: googleAdsDevToken
});

// Create a customer object with the specified customer ID
const customer = googleAdsClient.Customer({
    customer_id: googleAdsCustomerId,
    refresh_token: googleAdsRefreshToken
});

export async function generateKeywordIdeas(searchQuery: string, pageToken?: string): Promise<KeywordIdea[]> {
    const keywordSeed = new services.KeywordSeed({
        keywords: [searchQuery]
    }) as services.IKeywordSeed;

    const requestBody = {
        customer_id: customer.credentials.customer_id,
        keyword_seed: keywordSeed,
        page_size: 10
    } as services.GenerateKeywordIdeasRequest;

    if (pageToken) {
        requestBody.page_token = pageToken;
    }

    try {
        const data = await customer.keywordPlanIdeas.generateKeywordIdeas(requestBody);
        return (data as unknown as services.IGenerateKeywordIdeaResult[]).map(d => ({
            text: d.text,
            competition: d.keyword_idea_metrics?.competition,
            avgMonthlySearches: d.keyword_idea_metrics?.avg_monthly_searches,
            avgCPCMicros: d.keyword_idea_metrics?.average_cpc_micros,
            competiitionIndex: d.keyword_idea_metrics?.competition_index,
            minBid: d.keyword_idea_metrics?.low_top_of_page_bid_micros,
            maxBid: d.keyword_idea_metrics?.high_top_of_page_bid_micros,
            relatedConcepts: d.keyword_annotations?.concepts?.map(c => ({ concept: c.concept_group?.name, name: c.name }))
        } as KeywordIdea));
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}
