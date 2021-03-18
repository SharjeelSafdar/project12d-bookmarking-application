import {
  gql,
  useQuery,
  QueryHookOptions,
  useMutation,
  MutationHookOptions,
} from "@apollo/client";
import { Bookmark } from "../types";

// **************************************
// Get All Bookmarks Query
// **************************************
export const GET_ALL_BOOKMARKS = gql`
  query GetAllBookmarks {
    bookmarks {
      id
      title
      url
    }
  }
`;

export type GetAllBookmarksQueryResponse = {
  bookmarks: Bookmark[];
};

export type GetAllBookmarksQueryVariables = { [key: string]: never };

export const useGetAllBookmarksQuery = (
  baseOptions?: QueryHookOptions<
    GetAllBookmarksQueryResponse,
    GetAllBookmarksQueryVariables
  >
) => {
  return useQuery<GetAllBookmarksQueryResponse, GetAllBookmarksQueryVariables>(
    GET_ALL_BOOKMARKS,
    baseOptions
  );
};

// **************************************
// Create New Bookmark Mutation
// **************************************
export const CREATE_NEW_BOOKMARK = gql`
  mutation CreateNewBookmark($title: String!, $url: String!) {
    createBookmark(title: $title, url: $url) {
      id
      title
      url
    }
  }
`;

export type CreateNewBookmarkMutationResponse = {
  createBookmark: Bookmark;
};

export type CreateNewBookmarkMutationVariables = {
  title: string;
  url: string;
};

export const useCreateBookmarkMutation = (
  baseOptions?: MutationHookOptions<
    CreateNewBookmarkMutationResponse,
    CreateNewBookmarkMutationVariables
  >
) => {
  return useMutation<
    CreateNewBookmarkMutationResponse,
    CreateNewBookmarkMutationVariables
  >(CREATE_NEW_BOOKMARK, {
    update: (cache, { data }) => {
      if (data) {
        const existingBookmarks = cache.readQuery<GetAllBookmarksQueryResponse>(
          { query: GET_ALL_BOOKMARKS }
        ) || { bookmarks: [] };

        cache.writeQuery({
          data: {
            bookmarks: [...existingBookmarks.bookmarks, data.createBookmark],
          },
          query: GET_ALL_BOOKMARKS,
        });
      }
    },
    ...baseOptions,
  });
};

// **************************************
// Update Bookmark Mutation
// **************************************
export const UPDATE_BOOKMARK = gql`
  mutation UpdateBookmark($id: ID!, $title: String!, $url: String!) {
    editBookmark(id: $id, title: $title, url: $url) {
      id
      title
      url
    }
  }
`;

export type UpdateBookmarkMutationResponse = {
  editBookmark: Bookmark;
};

export type UpdateBookmarkMutationVariables = {
  id: string;
  title: string;
  url: string;
};

export const useUpdateBookmarkMutation = (
  baseOptions?: MutationHookOptions<
    UpdateBookmarkMutationResponse,
    UpdateBookmarkMutationVariables
  >
) => {
  return useMutation<
    UpdateBookmarkMutationResponse,
    UpdateBookmarkMutationVariables
  >(UPDATE_BOOKMARK, baseOptions);
};

// **************************************
// Delete Bookmark Mutation
// **************************************
export const DELETE_BOOKMARK = gql`
  mutation DeleteBookmark($id: ID!) {
    deleteBookmark(id: $id)
  }
`;

export type DeleteBookmarkMutationResponse = {
  deleteBookmark: string;
};

export type DeleteBookmarkMutationVariables = {
  id: string;
};

export const useDeleteBookmarkMutation = (
  baseOptions?: MutationHookOptions<
    DeleteBookmarkMutationResponse,
    DeleteBookmarkMutationVariables
  >
) => {
  return useMutation<
    DeleteBookmarkMutationResponse,
    DeleteBookmarkMutationVariables
  >(DELETE_BOOKMARK, {
    update: (cache, { data }) => {
      if (data) {
        const existingBookmarks = cache.readQuery<GetAllBookmarksQueryResponse>(
          { query: GET_ALL_BOOKMARKS }
        ) || { bookmarks: [] };

        const remainingBookmarks = existingBookmarks.bookmarks.filter(
          bookmark => bookmark.id !== data.deleteBookmark
        );

        cache.writeQuery({
          data: {
            bookmarks: [...remainingBookmarks],
          },
          query: GET_ALL_BOOKMARKS,
        });
      }
    },
    ...baseOptions,
  });
};

// **************************************
// Toggle Todo Status Mutation
// **************************************
export const BATCH_DELETE_BOOKMARKS = gql`
  mutation BatchDeleteBookmarks($ids: [ID]!) {
    batchDeleteBookmarks(ids: $ids)
  }
`;

export type BatchDeleteBookmarksMutationResponse = {
  batchDeleteBookmarks: string[];
};

export type BatchDeleteBookmarksMutationVariables = {
  ids: string[];
};

export const useBatchDeleteBookmarksMutation = (
  baseOptions?: MutationHookOptions<
    BatchDeleteBookmarksMutationResponse,
    BatchDeleteBookmarksMutationVariables
  >
) => {
  return useMutation<
    BatchDeleteBookmarksMutationResponse,
    BatchDeleteBookmarksMutationVariables
  >(BATCH_DELETE_BOOKMARKS, {
    update: (cache, { data }) => {
      if (data) {
        const existingBookmarks = cache.readQuery<GetAllBookmarksQueryResponse>(
          { query: GET_ALL_BOOKMARKS }
        ) || { bookmarks: [] };

        const remainingBookmarks = existingBookmarks.bookmarks.filter(
          bookmark => !data.batchDeleteBookmarks.includes(bookmark.id)
        );

        cache.writeQuery({
          data: {
            bookmarks: [...remainingBookmarks],
          },
          query: GET_ALL_BOOKMARKS,
        });
      }
    },
    ...baseOptions,
  });
};
