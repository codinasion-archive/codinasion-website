import React from "react";

import {
  CardActionArea,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import Link from "../Link";
import Tag from "../Tag";

function DSAPost({ href, data }) {
  return (
    <>
      <Link href={`${href}/${data.slug}`}>
        <Card sx={{ my: 2 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="180"
              image={data.image}
              alt="logo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.description.substring(0, 180)}
                ..........<b>SEE MORE</b>
              </Typography>
              <div style={{ marginTop: "10px" }}>
                {data.tags.map((tag, index) => (
                  <Tag key={index} tag={tag} disabled={true} />
                ))}
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}

export default DSAPost;
