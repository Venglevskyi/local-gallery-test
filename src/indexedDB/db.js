// if (indexedDB) {
//   window.alert("IndexedDB is ready for some action!");
// } else {
//   window.alert(
//     "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
//   );
// }

// let db;
// let openRequest = indexedDB.open("Gallery");

// openRequest.onupgradeneeded = function () {
//   db = openRequest.result;
//   if (!db.objectStoreNames.contains("pictures")) {
//     db.createObjectStore("pictures");
//   }
// };

// openRequest.onerror = function () {
//   console.error("Error", openRequest.error);
// };

// openRequest.onsuccess = function () {
//   db = openRequest.result;
//   let transaction = db.transaction(["pictures"], "readwrite");
//   let pictures = transaction.objectStore("pictures");

//   let request = pictures.add(
//     { name: "Nathan", email: "nathan@mail.com" },
//     "picture1"
//   );

//   request.onsuccess = function () {
//     console.log("Галерея добавлена в хранилище", request.result);
//   };

//   request.onerror = function () {
//     console.log("Ошибка", request.error);
//   };
// };

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
