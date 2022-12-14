import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    this.displayRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO

    $.ajax({
      type: "POST",
      url: 'repos',
      data: term,
      success: (result) => {
        console.log('Ajax POST request success.');
        alert('succes create data in DB!');
        this.displayRepos();
      },
      error: (error) => {
        console.log('Ajax POST request failed.');
        alert('Error: Please submit a valid github username!');
        throw error;
      }
    })
  }

  displayRepos () {
    return axios.get('http://localhost:1128/repos')
      .then(res => {
        console.log('hey here is the top 25 repos!!!');
        this.setState({ repos: res.data });
      })
      .catch(err => {
        console.log('fail to display top 25 repos!');
      })
  }

  handleClick = (e) => {
    let clickedName = e.target.innerText;
    let repoObj = this.state.repos.find(item => item.name === clickedName);
    let url = repoObj.url;
    window.open(url);
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} displayRepos={this.displayRepos.bind(this)} onClick={this.handleClick.bind(this)}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));