import React from "react";

import { Container, Typography, Box, Divider } from "@mui/material";

import Tag from "@/components/Tag";
import Seo from "@/components/Seo";

export default function Tags({ allTags }) {
  return (
    <>
      <Seo title="Programme Tags" description="List of Programme Tags" />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom>
            List of Tags
          </Typography>
          <Divider />
          <Box sx={{ my: 2 }}>
            {allTags !== null &&
              allTags.map((tag, index) => (
                <Tag
                  href={"/programme/tags"}
                  sx={{ m: 1 }}
                  key={index}
                  tag={tag}
                />
              ))}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const allTags = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/programme/${"tagList.json"}`,
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
      allTags,
    },
    revalidate: 60,
  };
}
