import React from 'react';
import { Link } from 'react-router-dom';

// ReactComponent tells create react app that we want a 
// react component rendering an SVG rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = () => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/contact'>
        CONTACT
      </Link>
    </div>
  </div>
)

export default Header;