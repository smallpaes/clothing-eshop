import React from 'react';

import CartItem from '../cart-item/cart-item.component';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import {
  CartDropdownContainer,
  CartItemsContainer,
  EmptyMessageContainer,
  CartDropdownButton
} from './cart-dropdown.styles';

const Cart = ({ cartItems, history, dispatch }) => (
  <CartDropdownContainer>
    <CartItemsContainer>
      {
        cartItems.length ? 
          cartItems.map(cartItem => (
            <CartItem 
              key={cartItem.id}
              item={cartItem}
            />
          ))
          :
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
      }
    </CartItemsContainer>
    <CartDropdownButton onClick={() => {
      history.push('/checkout');
      dispatch(toggleCartHidden());
    }}>GO TO CHECKOUT</CartDropdownButton>
  </CartDropdownContainer>
);

// connect passes the dispatch into component prop if the second argument is not supplied
export default Cart;