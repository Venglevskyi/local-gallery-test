import React, { useState } from "react";

import styles from "./form.module.css";

const UpdateForm = ({ onUpdateImage }) => {
  const [text, setText] = useState("");
  const [postFile, setPostFile] = useState("");
  const [fileInfo, setFileInfo] = useState({});

  const handleChange = ({ target }) => setText(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateImage(text, postFile, fileInfo);
  };

  const getFileImage = ({ target: { files } }) => {
    setFileInfo(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => setPostFile(reader.result);
  };

  return (
    <form
      className={styles.form}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      onSubmit={handleSubmit}
    >
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
        Update image
      </button>
    </form>
  );
};

export default UpdateForm;
