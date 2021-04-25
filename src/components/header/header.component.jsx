import React from 'react';
import { Link } from 'react-router-dom';

// connect is a HOC letting us modify the component to have access to Redux
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase.utils';

// ReactComponent tells create react app that we want a 
// react component rendering an SVG rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser }) => (
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
      {
        currentUser ? 
          <div className='option' onClick={() => auth.signOut()} >SIGN OUT</div>
          :
          <Link className='option' to='/signin'>SIGN IN</Link>
      }
    </div>
  </div>
)

// function allowing us to access the state(root reducer)
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);