import React from 'react';
import { shallow } from 'enzyme';

import CollectionItem from './collection-item.component';


describe('CollectionItem component', () => {
  let wrapper;
  let mockAddItem;
  let mockItem;

  beforeEach(() => {
    mockItem = {
      name: 'Shoe', 
      price: 320, 
      imageUrl: 'www.test.com'
    };
    mockAddItem = jest.fn();
    wrapper = shallow(<CollectionItem item={mockItem} addItem={mockAddItem} />);
  });

  it('Should render CollectionItem component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('addItem is triggered when AddButton is clicked', () => {
    const addButton = wrapper.find('AddButton');
    addButton.simulate('click');
    expect(mockAddItem.mock.calls.length).toBe(1);
  });

  it('should render imageUrl as a prop on BackgroundImage', () => {
    expect(wrapper.find('BackgroundImage').prop('imageUrl')).toEqual(mockItem.imageUrl);
  });
});
