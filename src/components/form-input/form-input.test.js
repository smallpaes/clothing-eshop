import { shallow } from 'enzyme';

import FormInput from './form-input.component';

describe('FormInput component', () => {
  let wrapper;
  let mockHandleChange;
  const mockLabel = 'dummy label';

  beforeEach(() => {
    mockHandleChange = jest.fn();
    const mockProps = {
      handleChange: mockHandleChange,
      label: mockLabel,
      value:'test'
    };

    wrapper = shallow(<FormInput { ...mockProps }/>);
  });

  it('Should render FormInput component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should trigger handleChange once upon FormInputContainer onChange', () => {
    wrapper.find('FormInputContainer').simulate('change');
    expect(mockHandleChange.mock.calls.length).toBe(1);
  });

  it('Should render FormInputLabel when label prop is passed in', () => {
    expect(wrapper.exists('FormInputLabel')).toBe(true);
  });

  it('Should not render FormInputLabel when label prop in not passed in', () => {
    const newWrapper = shallow(<FormInput handleChange={mockHandleChange} />);
    expect(newWrapper.exists('FormInputLabel')).toBe(false);
  });

  it('Should has shrink as a class when value prop is string', () => {
    expect(wrapper.find('FormInputLabel').prop('className')).toBe('shrink');
  });

  it('Should has empty class value when value is number', () => {
    const mockNewProps = {
      handleChange: mockHandleChange, 
      label: mockLabel,
      value: 1
    }
    const newWrapper = shallow(<FormInput { ...mockNewProps } />);
    expect(newWrapper.find('FormInputLabel').prop('className')).toBe('');
  });
})