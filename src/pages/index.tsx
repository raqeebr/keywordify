import Conditional from "@/components/conditional";
import Header from "@/components/header";
import fetcher from "@/shared/fetcher";
import { ActionType, KeywordIdea } from "@/types/api";
import Head from "next/head";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import KeywordsGraph from "../components/keywords-graph";

export default function Home(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [actionType, setActionType] = useState<ActionType>("search");
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);
  const { data: keywordSuggestions, isLoading, isValidating } = useSWR<KeywordIdea[]>(
    () => (searchQuery ? `/api/keywords/search?query=${searchQuery}` : null),
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: false
    }
  );

  const handleKeywordSearchSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery") as string;
    if (!searchQuery?.trim()) return;
    setSearchQuery(searchQuery);
  };

  const handleKeywordExtractSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const body = formData.get("postText") as string;
    if (!body?.trim()) return;

    const res = await fetch("/api/keywords/extract", {
      method: "POST",
      body: JSON.stringify(body)
    });
    const keywords = await res.json() as string[];
    console.log(keywords);
    setExtractedKeywords(keywords);
  };

  const handleActionTypeChange = (): void => {
    setActionType(actionType === "search" ? "extract" : "search");
  };

  return (
    <div className="body">
      <Head>
        <title>Keywordify</title>
        <meta name="description" content="SEO optimization tool" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <Header />
        <fieldset>
          <legend>What would you like to perform?</legend>
          <label htmlFor="search">
            <input type="radio" id="search" name="actionType" value="search" onChange={handleActionTypeChange} checked={actionType === "search"} />
            Search
          </label>
          <label htmlFor="extract">
            <input type="radio" id="extract" name="actionType" value="extract" onChange={handleActionTypeChange} checked={actionType === "extract"} />
            Extract
          </label>
        </fieldset>

        <Conditional showWhen={actionType === "search"}>
          <form onSubmit={handleKeywordSearchSubmit}>
            <i><label htmlFor="searchQuery">Start by searching for keywords...</label></i>
            <input type="text" id="searchQuery" name="searchQuery" required />
            <button type="submit" disabled={isLoading || isValidating}>Search</button>
          </form>
          <Conditional showWhen={isLoading || isValidating}>
            <h5 aria-busy={true}>Searching keywords...</h5>
          </Conditional>
          <Conditional showWhen={!!keywordSuggestions?.length && !isLoading && !isValidating}>
            <h5>Found {keywordSuggestions?.length} result(s) for {<i><b>{searchQuery}</b></i>}</h5>
            <KeywordsGraph keywordSuggestions={keywordSuggestions} />
          </Conditional>
        </Conditional>

        <Conditional showWhen={actionType === "extract"}>
          <form onSubmit={handleKeywordExtractSubmit}>
            <i><label htmlFor="postText">Enter your marketing post here to extract keywords</label></i>
            <textarea name="postText" id="postText"></textarea>
            <button type="submit" disabled={isLoading || isValidating}>Extract</button>
          </form>
          <Conditional showWhen={!!extractedKeywords.length}>
            <article>
              {extractedKeywords.map((e, i) => (<div key={i}>{e}</div>))}
            </article>
          </Conditional>
        </Conditional>
      </main>
    </div>
  );
}
