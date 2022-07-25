import { DocSearch } from "@docsearch/react";

export default function Search() {
  return (
    <>
      <DocSearch
        appId={`${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}`}
        indexName={`${process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}`}
        apiKey={`${process.env.NEXT_PUBLIC_ALGOLIA_API_KEY}`}
      />
    </>
  );
}
