import React from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "#f5f5f5",
    padding: 20,
    maxWidth: "100vw",
    height: "100%",
  },
});

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
