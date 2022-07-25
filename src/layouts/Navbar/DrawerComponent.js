import React from "react";

// mui components
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Box,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// custom Link component
import Link from "../../components/Link";

export default function DrawerComponent({ NavbarLinks }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenDrawer(false)}
          onKeyDown={() => setOpenDrawer(false)}
        >
          <List>
            {NavbarLinks.map((data, index) => (
              <Link key={index} href={`${data.url}`} color="text.primary">
                <ListItem button onClick={() => setOpenDrawer(false)}>
                  <ListItemText>{data.text}</ListItemText>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>

      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
