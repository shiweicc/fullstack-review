const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
    // "_id": mongoose.Schema.Types.ObjectId,
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
  // let temp = [];

  for (let i = 0; i < repoArr.length; i++) {
    let repos = new Repo ({
      id: repoArr[i].id,
      name: repoArr[i].name,
      owner: repoArr[i].owner.login,
      url: repoArr[i].html_url,
      forks: repoArr[i].forks_count,
    });
    // temp.push(repos);
    repos.save((err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    });
  }

  // Repo.insertMany(temp, (err, result) => {
  //   if (err) {
  //     cb(err);
  //   } else {
  //     cb(result);
  //   }
  // });
}

let top25repo = async () => {
  const result = await Repo.find({}).sort({'forks': -1}).limit(25);
  return result;
}

module.exports.save = save;
module.exports.top25repo = top25repo;