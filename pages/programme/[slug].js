import React from "react";

import { useRouter } from "next/router";

import ProgrammeTemplate from "@/components/Programme/ProgrammeTemplate";

export default function ProgrammeId({ programmeData, githubEditLink }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (programmeData !== null) {
    return (
      <>
        <ProgrammeTemplate
          programmeData={programmeData}
          githubEditLink={githubEditLink}
        ></ProgrammeTemplate>
      </>
    );
  }
}

export async function getStaticPaths() {
  const allProgrammeData = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/${"master"}/data/programme/${"programmeList.json"}`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const paths =
    allProgrammeData !== null
      ? allProgrammeData.slice(0, 2).map((item) => ({
          params: {
            slug: item.slug,
          },
        }))
      : [];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const programmeData = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/${"master"}/data/programme/programme/${
      params.slug
    }.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const githubEditLink = "programme/" + params.slug + "/README.md";

  return {
    props: {
      programmeData,
      githubEditLink,
    },
    revalidate: 60,
  };
}
