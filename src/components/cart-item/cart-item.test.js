import React from 'react';
import { shallow } from 'enzyme';
import CartItem from './cart-item.component';

it('Should render CartItem component', () => {
  const mockProps = { 
    imageUrl: 'www.test.com', 
    price: 10, 
    name: 'hats', 
    quantity: 2 
  };
  const wrapper = shallow(<CartItem item={mockProps} />);
  expect(wrapper).toMatchSnapshot();
});