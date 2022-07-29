import React from "react";

import { Typography, Box, Avatar, Grid, Chip, Divider } from "@mui/material";

import Link from "@/components/Link";

import formatTag from "@/components/Tag/formatTag";

export default function BlogFooter({
  author,
  date,
  contributors,
  latestUpdateDate,
  tags,
}) {
  return (
    <>
      {author && (
        <>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="bold" component="h4" gutterBottom>
                  Author :
                </Typography>
              </Grid>
              <Grid item>
                <Link href={`https://github.com/${author}`}>
                  <Chip
                    size="small"
                    clickable
                    avatar={
                      <Avatar
                        alt={`${author}`}
                        src={`https://github.com/${author}.png`}
                      />
                    }
                    label={`${author}`}
                    variant="outlined"
                  />
                </Link>
              </Grid>
            </Grid>
          </Box>

          <Divider />
        </>
      )}

      {date && (
        <>
          <Box sx={{ my: 1 }}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="bold" component="h4" gutterBottom>
                  Publish Date :
                </Typography>
              </Grid>
              <Grid item>{new Date(date).toLocaleDateString()}</Grid>
            </Grid>
          </Box>

          <Divider />
        </>
      )}

      {contributors && contributors.length > 0 && (
        <>
          <Box sx={{ my: 2 }}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="bold" component="h4" gutterBottom>
                  Contributors :
                </Typography>
              </Grid>
              <Grid item>
                {contributors !== null &&
                  contributors.map((username, index) => (
                    <Link key={index} href={`https://github.com/${username}`}>
                      <Chip
                        sx={{ mx: 1 }}
                        size="small"
                        clickable
                        avatar={
                          <Avatar
                            alt={`${username}`}
                            src={`https://github.com/${username}.png`}
                          />
                        }
                        label={`${author}`}
                        variant="outlined"
                      />
                    </Link>
                  ))}
              </Grid>
            </Grid>
          </Box>

          <Divider />
        </>
      )}

      {latestUpdateDate && (
        <>
          <Box sx={{ my: 1 }}>
            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="bold" component="h4" gutterBottom>
                  Last updated :
                </Typography>
              </Grid>
              <Grid item>
                {new Date(latestUpdateDate).toLocaleDateString()}
              </Grid>
            </Grid>
          </Box>

          <Divider />
        </>
      )}

      {tags !== null && tags.length > 0 ? (
        <>
          <Box sx={{ my: 2 }}>
            {tags !== null &&
              tags.map((tag, index) => (
                <Link key={index} href={`/blog/tags/${tag}`}>
                  <Chip
                    label={`${formatTag(tag).label}`}
                    variant="outlined"
                    clickable
                    color="info"
                    size="small"
                    style={{ margin: "5px" }}
                  />
                </Link>
              ))}
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
