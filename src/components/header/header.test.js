import { shallow } from 'enzyme';

import Header from './header.component';
import CartDropdownContainer from '../cart-dropdown/cart-dropdown.container';

describe('Header component', () => {
  let wrapper;
  let mockSignOutStart;

  beforeEach(() => {
    mockSignOutStart = jest.fn();
    const mockPros = {
      currentUser: {
        uid: 123
      },
      hidden: true,
      signOutStart: mockSignOutStart
    };

    wrapper = shallow(<Header { ...mockPros } />);
  });

  it('Should render Header component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('currentUser is present', () => {
    it('Should render sign out button', () => {
      expect(
        wrapper
          .find('OptionLink')
          .at(2)
          .text()
      ).toBe('SIGN OUT');
    });

    it('Should signOutStart got triggered when sign out link is clicked', () => {
      wrapper
        .find('OptionLink')
        .at(2)
        .simulate('click');

      expect(mockSignOutStart.mock.calls.length).toBe(1);
    });
  });

  it('Should hide CartDropdownContainer component when hidden prop is true', () => {
    expect(wrapper.exists(CartDropdownContainer)).toBe(false);
  });

  describe('currentUser is null', () => {
    const mockNewPros = {
      currentUser: null,
      hidden: false,
      signOutStart: mockSignOutStart
    };

    const newWrapper = shallow(<Header { ...mockNewPros } />);

    it('Should render signin button', () => {
      expect(newWrapper.exists('[to="/signin"]')).toBe(true);
    });

    it('Should render CartDropdownContainer component when hidden prop is false', () => {
      expect(newWrapper.exists(CartDropdownContainer)).toBe(true);
    });
  });
});