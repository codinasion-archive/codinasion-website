import React from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import { Typography, Box, Grid, Chip, Breadcrumbs } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";

import Link from "@/components/Link";

export default function Breadcrump({ programmeData, githubEditLink }) {
  const { title } = programmeData;

  return (
    <>
      <Box sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href="/"
              >
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                <Typography variant="bold" component="h5">
                  HOME
                </Typography>
              </Link>
              <Link
                underline="hover"
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
                href="/programme"
              >
                <CodeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                <Typography variant="bold" component="h5">
                  PROGRAMME
                </Typography>
              </Link>
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.primary"
              >
                <Typography variant="bold" component="h5">
                  {title}
                </Typography>
              </Typography>
            </Breadcrumbs>
          </Grid>

          <Grid item xs={12} md={2}>
            <Link
              href={`https://github.com/codinasion/codinasion-programme/blob/master/${githubEditLink}`}
            >
              <Chip
                icon={<EditIcon />}
                label="Edit in Github"
                variant="outlined"
                clickable
                color="primary"
                size="small"
                style={{ margin: "5px" }}
              />
            </Link>
            <Link
              href={`https://github.com/codinasion/codinasion-programme/issues/new?labels=%F0%9F%93%9D+content%2C%F0%9F%9B%A0+goal%3A+fix&template=improve-existing-content.yml&title=Issue%20in%20/${githubEditLink}`}
            >
              <Chip
                icon={<BugReportIcon />}
                label="Log an issue"
                variant="outlined"
                clickable
                color="primary"
                size="small"
                style={{ margin: "5px" }}
              />
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
