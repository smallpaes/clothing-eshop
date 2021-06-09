import React from 'react';

import CartIconContainer from '../cart-icon/cart-icon.container';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';

// ReactComponent tells create react app that we want a 
// react component rendering an SVG rather than its filename
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink } from './header.styles';

const Header = ({ currentUser, hidden, signOutStart }) => (
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
          <OptionLink as='div' onClick={signOutStart} >SIGN OUT</OptionLink>
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

export default Header;