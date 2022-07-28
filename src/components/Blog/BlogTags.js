import React from "react";

import { Box, Chip, Divider, Avatar } from "@mui/material";

import Grid from "@mui/material/Grid";

import Link from "@/components/Link";

import randomColor from "@/components/randomColor";

import formatTag from "../Tag/formatTag";

export default function BlogTags({ allBlogTagData }) {
  return (
    <>
      <Divider sx={{ mt: 5 }}>
        <Chip label="Tags" size="small" color="success" variant="outlined" />
      </Divider>

      <Box sx={{ my: 4 }} alignItems="center" justifyContent="center">
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{
            mt: 3,
          }}
        >
          {allBlogTagData &&
            allBlogTagData.map((tag, index) => (
              <Link href={`/blog/tags/${tag.tag}`} key={index}>
                <Chip
                  clickable
                  label={`${formatTag(tag.tag).label}`}
                  avatar={
                    <Avatar
                      style={{
                        order: 2,
                        marginRight: "5px",
                      }}
                    >
                      {tag.count <= 99 ? `${tag.count}` : `${tag.count}+`}
                    </Avatar>
                  }
                  size="medium"
                  variant="outlined"
                  style={{ margin: "0.5rem", color: randomColor() }}
                />
              </Link>
            ))}
        </Grid>
      </Box>
    </>
  );
}
