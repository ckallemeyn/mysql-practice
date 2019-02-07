const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = 3005;
const db = require('../db/index.js'); // mysql
const router = express.Router();
const getDogs = require('../helpers/dogApi.js');


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
router.get('/', async (req, res) => {
  let breedPhotos = await getDogs();
  let json = {}
  if (!breedPhotos.data) {
    console.error('unable to find dog photos');
  } else {
    console.log('found breed photo',breedPhotos.data.message[0])
    res.send('hello dogs');
  }
  // getDogs()
  // .then((response) => {
  //   console.log(response.data.message[0]);
  // }).catch((err)=> {
  //   console.log('could not resolve api call', err);
  // })
});

router.get('/:name', (req, res) => {
  console.log('found the name', req.params.name);
  res.send('found the name');
});



