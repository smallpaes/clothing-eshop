import { shallow } from 'enzyme';
import CartIcon from './cart-icon.component';

describe('CartIcon Component', () => {
  let wrapper;
  let mockToggleCartHidden;
  beforeEach(() => {
    mockToggleCartHidden = jest.fn();
    const mockProps = {
      itemCount: 0,
      toggleCartHidden: mockToggleCartHidden
    };
    wrapper = shallow(<CartIcon {...mockProps} />);
  });


  it('Should render CartIcon component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render itemCount correctly', () => {
    const renderedText = wrapper.find('ItemCountContainer').text();
    expect(renderedText).toBe('0');
  });

  it('Should call toggleCartHidden when icon is clicked', () => {
    const cartIconNode = wrapper.find('CartIconContainer');
    cartIconNode.simulate('click');
    expect(mockToggleCartHidden.mock.calls.length).toBe(1);
  });
});