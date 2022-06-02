const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    "id": Number,
    "name": String,
    "owner": String,
    "url": String,
    "forks": Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArr, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  for (let i = 0; i < repoArr.length; i++) {
    // create a variable called repoID
    // search DB for the repoID

    const repo = new Repo ({
      id: repoArr[i].id,
      name: repoArr[i].name,
      owner: repoArr[i].owner.login,
      url: repoArr[i].html_url,
      forks: repoArr[i].forks_count,
    });

    repo.save((err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    });
  }
}

module.exports.save = save;