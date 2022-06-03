const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
    "id": { type: Number, unique:true },
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
    const repos = new Repo ({
      id: repoArr[i].id,
      name: repoArr[i].name,
      owner: repoArr[i].owner.login,
      url: repoArr[i].html_url,
      forks: repoArr[i].forks_count,
    }, {collection: 'repos'});

    repos.save((err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    });
  }
}

let top25repo = async () => {
  const result = await Repo.find({}).sort({'forks': -1}).limit(25);
  return result;
}

module.exports.save = save;
module.exports.top25repo = top25repo;