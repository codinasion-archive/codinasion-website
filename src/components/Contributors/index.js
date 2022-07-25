import React from "react";

import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  AvatarGroup,
} from "@mui/material";

import Link from "@/components/Link";

export default function Contributors({ programmeData }) {
  const { contributors } = programmeData;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {contributors !== null && contributors.length > 0 ? (
        <>
          <Box sx={{ my: 2 }}>
            <AvatarGroup
              max={isMobile ? 7 : 13}
              style={{ justifyContent: "left", display: "flex" }}
            >
              {contributors !== null &&
                contributors.map((username, index) => (
                  <Link key={index} href={`https://github.com/${username}`}>
                    <Avatar
                      alt={`${username}`}
                      src={`https://github.com/${username}.png`}
                      sx={{ width: 32, height: 32 }}
                    />
                  </Link>
                ))}
            </AvatarGroup>
          </Box>

          <Divider />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
