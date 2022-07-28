import React from "react";

import { useRouter } from "next/router";

import { Container, Typography, Box, Chip, Divider } from "@mui/material";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

import MdxComponent from "@/components/MdxComponent";
import Image from "next/image";
import Comment from "@/components/Comment";

import HrEditor from "@/components/Editor/HrEditor";
import BlogFooter from "@/components/Blog/BlogFooter";

export default function BlogTemplate({ blogData, githubEditLink }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (blogData !== null) {
    const {
      title,
      author,
      date,
      image,
      tags,
      contributors,
      latestUpdateDate,
      markdown,
    } = blogData;
    return (
      <>
        <Container maxWidth="md">
          <Box sx={{ my: 4 }}>
            <Typography
              variant="bold"
              component="h1"
              gutterBottom
              align="center"
              sx={{ my: 5 }}
            >
              {title}
            </Typography>
            <Divider />

            <Image
              src={image}
              alt={title}
              title={title}
              width={2240}
              height={1260}
            />

            <HrEditor
              editLink={`https://github.com/codinasion/codinasion-blog/blob/master/${githubEditLink}`}
              reportLink={`https://github.com/codinasion/codinasion-blog/issues/new?assignees=&labels=blog%2Cenhancement&template=improve-existing-blog.yml&title=Issue%20in%20/${githubEditLink}`}
            />

            <ReactMarkdown
              components={MdxComponent}
              rehypePlugins={[rehypeRaw]}
            >
              {markdown}
            </ReactMarkdown>

            <Divider sx={{ my: 5 }}>
              <Chip
                label="Comments"
                size="small"
                color="success"
                variant="outlined"
              />
            </Divider>

            <Comment />
          </Box>

          <Divider sx={{ mt: 5 }} />

          <BlogFooter
            author={author}
            date={date}
            contributors={contributors}
            latestUpdateDate={latestUpdateDate}
            tags={tags}
          />

          <Divider sx={{ mt: 5 }}>
            <Chip
              label="Bye, see you later"
              size="small"
              color="success"
              variant="outlined"
            />
          </Divider>
        </Container>
      </>
    );
  }
}
