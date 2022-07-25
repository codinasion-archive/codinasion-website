import React from "react";

import { useRouter } from "next/router";
import Head from "next/head";

import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  AvatarGroup,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import Link from "@/components/Link";
import MdxComponent from "@/components/MdxComponent";
import Tag from "@/components/Tag";
import Image from "next/image";
import Comment from "@/components/Comment";

export default function DsaId({ dsaData, githubEditLink }) {
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (dsaData !== null) {
    const {
      slug,
      title,
      description,
      image,
      tags,
      contributors,
      latestUpdateDate,
      markdown,
    } = dsaData;

    return (
      <>
        <Head>
          <title key="title">{`${title}`}</title>
          <meta
            key="description"
            name="description"
            content={`${description}`}
          />

          {/* twitter card meta tags */}
          <meta key="twitter-title" name="twitter:title" content={`${title}`} />
          <meta
            key="twitter-description"
            name="twitter:description"
            content={`${description}`}
          />

          {/* og card meta tags */}
          <meta key="og-title" property="og:title" content={`${title}`} />
          <meta
            key="og-description"
            property="og:description"
            content={`${description}`}
          />
          <meta
            key="og-image-alt"
            property="og:image:alt"
            content={`${title}`}
          />
        </Head>

        <Container maxWidth="md">
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
                    href="/dsa"
                  >
                    <CodeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    <Typography variant="bold" component="h5">
                      DSA
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
                  href={`https://github.com/codinasion/codinasion-dsa/blob/master/${githubEditLink}`}
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
                  href={`https://github.com/codinasion/codinasion-dsa/issues/new?labels=%F0%9F%93%9D+content%2C%F0%9F%9B%A0+goal%3A+fix&template=improve-existing-content.yml&title=Issue%20in%20/${githubEditLink}`}
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

          <Box sx={{ my: 4 }}>
            <Typography variant="bold" component="h1" gutterBottom>
              {title}
            </Typography>
            <Divider />

            <Image
              src={image}
              alt={title}
              title={title}
              width={2240}
              height={1260}
            />

            <ReactMarkdown
              components={MdxComponent}
              rehypePlugins={[rehypeRaw]}
            >
              {markdown}
            </ReactMarkdown>

            <Comment />
          </Box>

          <Divider sx={{ mt: 5 }} />

          {contributors !== null && contributors.length > 0 ? (
            <>
              <Box sx={{ my: 2 }}>
                <AvatarGroup
                  max={isMobile ? 7 : 13}
                  style={{ justifyContent: "left", display: "flex" }}
                >
                  {contributors !== null &&
                    contributors.map((username, index) => (
                      <Link key={index} href={`https://github.com/${username}`}>
                        <Avatar
                          alt={`${username}`}
                          src={`https://github.com/${username}.png`}
                          sx={{ width: 32, height: 32 }}
                        />
                      </Link>
                    ))}
                </AvatarGroup>
              </Box>

              <Divider />
            </>
          ) : (
            <></>
          )}

          {tags !== null && tags.length > 0 ? (
            <>
              <Box sx={{ my: 2 }}>
                {tags !== null &&
                  tags.map((tag, index) => (
                    <Tag sx={{ m: 1 }} key={index} tag={tag} disabled={true} />
                  ))}
              </Box>

              <Divider />
            </>
          ) : (
            <></>
          )}

          {latestUpdateDate !== null ? (
            <>
              <Box sx={{ my: 2 }}>
                <Typography variant="bold" component="h5" gutterBottom>
                  Last updated {new Date(latestUpdateDate).toLocaleDateString()}
                </Typography>
              </Box>
            </>
          ) : (
            <></>
          )}

          <Divider />
        </Container>
      </>
    );
  }
}

export async function getStaticPaths() {
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

  const paths =
    allDsaData !== null
      ? allDsaData.slice(0, 2).map((item) => ({
          params: {
            slug: item.slug,
          },
        }))
      : [];

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const dsaData = await fetch(
    `https://raw.githubusercontent.com/${"codinasion"}/${"codinasion-data"}/${"master"}/data/dsa/programme/${
      params.slug
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

  const githubEditLink = "programme/" + params.slug + "/README.md";

  return {
    props: {
      dsaData,
      githubEditLink,
    },
    revalidate: 60,
  };
}
