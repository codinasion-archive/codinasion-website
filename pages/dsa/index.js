import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import {
  Container,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  List,
  Divider,
  Pagination,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import DSAPost from "@/components/Dsa/DSAPost";

import siteMetadata from "@/data/siteMetadata";

export default function Dsa({ allDsaData }) {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [maxCount] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const indexOfLast = page * maxCount;
  const indexOfFirst = indexOfLast - maxCount;
  const data = allDsaData.slice(indexOfFirst, indexOfLast);

  const handlePaginationChange = (event, value) => {
    setPage(value);
    // router.push(`/dsa?page=${value}`, null, {
    //   shallow: true,
    // });
    window &&
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
  };

  // React.useEffect(() => {
  //   if (router.query.page) {
  //     setPage(parseInt(router.query.page));
  //   }
  // }, [router.query.page]);
  return (
    <>
      <Head>
        <title key="title">{`Data Structures and Algorithm - DSA`}</title>
        <meta
          key="description"
          name="description"
          content={`List of Data Structures and Algorithm Programmes`}
        />

        {/* twitter card meta tags */}
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`Data Structures and Algorithm - DSA`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`List of Data Structures and Algorithm Programmes`}
        />

        {/* og card meta tags */}
        <meta
          key="og-title"
          property="og:title"
          content={`Data Structures and Algorithm - DSA`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`List of Data Structures and Algorithm Programmes`}
        />
        <meta key="og-image-alt" property="og:image:alt" content={`DSA`} />
      </Head>
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
