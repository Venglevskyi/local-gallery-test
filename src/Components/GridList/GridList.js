import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

import { useStyles } from "./styles";
import styles from "./styles.module.css";

const GridList = ({
  collection: { tags, file, id },
  metInfo,
  getIdImageInForm,
  onRemoveImage,
  onGetIdImage,
  onGetInfoByImg,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} component="li">
      {id === getIdImageInForm && (
        <div className={styles.overlay}>
          <p>Name: {metInfo.name}</p>
          <p>Size: {`${metInfo.size} B`}</p>
          <p>Type: {metInfo.type}</p>
          <p>Orientation: {metInfo.Orientation}</p>
          <p>Height: {`${metInfo.ExifImageHeight} px`}</p>
          <p>Width: {`${metInfo.ExifImageWidth} px`}</p>
          <p>CreateDate: {metInfo.GPSDateStamp}</p>
        </div>
      )}

      <IconButton
        aria-label="settings"
        className={classes.icon}
        onClick={() => onGetInfoByImg(file, id)}
      >
        <MoreVertIcon />
      </IconButton>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          style={{ height: 250, objectFit: "fill" }}
          src={file}
          title={tags}
          component="img"
        />
        <CardContent style={{ padding: "12px 16px 0" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {tags}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button
          onClick={() => onGetIdImage(id)}
          variant="contained"
          color="primary"
          size="small"
          startIcon={<SaveIcon />}
        >
          Update
        </Button>
        <Button
          onClick={() => onRemoveImage(id)}
          variant="contained"
          size="small"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default GridList;
