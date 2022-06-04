import React from 'react';

const RepoItem = (props) => (

  <div>{props.repos.map(item => {
     return <li onClick={(e) => props.onClick(e)}>{item.name}</li>
  })}</div>

)

export default RepoItem;