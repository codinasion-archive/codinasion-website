import React from "react";

// mui components
import { Typography } from "@mui/material";

// custom Link component
import Link from "../../components/Link";

export default function FooterText(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <Link color="inherit" href="/">
        Codinasion
      </Link>
      {" ❤️ Open Source"}
    </Typography>
  );
}
