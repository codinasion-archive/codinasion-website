import React from "react";

import {
  Container,
  Typography,
  Box,
  Divider,
  Pagination,
  Grid,
} from "@mui/material";

import BlogPost from "@/components/Blog/BlogPost";
import BlogTags from "@/components/Blog/BlogTags";
import Seo from "@/components/Seo";

export default function Blog({ allBlogData, allBlogTagData }) {
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
      <Seo title={`Codinasion Blog`} description={`Codinasion Blog`} />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom align="center">
            Blog
          </Typography>
          <Divider />

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

export async function getStaticProps() {
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
    },
    revalidate: 60,
  };
}
