import React from "react";

import { Container, Typography, Box, Divider } from "@mui/material";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import MdxComponent from "@/components/MdxComponent";
import Comment from "@/components/Comment";
import Seo from "@/components/Seo";
import Breadcrump from "@/components/Breadcrump";
import Contributors from "@/components/Contributors";
import Tags from "@/components/Tags";
import LastUpdated from "@/components/LastUpdated";

function ProgrammeTemplate({ programmeData, githubEditLink, children }) {
  const { slug, title, markdown } = programmeData;
  return (
    <>
      <Seo
        title={programmeData.title}
        description={programmeData.description}
      />

      <Container maxWidth="md">
        <Breadcrump
          programmeData={programmeData}
          githubEditLink={githubEditLink}
        />

        <Box sx={{ my: 4 }}>
          {/* title */}
          <Typography variant="bold" component="h1" gutterBottom>
            {title}
          </Typography>

          <Divider />

          {/* code block */}
          <ReactMarkdown components={MdxComponent} rehypePlugins={[rehypeRaw]}>
            {markdown}
          </ReactMarkdown>

          {/* custom components (if any) */}
          {children}

          {/* comment component */}
          <Comment index={slug} />
        </Box>

        <Divider sx={{ mt: 5 }} />

        {/* contributors showcase */}
        <Contributors programmeData={programmeData} />

        {/* tags showcase */}
        <Tags programmeData={programmeData} />

        {/* latest update date showcase */}
        <LastUpdated programmeData={programmeData} />

        <Divider />
      </Container>
    </>
  );
}

export default ProgrammeTemplate;
