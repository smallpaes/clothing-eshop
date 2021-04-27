import { createSelector } from 'reselect';

// input selector: doesn't use createSelector
// function taking in whole state and return a slice of it
const selectCart = state => state.cart;

// output selector: using both input selector and createSelector
// becomes a memoized selector
export const selectCartItems = createSelector(
  // a collection of input selectors
  [selectCart],
  // a function returning the value we want out of this selector
  // parameters received are outputs of each input selector in the above array
  cart => cart.cartItems
);

export const selectCartItemCounts = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
);