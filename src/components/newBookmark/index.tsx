import React, { FC, useState } from "react";
import { Container, /* Button */ IconButton } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { GiConfirmed, GiCancel } from "react-icons/gi";

import BookmarkModal from "../bookmarkModal";
import { useStyles } from "./styles";

const NewBookmark: FC = () => {
  const classes = useStyles();
  const [showNewBookmarkModal, setShowNewBookmarkModal] = useState(false);

  return (
    <Container className={classes.container}>
      <IconButton
        onClick={() => setShowNewBookmarkModal(true)}
        title="Add new bookmark"
        color="primary"
        size="medium"
        aria-label="add"
      >
        <FaPlus />
      </IconButton>
      <BookmarkModal
        modalType="New"
        modalStatus={showNewBookmarkModal}
        closeModal={() => setShowNewBookmarkModal(false)}
      />
      <IconButton
        onClick={() => {}}
        title="Batch delete bookmarks"
        color="primary"
        size="medium"
        aria-label="delete"
      >
        <AiTwotoneDelete />
      </IconButton>
      <IconButton
        onClick={() => {}}
        title="Confirm batch delete bookmarks"
        color="primary"
        size="medium"
        aria-label="delete"
      >
        <GiConfirmed />
      </IconButton>
      <IconButton
        onClick={() => {}}
        title="Cancel batch delete bookmarks"
        color="primary"
        size="medium"
        aria-label="cancel-delete"
      >
        <GiCancel />
      </IconButton>
    </Container>
  );
};

export default NewBookmark;
