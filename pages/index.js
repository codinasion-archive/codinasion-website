import React from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Header from "@/components/Header";
import StatsComponent from "@/components/Home/StatsComponent";
import ProjectComponent from "@/components/Home/ProjectComponent";

export default function Index({ stats, projects }) {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        {/* stats component */}
        <StatsComponent stats={stats} />

        <hr />

        {/* projct card component */}
        <ProjectComponent projects={projects} />
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const stats = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/${"stats"}.json`,
    {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => console.log(error));

  const projects = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/master/data/${"projects"}.json`,
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
      stats,
      projects,
    },
    revalidate: 60,
  };
}
