import React from "react";

import { Container, Typography, Box } from "@mui/material";

import Seo from "@/components/Seo";

import BlogTags from "@/components/Blog/BlogTags";

export default function BlogTag({ allBlogTagData }) {
  return (
    <>
      <Seo title="Blog Tags" description={"List of Blog Tags"} />

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom align="center">
            Blog
          </Typography>
        </Box>

        <BlogTags allBlogTagData={allBlogTagData} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const allBlogTagData = await fetch(
    `https://raw.githubusercontent.com/codinasion/codinasion-data/master/data/blog/tagList.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  return {
    props: {
      allBlogTagData,
    },
    revalidate: 60,
  };
}
