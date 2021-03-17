import { makeStyles, createStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      padding: 0,
      "& button": {
        marginRight: theme.spacing(1),
      },
    },
  })
);
