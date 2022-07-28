import React from "react";

import { useRouter } from "next/router";

import Seo from "@/components/Seo";
import BlogTemplate from "@/components/Blog/BlogTemplate";

export default function BlogId({ blogData, githubEditLink }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (blogData !== null) {
    const { title, description } = blogData;

    return (
      <>
        <Seo title={title} description={description} />
        <BlogTemplate blogData={blogData} githubEditLink={githubEditLink} />
      </>
    );
  }
}

export async function getStaticPaths() {
  const allBlogData = await fetch(
    `https://raw.githubusercontent.com/codinasion/codinasion-data/master/data/blog/blogList.json`,
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
    allBlogData !== null
      ? allBlogData.slice(0, 2).map((item) => ({
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
  const blogData = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/${"master"}/data/blog/blog/${
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

  const githubEditLink = "blog/" + params.slug + "/README.md";

  return {
    props: {
      blogData,
      githubEditLink,
    },
    revalidate: 60,
  };
}
