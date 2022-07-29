import React from "react";

import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  Pagination,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import formatTag from "@/components/Tag/formatTag";
import Seo from "@/components/Seo";
import BlogPost from "@/components/Blog/BlogPost";
import BlogTags from "@/components/Blog/BlogTags";

export default function TagPage({ allBlogData, allBlogTagData, tag }) {
  const [maxCount] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const indexOfLast = page * maxCount;
  const indexOfFirst = indexOfLast - maxCount;
  const data = allBlogData.slice(indexOfFirst, indexOfLast);

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

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom align="center">
            Blog
          </Typography>
          <Divider sx={{ mt: 5 }}>
            <Chip
              label={`${formatTag(tag).label} related Blogs`}
              size="small"
              color="success"
              variant="outlined"
            />
          </Divider>

          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{
              mt: 3,
            }}
          >
            {data !== null &&
              data.map((blog, index) => <BlogPost key={index} blog={blog} />)}
          </Grid>
        </Box>

        <Box sx={{ my: 4 }}>
          <Pagination
            count={Math.ceil(allBlogData.length / maxCount)}
            page={page}
            onChange={handlePaginationChange}
            style={{ justifyContent: "center", display: "flex" }}
            color="primary"
            variant="outlined"
          />
        </Box>

        <BlogTags allBlogTagData={allBlogTagData} />
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const allTags = await fetch(
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

  const paths =
    allTags !== null
      ? allTags.map((item) => ({
          params: {
            tag: `${item.tag}`,
          },
        }))
      : [];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const allBlogData = await fetch(
    `https://raw.githubusercontent.com/codinasion/codinasion-data/master/data/blog/tag/${params.tag}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

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
      allBlogData,
      allBlogTagData,
      tag: params.tag,
    },
    revalidate: 60,
  };
}
