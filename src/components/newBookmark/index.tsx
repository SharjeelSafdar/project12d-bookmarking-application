import React, { FC, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { FaPlus } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { GiConfirmed, GiCancel } from "react-icons/gi";

import BookmarkModal from "../bookmarkModal";
import { useAppContext } from "../../context/appContext";
import { useBatchDeleteBookmarksMutation } from "../../api";

const NewBookmark: FC = () => {
  const {
    isSelectionMode,
    startSelectionMode,
    finishSelectionMode,
    selectedBookmarks,
  } = useAppContext();
  const [showNewBookmarkModal, setShowNewBookmarkModal] = useState(false);
  const [
    batchDeleteBookmarks,
    { loading: deleting },
  ] = useBatchDeleteBookmarksMutation();

  const batchDeleteHandler = async () => {
    const res = await batchDeleteBookmarks({
      variables: { ids: selectedBookmarks },
    });
    console.log(
      `${res.data?.batchDeleteBookmarks.length} bookmark(s) deleted: `,
      res
    );
    finishSelectionMode();
  };

  return (
    <Grid container spacing={1} justify="space-around">
      <Grid item sm={6}>
        <Button
          onClick={() => setShowNewBookmarkModal(true)}
          disabled={isSelectionMode}
          title="Add new bookmark"
          color="primary"
          startIcon={<FaPlus size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="add"
        >
          New Bookmark
        </Button>
        <BookmarkModal
          modalType="New"
          modalStatus={showNewBookmarkModal}
          closeModal={() => setShowNewBookmarkModal(false)}
        />
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={startSelectionMode}
          disabled={isSelectionMode}
          title="Batch delete bookmarks"
          color="primary"
          startIcon={<AiTwotoneDelete size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="delete"
        >
          Batch Delete
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={batchDeleteHandler}
          disabled={!isSelectionMode || deleting}
          title="Confirm batch delete bookmarks"
          color="primary"
          startIcon={<GiConfirmed size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="delete"
        >
          Confirm
        </Button>
      </Grid>
      <Grid item sm={6}>
        <Button
          onClick={finishSelectionMode}
          disabled={!isSelectionMode || deleting}
          title="Cancel batch delete bookmarks"
          color="primary"
          startIcon={<GiCancel size="1rem" />}
          variant="contained"
          fullWidth
          aria-label="cancel-delete"
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewBookmark;
