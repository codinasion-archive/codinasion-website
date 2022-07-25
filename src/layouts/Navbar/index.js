import React from "react";

// mui components
import {
  AppBar,
  Box,
  CssBaseline,
  Fab,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  useScrollTrigger,
  Zoom,
} from "@mui/material";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// custom Link component
import Link from "../../components/Link";

// drawer component for small device
import DrawerComponent from "./DrawerComponent";

// navbar links data
import NavbarLinks from "../../../data/NavbarLinks";

// doc search component
import Search from "../../components/Search";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top"
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

function Navbar() {
  // check for screen size
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        color="default"
        // color="transparent"
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          // backdropFilter: "blur(20px)",
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, mx: 1 }}
          >
            <Link href={`/`} color="text.primary" sx={{ my: 1, mx: 1.5 }}>
              <b>Codinasion</b>
            </Link>
          </Typography>
          {isMobile ? (
            <DrawerComponent NavbarLinks={NavbarLinks} />
          ) : (
            <div>
              {NavbarLinks.map((data, index) => (
                <Link
                  key={index}
                  href={`${data.url}`}
                  variant="button"
                  color="text.primary"
                  sx={{ my: 1, mx: 1.5 }}
                >
                  {data.text}
                </Link>
              ))}
            </div>
          )}
          <Search />
        </Toolbar>
      </AppBar>
      <div id="back-to-top" />
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}

export default Navbar;
