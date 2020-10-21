import React, { useState, useEffect } from "react";
import exifr from "exifr";

import Layout from "./Components/Layout";
import AddForm from "./Components/Form";
import UpdateForm from "./Components/Form/UpdateForm";
import Gridlist from "./Components/GridList";
import Modal from "@material-ui/core/Modal";

import styles from "./Components/GridList/styles.module.css";
import { db } from "./indexedDB/db";

const App = () => {
  const [collection, setCollection] = useState([]);
  const [idImageInForm, setIdImageInForm] = useState(null);
  const [metInfo, setMetInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [store, setStore] = useState(null);

  const addImages = async (fileInfo) => {
    try {
      const getDb = await db.images.toArray();
      setCollection(getDb);
      setMetInfo(fileInfo);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    async function getAllImages() {
      try {
        const getDb = await db.images.toArray();
        setCollection(getDb);
        navigator.storage.estimate().then((estimate) => {
          const remaining = estimate.quota - estimate.usage;
          const quota = estimate.usage;
          setStore({ remaining, quota });
        });
      } catch (e) {
        console.error(e);
      }
    }
    getAllImages();
  }, []);

  const removeImage = async (id) => {
    try {
      await db.images.delete(id);
      let allImages = await db.images.toArray();
      setCollection(allImages);
    } catch (e) {
      console.error(e);
    }
  };

  const updateImage = async (text, file, fileInfo) => {
    try {
      const { id } = idImageInForm;
      await db.images.update(id, { tags: text, file, fileInfo });
      let allImages = await db.images.toArray();
      setCollection(allImages);
      setMetInfo(fileInfo);
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const getIdImage = (id) => {
    setOpen(true);
    setIdImageInForm({ id });
  };

  const getInfoByImg = async (file, ImgId) => {
    try {
      const fileInfo = await exifr.parse(file);
      const findImgInCollection = collection.find(({ id }) => ImgId === id);
      const { type, size, name } = findImgInCollection.fileInfo;
      const fullInfo = { type, size, name, ...fileInfo };
      setMetInfo(fullInfo);
      setIdImageInForm(ImgId);
    } catch (e) {
      console.error(e);
    }
  };

  const goBack = () => {
    setIdImageInForm(null);
  };

  return (
    <Layout>
      <AddForm onAddImages={addImages} />
      {store && (
        <p
          style={{ textAlign: "center" }}
        >{`You have ${store.remaining} B in IndexeDB and used ${store.quota} B`}</p>
      )}
      <ul className={styles.gallery}>
        {collection.length > 0 &&
          collection.map((item) => (
            <Gridlist
              key={item.id}
              collection={item}
              metInfo={metInfo}
              getIdImageInForm={idImageInForm}
              onGoBack={goBack}
              onRemoveImage={removeImage}
              onGetIdImage={getIdImage}
              onGetInfoByImg={getInfoByImg}
            />
          ))}
      </ul>
      <Modal open={open}>
        <div>
          <UpdateForm onUpdateImage={updateImage} />
        </div>
      </Modal>
    </Layout>
  );
};

export default App;
