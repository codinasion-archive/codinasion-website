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
import Seo from "@/components/Seo";

export default function Programme({ allProgrammeData }) {
  const [maxCount] = React.useState(15);
  const [page, setPage] = React.useState(1);
  const indexOfLast = page * maxCount;
  const indexOfFirst = indexOfLast - maxCount;
  const data = allProgrammeData.slice(indexOfFirst, indexOfLast);

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
      <Seo title="Programme" description={"List of Programmes"} />

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
