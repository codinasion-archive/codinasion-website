import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function StatsComponent({ stats }) {
  return (
    <>
      <Grid container item xs={12} sx={{ mx: "auto", pb: 5 }}>
        {stats &&
          stats.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={3}>
              <Box sx={{ my: 3 }}>
                <Typography variant="bold" component="h2" align="center">
                  {item.value}
                </Typography>
                <Typography variant="bold" component="h3" align="center">
                  {item.title}
                </Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
