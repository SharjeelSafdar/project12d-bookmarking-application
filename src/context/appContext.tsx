import React, { createContext, FC, useContext, useState } from "react";

export interface ContextType {
  isSelectionMode: boolean;
  startSelectionMode: () => void;
  finishSelectionMode: () => void;
  selectedBookmarks: string[];
  toggleBookmarkSelection: (bookmarkId: string) => void;
}

const initialState: ContextType = {
  isSelectionMode: false,
  startSelectionMode: () => {},
  finishSelectionMode: () => {},
  selectedBookmarks: [],
  toggleBookmarkSelection: () => {},
};

export const AppContext = createContext<ContextType>(initialState);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC = ({ children }) => {
  const [isSelectionMode, setSelectionMode] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState<string[]>([]);

  const startSelectionMode = () => {
    setSelectionMode(true);
    setSelectedBookmarks([]);
  };

  const finishSelectionMode = () => {
    setSelectionMode(false);
    setSelectedBookmarks([]);
  };

  const selectBookmark = (bookmarkId: string) => {
    setSelectedBookmarks(prev => [...prev, bookmarkId]);
  };

  const unselectBookmark = (bookmarkId: string) => {
    if (selectedBookmarks.includes(bookmarkId)) {
      setSelectedBookmarks(prev => prev.filter(id => id !== bookmarkId));
    }
  };

  const toggleBookmarkSelection = (bookmarkId: string) => {
    if (!selectedBookmarks.includes(bookmarkId)) {
      selectBookmark(bookmarkId);
    } else {
      unselectBookmark(bookmarkId);
    }
  };

  const value: ContextType = {
    isSelectionMode,
    startSelectionMode,
    finishSelectionMode,
    selectedBookmarks,
    toggleBookmarkSelection,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
