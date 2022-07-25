import React from "react";

import { Typography, ListItem, ListItemText, Divider } from "@mui/material";

import Link from "../Link";

import Tag from "@/components/Tag";

function ProgrammePost({ href, data, index }) {
  return (
    <>
      <Link href={`${href}/${data.slug}`}>
        <ListItem key={index}>
          <ListItemText
            primary={
              <Typography
                variant="bold"
                component="h2"
                gutterBottom
                style={{ paddingLeft: "5px" }}
              >
                {data.title}
              </Typography>
            }
            secondary={
              <>
                {data.tags.map((tag, index) => (
                  <Tag
                    href={"/programme/tags"}
                    sx={{ m: 1 }}
                    key={index}
                    tag={tag}
                  />
                ))}
              </>
            }
          />
        </ListItem>
        <Divider />
      </Link>
    </>
  );
}

export default ProgrammePost;
