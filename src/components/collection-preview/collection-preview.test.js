import { shallow } from 'enzyme';

import CollectionPreview from './collection-preview.component';
import CollectionItemContainer from '../collection-item/collection-item.container';

describe('CollectionPreview component', () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  const mockTitle = 'Hats';
  const mockItems = [
    {
      name: 'item1', 
      price: 211, 
      imageUrl: 'www.test.com',
      id: 1
    },
    {
      name: 'item2', 
      price: 211, 
      imageUrl: 'www.test.com',
      id: 2
    },
    {
      name: 'item3', 
      price: 211, 
      imageUrl: 'www.test.com',
      id: 3
    },
    {
      name: 'item4', 
      price: 211, 
      imageUrl: 'www.test.com',
      id: 4
    },
    {
      name: 'item5', 
      price: 211, 
      imageUrl: 'www.test.com',
      id: 5
    },
  ];

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    };

    mockMatch = {
      path: '/shop'
    }

    const mockProps = {
      title: mockTitle, 
      items: mockItems, 
      history: mockHistory, 
      match: mockMatch
    }

    wrapper = shallow(<CollectionPreview.WrappedComponent { ...mockProps } />)
  });

  it('Should render CollectionPreview component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should router navigation got triggered on TitleContainer is clicked', () => {
    wrapper.find('TitleContainer').simulate('click');
    expect(mockHistory.push.mock.calls.length).toBe(1);
  });

  it('Should right correct argument be inputted into router navigation function', () => {
    wrapper.find('TitleContainer').simulate('click');
    expect(mockHistory.push.mock.calls[0][0]).toBe(`${mockMatch.path}/${mockTitle}`);
  });

  it('Should render at most 4 components in PreviewContainer', () => {
    expect(wrapper.find('PreviewContainer').children()).toHaveLength(4);
  });
});