import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Popular from '../popular';

describe('Test <Popular />', () => {

  it('shows required props warning when no props passed', () => {
    console.error = jest.fn();
    expect(() => {
      shallow(<Popular />);
    }).toThrow();

    expect(console.error).toHaveBeenCalledTimes(2);
    const isLoadingWarning = console.error.mock.calls[0];
    const popularWarning = console.error.mock.calls[1];
    expect(isLoadingWarning[0]).toMatch("The prop `isLoading` is marked as required in `Popular`,");
    expect(popularWarning[0]).toMatch("The prop `popular` is marked as required in `Popular`,");
    console.error.mockClear();
  });

});

describe('Test <Popular /> when isLoading is true', () => {

  let wrap;
  const props = {
    isLoading: true,
    popular: [],
  }

  beforeAll(() => {
    wrap = shallow(<Popular {...props}/>);
  });

  it('renders correctly and matches snapshot', () => {
    expect(toJson(wrap)).toMatchSnapshot();
  })

  it('renders a section with popular margin-top-xs margin-bottom classes', () => {
    const section = wrap.find('section');
    expect(section.hasClass('popular margin-top-xs margin-bottom')).toEqual(true);
  });

  it('renders 6 placeholders', () => {
    const placeholders = wrap.find('div');
    expect(placeholders).toHaveLength(6);
    placeholders.forEach((node) => {
      expect(node.hasClass('placeholder')).toEqual(true);
    });
  });
});
