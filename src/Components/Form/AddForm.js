import React, { useState } from "react";
import { db } from "../../indexedDB/db";

import styles from "./form.module.css";

const AddForm = ({ onAddImages }) => {
  const [text, setText] = useState("");
  const [postFile, setPostFile] = useState("");
  const [fileInfo, setFileInfo] = useState({});

  const handleChange = ({ target }) => setText(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text !== "" && postFile !== "") {
      db.images.add({ tags: text, file: postFile, fileInfo });
    }
    onAddImages(fileInfo);
    setText("");
  };

  const getFileImage = ({ target: { files } }) => {
    setFileInfo(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => setPostFile(reader.result);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.formLabel}>
        Tags
        <input
          className={styles.formInput}
          value={text}
          onChange={handleChange}
          name="name"
        />
      </label>
      <label className={styles.formLabel}>
        Choose file
        <input
          className={styles.formInput}
          type="file"
          onChange={getFileImage}
          name="file"
        />
      </label>
      <button className={styles.formButton} type="submit">
        Add image
      </button>
    </form>
  );
};

export default AddForm;
