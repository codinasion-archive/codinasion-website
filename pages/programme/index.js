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

import ProgrammePost from "@/components/Programme/ProgrammePost";

export default function Programme({ allProgrammeData }) {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [maxCount] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const indexOfLast = page * maxCount;
  const indexOfFirst = indexOfLast - maxCount;
  const data = allProgrammeData.slice(indexOfFirst, indexOfLast);

  const handlePaginationChange = (event, value) => {
    setPage(value);
    // router.push(`/programme?page=${value}`, null, {
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
        <title key="title">{`Programmes`}</title>
        <meta
          key="description"
          name="description"
          content={`List of Programmes`}
        />

        {/* twitter card meta tags */}
        <meta
          key="twitter-title"
          name="twitter:title"
          content={`Programmes - Codinasion`}
        />
        <meta
          key="twitter-description"
          name="twitter:description"
          content={`List of Programmes - Codinasion`}
        />

        {/* og card meta tags */}
        <meta
          key="og-title"
          property="og:title"
          content={`Programmes - Codinasion`}
        />
        <meta
          key="og-description"
          property="og:description"
          content={`List of Programmes - Codinasion`}
        />
        <meta
          key="og-image-alt"
          property="og:image:alt"
          content={`Programmes`}
        />
      </Head>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="bold" component="h1" gutterBottom>
            List of Programmes
          </Typography>
          <Divider />
          <List>
            {data !== null &&
              data.map((data, index) => (
                <ProgrammePost
                  href="/programme"
                  key={index}
                  data={data}
                  index={index}
                />
              ))}
          </List>
        </Box>

        <Box sx={{ my: 4 }}>
          <Pagination
            count={Math.ceil(allProgrammeData.length / maxCount)}
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

  return {
    props: {
      allProgrammeData,
    },
    revalidate: 60,
  };
}
