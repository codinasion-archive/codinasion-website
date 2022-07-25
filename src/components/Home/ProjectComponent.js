import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Link from "@/components/Link";

export default function ProjectComponent({ projects }) {
  return (
    <React.Fragment>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 10, pb: 6 }}
      >
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Our Open Source Projects
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="stretch">
          {projects.map((project) => (
            <Grid
              item
              key={project.name}
              xs={12}
              sm={6}
              md={4}
              style={{ display: "flex" }}
            >
              <Card
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  title={project.name}
                  titleTypographyProps={{ align: "center" }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      {project.stars}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      <StarIcon />
                    </Typography>
                  </Box>

                  <Typography component="h4" variant="subtitle1" align="center">
                    {project.description}
                  </Typography>
                </CardContent>
                <Link href={project.url}>
                  <CardActions>
                    <Button fullWidth variant="outlined">
                      CONTRIBUTE
                    </Button>
                  </CardActions>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
