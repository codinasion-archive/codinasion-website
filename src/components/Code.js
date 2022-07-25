import React from "react";

import { useTheme, useMediaQuery } from "@mui/material";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

function Code({ node, inline, className, children, ...props }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      style={dracula}
      lineProps={{ style: { whiteSpace: "pre-wrap", flexWrap: "wrap" } }}
      wrapLines={isMobile ? false : true}
      // showLineNumbers
      // showInlineLineNumbers
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export default Code;
