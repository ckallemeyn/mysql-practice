const db = require('../../db/index.js');

const insertBreeds = async (query, owner, breed, img) => {
  return await db.query(query, [owner, breed, img], async (error, results, fields) => {
    if (error) {
      console.error('could not insert BREED', error);
    }
    console.log('found the results for breeds', results);
    return await results
  });
}
module.exports = insertBreeds;