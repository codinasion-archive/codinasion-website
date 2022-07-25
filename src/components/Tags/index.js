import React from "react";

import { Box, Divider } from "@mui/material";

import Tag from "@/components/Tag";

export default function Tags({ programmeData }) {
  const { tags } = programmeData;
  return (
    <>
      {tags !== null && tags.length > 0 ? (
        <>
          <Box sx={{ my: 2 }}>
            {tags !== null &&
              tags.map((tag, index) => (
                <Tag
                  href={"/programme/tags"}
                  sx={{ m: 1 }}
                  key={index}
                  tag={tag}
                />
              ))}
          </Box>

          <Divider />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
