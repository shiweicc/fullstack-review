const express = require('express');
const getReposByUsername = require('../helpers/github.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database


  // let username = req.body;
  // if (username !== '') {
  //   getReposByUsername(username)
  //   .then((data) => {
  //     console.log('succes get repos by username!');
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     console.log('fail get repos by username!');
  //     throw err;
  //   })
  // }
  res.send('success!!!');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

