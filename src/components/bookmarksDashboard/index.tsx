import React, { FC } from "react";
import { Container, Box } from "@material-ui/core";

import NewBookmark from "../newBookmark";
import BookmarkItem from "../bookmarkItem";
import { useGetAllBookmarksQuery } from "../../api";

const BookmarksDashboard: FC = () => {
  const { data, loading, error } = useGetAllBookmarksQuery();

  return (
    <Container maxWidth="sm">
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && data && (
        <>
          <NewBookmark />
          <Box marginTop={3}>
            {data.bookmarks.length === 0 ? (
              <p>
                There are no bookmarks saved; press the add button to save one.
              </p>
            ) : (
              data.bookmarks.map(bookmark => (
                <BookmarkItem key={bookmark.id} bookmark={bookmark} />
              ))
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default BookmarksDashboard;
