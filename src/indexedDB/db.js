import Dexie from "dexie";

const db = new Dexie("Local Gallery");
db.version(1).stores({
  images: "++id, tags, file, fileInfo",
});
db.open()
  .then(() => {
    console.log(`Connection with the database: ${db.name}`);
  })
  .catch((error) => alert(error.stack || error));

export { db };
