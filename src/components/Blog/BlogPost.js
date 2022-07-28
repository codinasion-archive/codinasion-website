import React from "react";

import { Typography } from "@mui/material";

import { CardActionArea, Card, CardContent, CardMedia } from "@mui/material";

import Grid from "@mui/material/Grid";

import Link from "@/components/Link";

export default function BlogPost({ blog }) {
  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Link href={`/blog/${blog.slug}`}>
          <Card
            sx={{
              m: 2,
              ":hover": {
                boxShadow: 20, // theme.shadows[20]
              },
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                image={blog.image}
                alt="logo"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description.substring(0, 70)}
                  ..........<b>SEE MORE</b>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    </>
  );
}
