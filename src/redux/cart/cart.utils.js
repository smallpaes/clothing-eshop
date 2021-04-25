export const addItemToCard = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

  if (!existingCartItem) return [
    ...cartItems,
    { ...cartItemToAdd, quantity: 1 }
  ];

  return cartItems.map(cartItem => {
    if (cartItem.id !== cartItemToAdd.id) return cartItem
    return { ...cartItem, quantity: cartItem.quantity + 1 }
  });
};