import React from "react";

import Link from "../Link";
import formatTag from "./formatTag";
import GetChip from "./GetChip";

function Tag({ href, tag, disabled }) {
  return (
    <>
      {!disabled && (
        <Link href={`${href}/${formatTag(tag).tag}`}>
          <GetChip tag={tag} />
        </Link>
      )}

      {disabled && <GetChip tag={tag} />}
    </>
  );
}

export default Tag;
