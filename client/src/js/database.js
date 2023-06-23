import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb implemented');
  // Create a connection with the database (e.g jate) and the version the database that we want to use( e.g 1).
  const connectionWithDB = await openDB('jate', 1);

  // Create a new transaction and specify the name of the database(e.g jate) and data privilege type( e.g read and write).
  const text = connectionWithDB.transaction('jate', 'readwrite');

  // now save the text file into the jate database.
  const store = text.objectStore('jate');

  // now replace the previous content with the new text value and save into the jate database .
  const saveIntoDb = store.put({ id: 1, value: content });

  // Wait till we get confirmation of the saveIntoDb request.
  const result = await saveIntoDb;
  // And then print out the confirmation in the console.
  console.log('🚀 - data saved to the database', result);

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('getDb implemented');

  // Create a connection with the database (e.g jate) and the version the database that we want to use( e.g 1).
  const connectionWithDB = await openDB('jate', 1);

  // Create a new transaction and specify the name of the database(e.g jate) and data privilege type( e.g read) since this is get method.
  const text = connectionWithDB.transaction('jate', 'readonly');

  // now save the text file into the jate database.
  const store = text.objectStore('jate');

  // getAll() method will help us to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;

  // And then print out the confirmation result in the console.

  console.log('result.value', result);

  // return the result 
  return result?.value;

};

initdb();
