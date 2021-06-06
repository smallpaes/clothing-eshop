import React from 'react';

// connect is a HOC letting us modify the component to have access to Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIconContainer from '../cart-icon/cart-icon.container';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

// ReactComponent tells create react app that we want a 
// react component rendering an SVG rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/contact'>
        CONTACT
      </OptionLink>
      {
        currentUser ? 
          <OptionLink as='div' onClick={() => auth.signOut()} >SIGN OUT</OptionLink>
          :
          <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIconContainer />
    </OptionsContainer>
    {
      !hidden && <CartDropdownContainer />
    }
  </HeaderContainer>
)

// function allowing us to access the state(root reducer)
// createStructuredSelector auto pass the state into each subsequent selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);