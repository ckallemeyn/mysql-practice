const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3005;
const db = require('../db/index.js'); // mysql
const router = express.Router();
const getDogs = require('../helpers/dogApi.js');
const insertBreeds = require('./utils/utils.js');

app.use(express.static('./public/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));// shows http request in color coded format
app.use('/fetch',router)// need to use router in order to make requests

app.listen(port, ()=> console.log(`listening on port number ${port}`));

db.connect((err) => {
  if (err) {
    console.log('found err in connection', err)
  }
  console.log('connected to dogs db');
});


// define routes here for dog API
router.get('/', (req, res) => {
  let { name } = req.query;
  // need to get name breed and img from both tables where the name matches the user input name and owner_id matches owner.id
  let qs = `SELECT name, breed, img FROM owners INNER JOIN breeds ON owners.id = breeds.owner_id WHERE owners.name = ?`
  db.query(qs, [name], (err, results, fields) => {
    if (err) {
      console.error('Could not retrieve info from DB', err);
    }
    res.status(200).send(results);
  });
});

router.get('/:name', (req, res) => {
  console.log('found the name', req.params.name);
  res.send('found the name');
});

router.post('/', async (req, res) => {
  let { owner, breed } = req.body;
  console.log('found the breed', breed);
  let queryStr = `INSERT INTO owners(name) VALUES (?)`;
  let breedQuery = 'INSERT INTO breeds(owner_id, breed, img) VALUES \
                  ((SELECT id FROM owners WHERE name = ? LIMIT 1),?,?)';
  let breedPhotos = await getDogs(breed);

  if (breedPhotos) {
    let img = breedPhotos.data.message;
    console.log('found the img', img);

    db.query(queryStr, [owner], (error, results, fields) => {
      if (error) {
        console.error('could not insert into the db', error);
      }
      if (results !== undefined) {
        console.log('results of owner query', results);
      }
    });

    db.query(breedQuery, [owner, breed, img], (error, results, fields) => {
      if (error) {
        console.error('could not insert BREED', error);
      }
      console.log('found the results for breeds', results);
      res.status(201).send('recieved user input').end();
    });
  }

});


