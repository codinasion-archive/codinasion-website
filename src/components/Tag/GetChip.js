import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

import formatTag from "./formatTag";

// define tag colors
const tagColor = {
  c: "primary",
  cpp: "info",
  cs: "primary",
  py: "success",
  java: "error",
  go: "info",
  js: "secondary",
  php: "primary",
  julia: "success",
};

function GetChip({ tag }) {
  return (
    <Chip
      avatar={
        <Avatar
          alt={`${formatTag(tag).label}`}
          src={`https://raw.githubusercontent.com/codinasion/codinasion/master/image/language/${
            formatTag(tag).tag
          }.png`}
        />
      }
      label={`${formatTag(tag).label}`}
      variant="outlined"
      clickable
      color={
        tagColor[formatTag(tag).tag] ? tagColor[formatTag(tag).tag] : "primary"
      }
      size="small"
      style={{ margin: "5px" }}
    />
  );
}

export default GetChip;
