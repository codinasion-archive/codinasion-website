import React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import formatTag from "./Tag/formatTag";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CodeBlock({ children }) {
  const [blocks, setBlocks] = React.useState([]);
  const [tabs, setTabs] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const makeblock = () => {
    children.map((child) => {
      if (child.type === "pre") {
        let classname = child.props.children[0].props.className;

        let lang = classname.split("-")[1];

        setBlocks((oldBlocks) => [...oldBlocks, child]);
        setTabs((oldTabs) => [...oldTabs, lang]);
      }
    });
  };

  React.useEffect(() => {
    makeblock();

    return () => makeblock();
  }, []); // eslint-disable-line

  return (
    <div>
      <Box
        sx={{ width: "100%", border: 1, borderColor: "primary.main", my: 5 }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={`${
                  formatTag(tab).tag === "c"
                    ? "C"
                    : formatTag(tab).tag === "cpp"
                    ? "C++"
                    : formatTag(tab).tag === "cs"
                    ? "C#"
                    : formatTag(tab).tag === "java"
                    ? "JAVA"
                    : formatTag(tab).tag === "python"
                    ? "PYTHON"
                    : formatTag(tab).tag === "go"
                    ? "GO"
                    : formatTag(tab).tag === "js"
                    ? "JS"
                    : formatTag(tab).tag === "php"
                    ? "PHP"
                    : formatTag(tab).tag === "julia"
                    ? "JULIA"
                    : formatTag(tab).tag === "rust"
                    ? "RUST"
                    : tab
                }`}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        {blocks.map((block, index) => (
          <TabPanel key={index} value={value} index={index}>
            {block}
          </TabPanel>
        ))}
      </Box>
    </div>
  );
}

export default CodeBlock;
