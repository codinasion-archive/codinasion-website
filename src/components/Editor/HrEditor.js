import React from "react";

import { Grid, Chip, Divider } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import BugReportIcon from "@mui/icons-material/BugReport";

import Link from "@/components/Link";

export default function HrEditor({ editLink, reportLink }) {
  return (
    <>
      <Divider sx={{ mb: 5 }}>
        <Grid item>
          <Link href={editLink}>
            <Chip
              icon={<EditIcon />}
              label="Edit in Github"
              variant="outlined"
              clickable
              color="primary"
              size="small"
              style={{ margin: "5px" }}
            />
          </Link>
          <Link href={reportLink}>
            <Chip
              icon={<BugReportIcon />}
              label="Log an issue"
              variant="outlined"
              clickable
              color="primary"
              size="small"
              style={{ margin: "5px" }}
            />
          </Link>
        </Grid>
      </Divider>
    </>
  );
}
