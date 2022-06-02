const express = require('express');
const bodyParser = require('body-parser');
const save = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  let body = req.body;
  let username = Object.keys(body)[0];

  if (username !== '') {
    return getReposByUsername.getReposByUsername(username)
    .then((data) => {
      console.log('succes get repos by username!');
      // console.log('here', data.data);

      let repo = data.data;
      save.save(repo)
      .then((result) => {
        res.send('Repos saved to database');
      })
      .catch(result => {
        res.status(400).send('Unable to save to database');
      })
    })
    .catch((err) => {
      console.log('fail get repos by username!');
      throw err;
    })
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send('Hello world');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

