import React from "react";

import { Container, Typography, Box, Divider, Pagination } from "@mui/material";

import Grid from "@mui/material/Grid";

import DSAPost from "@/components/Dsa/DSAPost";

import Seo from "@/components/Seo";

export default function Dsa({ allDsaData }) {
  const [maxCount] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const indexOfLast = page * maxCount;
  const indexOfFirst = indexOfLast - maxCount;
  const data = allDsaData.slice(indexOfFirst, indexOfLast);

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
        title="Data Structures and Algorithm - DSA"
        description="List of Data Structures and Algorithm Programmes"
      />

      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom>
            List of DSA Programmes
          </Typography>
          <Divider />

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {data !== null &&
              data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <DSAPost href="/dsa" key={index} data={item} index={index} />
                </Grid>
              ))}
          </Grid>
        </Box>

        <Box sx={{ my: 4 }}>
          <Pagination
            count={Math.ceil(allDsaData.length / maxCount)}
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

export async function getStaticProps() {
  const allDsaData = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/${"master"}/data/dsa/${"dsaList.json"}`,
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
      allDsaData,
    },
    revalidate: 60,
  };
}
