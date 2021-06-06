import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Checkout from './checkout.component';

import {
  selectCartItems,
  selectCartToTotal
} from '../../redux/cart/cart.selectors';

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartToTotal
});

const CheckoutContainer = connect(mapStateToProps)(Checkout);

export default CheckoutContainer;