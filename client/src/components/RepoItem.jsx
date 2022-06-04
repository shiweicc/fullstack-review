import React from 'react';

const RepoItem = (props) => (

  <div>{props.repos.map(item => {
     return <li>{item.name}</li>
  })}</div>

)

export default RepoItem;