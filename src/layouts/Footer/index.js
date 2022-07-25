import React from "react";

// mui components
import { Grid, Typography, GlobalStyles, Container } from "@mui/material";

// custom Link component
import Link from "../../components/Link";

// copyright component
import FooterText from "./FooterText";

// footer links data
import FooterLinks from "../../../data/FooterLinks";

function Footer() {
  return (
    <>
      <GlobalStyles
        styles={{
          ul: { margin: 0, padding: 0, listStyle: "none" },
        }}
      />
      <Container
        maxWidth="lg"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {FooterLinks.map((footer, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Typography variant="h6" gutterBottom>
                <b>{footer.title}</b>
              </Typography>
              <ul>
                {footer.data.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={`${item.url}`}
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      <b>{item.text}</b>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <FooterText sx={{ mt: 5 }} />
      </Container>
    </>
  );
}

export default Footer;
