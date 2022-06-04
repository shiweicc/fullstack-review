import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <ul>
       <RepoItem repos={props.repos} />
    </ul>
  </div>
)

export default RepoList;