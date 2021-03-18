import React, { FC } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Typography,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  useCreateBookmarkMutation,
  useUpdateBookmarkMutation,
} from "../../api";
import CustomTextField from "../customTextField";
import { useStyles } from "./styles";
import { Bookmark } from "../../types";

export interface BookmarkModalProps {
  modalType: "New" | "Edit";
  modalStatus: boolean;
  closeModal: () => void;
  oldBookmark?: Bookmark;
}

type FormValueTypes = {
  title: string;
  url: string;
};

const BookmarkModal: FC<BookmarkModalProps> = ({
  modalType,
  modalStatus,
  closeModal,
  oldBookmark,
}) => {
  const classes = useStyles();
  const [createBookmark] = useCreateBookmarkMutation();
  const [updateBookmark] = useUpdateBookmarkMutation();

  const initialValues: FormValueTypes = {
    title: oldBookmark ? oldBookmark.title : "",
    url: oldBookmark ? oldBookmark.url : "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    url: Yup.string().url("Must be a valid URL").required("Required"),
  });

  const onSubmit = async (values: FormValueTypes) => {
    const { title, url } = values;
    try {
      if (modalType === "New") {
        const res = await createBookmark({
          variables: { title, url },
        });
        console.log("New bookmark added: ", res);
      } else if (!!oldBookmark) {
        const res = await updateBookmark({
          variables: { id: oldBookmark.id, title, url },
        });
        console.log("Bookmark updated: ", res);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
    closeModal();
  };

  return (
    <Modal open={modalStatus} onClose={closeModal}>
      <Paper elevation={3} className={classes.modal}>
        <Typography variant="h5" component="h2">
          {`${modalType} Bookmark`}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid, isSubmitting }) => (
            <Form>
              <Box marginTop={3} marginBottom={2}>
                <CustomTextField
                  name="title"
                  label="Title"
                  disabled={isSubmitting}
                  fullWidth
                  autoFocus
                />
              </Box>
              <Box marginBottom={2}>
                <CustomTextField
                  name="url"
                  label="URL"
                  disabled={isSubmitting}
                  fullWidth
                />
              </Box>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : undefined
                }
                variant="contained"
                color="primary"
                fullWidth
              >
                {modalType === "New"
                  ? isSubmitting
                    ? "Creating Bookmark"
                    : "Create Bookmark"
                  : isSubmitting
                  ? "Updating Bookmark"
                  : "Update Bookmark"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Modal>
  );
};

export default BookmarkModal;
