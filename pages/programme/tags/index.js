import React from "react";
import Head from "next/head";

import { Container, Typography, Box, Divider } from "@mui/material";

import Tag from "@/components/Tag";

export default function Tags({ allTags }) {
  return (
    <>
      <Head>
        <title key="title">{`Programme Tags`}</title>
        <meta
          key="description"
          name="description"
          content={`List of Programme Tags`}
        />

        {/* twitter card meta tags */}
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`Programme Tags - Codinasion`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`List of Programme Tags - Codinasion`}
        />

        {/* og card meta tags */}
        <meta
          key="og-title"
          property="og:title"
          content={`Programme Tags - Codinasion`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`List of Programmes - Codinasion`}
        />
        <meta key="og-image-alt" property="og:image:alt" content={`Tags`} />
      </Head>
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
