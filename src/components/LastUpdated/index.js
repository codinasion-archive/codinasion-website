import React from "react";

import { Typography, Box } from "@mui/material";

export default function LastUpdated({ programmeData }) {
  const { latestUpdateDate } = programmeData;
  return (
    <>
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
    </>
  );
}
