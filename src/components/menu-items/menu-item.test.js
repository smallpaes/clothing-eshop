import { shallow } from 'enzyme';

import MenuItem from './menu-item.component';

describe('MenuItem component', () => {
  let wrapper;
  let mockHistory;
  let mockMatch;
  const linkUrl = '/hats'
  const size = 'large'
  const imageUrl = 'www.test.com'

  beforeEach(() => {
    mockHistory = {
      push: jest.fn()
    }

    mockMatch = {
      url: '/shop'
    };

    const mockProps = {
      title: 'title', 
      imageUrl: imageUrl, 
      size: size, 
      history: mockHistory, 
      linkUrl: linkUrl, 
      match: mockMatch
    };

    wrapper = shallow(<MenuItem.WrappedComponent { ...mockProps } />);
  });


  it('Should render MenuItem component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should pass size to MenuItemContainer as the prop size', () => {
    expect(wrapper.find('MenuItemContainer').prop('size')).toBe(size);
  });
  
  it('Should pass imageUrl to BackgroundImageContainer as the prop imageUrl', () => {
    expect(wrapper.find('BackgroundImageContainer').prop('imageUrl')).toBe(imageUrl)
  });

  it('Can trigger router change function when MenuItemContainer is clicked', () => {
    wrapper.find('MenuItemContainer').simulate('click');
    expect(mockHistory.push.mock.calls.length).toBe(1);
  });

  it('Trigger router function with correct argument', () => {
    wrapper.find('MenuItemContainer').simulate('click');
    expect(mockHistory.push.mock.calls[0][0]).toBe(`${mockMatch.url}${linkUrl}`);
  })
});