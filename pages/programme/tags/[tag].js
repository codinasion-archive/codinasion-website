import React from "react";

import {
  Container,
  Typography,
  Box,
  List,
  Divider,
  Pagination,
} from "@mui/material";

import ProgrammePost from "@/components/Programme/ProgrammePost";

import formatTag from "@/components/Tag/formatTag";
import Seo from "@/components/Seo";

export default function TagPage({ allProgramme, tag }) {
  const [maxCount] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const indexOfLast = page * maxCount;
  const indexOfFirst = indexOfLast - maxCount;
  const data = allProgramme.slice(indexOfFirst, indexOfLast);

  const handlePaginationChange = (event, value) => {
    setPage(value);

    window &&
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  };

  return (
    <>
      <Seo
        title={`${formatTag(tag).label} Programmes`}
        description={`List of ${formatTag(tag).label} Programmes`}
      />

      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom>
            List of {formatTag(tag).label} Programmes
          </Typography>
          <Divider />
          <List>
            {data !== null &&
              data.map((data1, index) => (
                <ProgrammePost
                  href="/programme"
                  key={index}
                  data={data1}
                  index={index}
                />
              ))}
          </List>
        </Box>

        <Box sx={{ my: 4 }}>
          <Pagination
            count={Math.ceil(allProgramme.length / maxCount)}
            page={page}
            onChange={handlePaginationChange}
            style={{ justifyContent: "center", display: "flex" }}
            color="primary"
            variant="outlined"
          />
        </Box>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
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

  const paths =
    allTags !== null
      ? allTags.map((item) => ({
          params: {
            tag: `${item}`,
          },
        }))
      : [];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const allProgramme = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/programme/tag/${
      params.tag
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

  return {
    props: {
      allProgramme,
      tag: params.tag,
    },
    revalidate: 60,
  };
}
