const request = require('request');
const axios = require('axios');

const getDogs = async (breed='dachshund') => {
  try {
    return await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
  } catch(err) {
    console.log('found error in getDogs API call', err);
  };
}
module.exports = getDogs;