import React from 'react';
import RepoItem from './RepoItem.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are top {props.repos.length} most forked GitHub repos.
    <ul>
       <RepoItem repos={props.repos} onClick={props.onClick}/>
    </ul>
  </div>
)

export default RepoList;