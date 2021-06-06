import { connect } from 'react-redux';

import CheckoutItem from './checkout-item.component';

import {
  clearItemFromCart,
  addItem,
  removeItem
} from '../../redux/cart/cart.actions';

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

const CheckoutItemContainer = connect(null, mapDispatchToProps)(CheckoutItem);

export default CheckoutItemContainer;