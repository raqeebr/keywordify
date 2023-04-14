type CompetitionLevel = "UNSPECIFIED" | "UKNOWN" | "LOW" | "MEDIUM" | "HIGH"

type Concept = {
    name?: string | null,
    group?: string | null
}

export type KeywordIdea = {
    text?: string | null,
    competition?: CompetitionLevel | null,
    avgMonthlySearches?: number | null,
    avgCPCMicros?: number | null,
    competiitionIndex?: number | null,
    minBid?: number | null,
    maxBid?: number | null,
    relatedConcepts?: Concept[] | null
}