import React from 'react';

// withRouter is a higher order component
// a function taking in a component as an argument & return a modified component
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div  
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="background-image" />
    <div className='content'>
      <h1 className='title'>{title}</h1>
      <span className="className">SHOP NOW</span>
    </div>
  </div>
);

// power up MenuItem to have access to router 
// returned component possesses the same name
export default withRouter(MenuItem);