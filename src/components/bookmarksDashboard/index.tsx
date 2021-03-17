import React, { FC } from "react";
import { Container, Box } from "@material-ui/core";

import NewBookmark from "../newBookmark";
import BookmarkItem from "../bookmarkItem";
import { Bookmark } from "../../types";
// import { useGetAllTodosQuery } from "../../api";

const data: { bookmarks: Bookmark[] } = {
  bookmarks: [
    {
      id: "293191511802118661",
      title: "The first bookmark",
      url: "https://google.com",
    },
    {
      id: "293191515187970565",
      title: "The second bookmark",
      url: "https://wikipedia.com",
    },
    {
      id: "293191833980240391",
      title: "The third bookmark",
      url: "https://youtube.com",
    },
    {
      id: "293191833980240399",
      title: "The third bookmark The third bookmark The third bookmark",
      url: "https://youtube.com",
    },
  ],
};

const BookmarksDashboard: FC = () => {
  return (
    <Container maxWidth="sm">
      {/* {loading && <p>Loading...</p>}
      {error && <p>Something went wrong...</p>}
      {!loading && !error && data && ( */}
      <>
        <NewBookmark />
        <Box marginTop={3}>
          {data.bookmarks.length === 0 ? (
            <p>There are no tasks; enjoy. ;)</p>
          ) : (
            data.bookmarks.map(bookmark => (
              <BookmarkItem key={bookmark.id} bookmark={bookmark} />
            ))
          )}
        </Box>
      </>
      {/* )} */}
    </Container>
  );
};

export default BookmarksDashboard;
