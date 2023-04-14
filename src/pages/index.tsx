import Conditional from "@/components/conditional";
import Header from "@/components/header";
import fetcher from "@/shared/fetcher";
import { KeywordIdea } from "@/types/api";
import Head from "next/head";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import KeywordsGraph from "../components/keywords-graph";

export default function Home(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const { data: keywordSuggestions, isLoading, isValidating } = useSWR<KeywordIdea[]>(
    () => (searchQuery ? `/api/keywords?query=${searchQuery}` : null),
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
      refreshWhenOffline: false,
      revalidateOnReconnect: false
    }
  );

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery") as string;
    if (!searchQuery?.trim()) return;
    setSearchQuery(searchQuery);
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
        <form onSubmit={handleSubmit}>
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
      </main>
    </div>
  );
}
