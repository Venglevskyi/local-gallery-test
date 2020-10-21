import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    position: "relative",
    width: 320,
    backgroundColor: "#fff",
  },
  icon: {
    position: "absolute",
    right: 0,
    zIndex: 2,
  },
  media: {
    height: 250,
  },
});

export { useStyles };
