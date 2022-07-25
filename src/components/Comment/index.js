import Giscus from "@giscus/react";

export default function Comment() {
  return (
    <>
      <Giscus
        id="comments"
        repo={`${process.env.NEXT_PUBLIC_GISCUS_REPO}`}
        repoId={`${process.env.NEXT_PUBLIC_GISCUS_REPO_ID}`}
        category={`${process.env.NEXT_PUBLIC_GISCUS_CATEGORY}`}
        categoryId={`${process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}`}
        mapping={`${process.env.NEXT_PUBLIC_GISCUS_MAPPING}`}
        term="Welcome to Codinasion :)"
        reactionsEnabled={`${process.env.NEXT_PUBLIC_GISCUS_REACTIONS_ENABLED}`}
        emitMetadata={`${process.env.NEXT_PUBLIC_GISCUS_EMIT_METADATA}`}
        inputPosition={`${process.env.NEXT_PUBLIC_GISCUS_INPUT_POSITION}`}
        theme={`${process.env.NEXT_PUBLIC_GISCUS_THEME}`}
        lang={`${process.env.NEXT_PUBLIC_GISCUS_LANGUAGE}`}
        loading={`${process.env.NEXT_PUBLIC_GISCUS_LOADING}`}
      />
    </>
  );
}
