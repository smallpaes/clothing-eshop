import { shallow } from 'enzyme';

import Directory from './directory.component';

describe('Directory component', () => {
  const mockSections = [
    {
      id: 1,
      title: 'title', 
      imageUrl: 'www.test.com', 
      size: 'large'
    },
    {
      id: 2,
      title: 'title', 
      imageUrl: 'www.test.com', 
      size: 'large'
    },
    {
      id: 3,
      title: 'title', 
      imageUrl: 'www.test.com', 
      size: 'large'
    },
    {
      id: 4,
      title: 'title', 
      imageUrl: 'www.test.com', 
      size: 'large'
    }
  ]

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Directory sections={mockSections} />)
  });

  it('Should render PreviewContainer component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render the correct amount of component inside DirectoryContainer', () => {
    expect(wrapper.find('DirectoryContainer').children()).toHaveLength(mockSections.length);
  });
});