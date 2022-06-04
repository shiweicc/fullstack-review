const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js');

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
      console.log('success get repos by username!');

      let repos = data.data;

      db.save(repos, (err, result) => {
        if (err) {
          console.log('fial to create data in DB!', err);
          res.send();
        } else {
          console.log('success to create data in DB!');
          res.send();
        }
      });
    })
    .catch((err) => {
      console.log('fail to get repos by username!');
      throw err;
    })
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.top25repo()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log('fail to get top 25 repos!');
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

