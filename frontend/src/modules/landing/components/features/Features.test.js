import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Features from '../features';

describe('Test <Features />', () => {

  let wrap;

  beforeAll(() => {
    wrap = shallow(<Features />);
  });

  it('renders without crashing', () => {
    expect(wrap.exists()).toBe(true);
  });

  it('renders with 1 section with class features', () => {
    expect(wrap.find('section.features')).toHaveLength(1);
  });

  it('renders with 1 grid', () => {
    const grids = wrap.find('Grid');
    expect(grids).toHaveLength(1);
  });
});

describe('Test Feature Messages', () => {

  let wrap;

  beforeAll(() => {
    wrap = shallow(<Features />);
  });

  it('renders with 6 feature messages', () => {
    expect(wrap.find('Message')).toHaveLength(6);
  });

  it('renders with 1 feature for track', () => {
    const messages = wrap.find('Message.track');
    expect(messages).toHaveLength(1);

    const message = messages.get(0);
    expect(message).toBeDefined();
    expect(message.props.className).toEqual('track');
    expect(message.props.icon).toEqual('gamepad');
  });

  it('renders with 1 feature for like', () => {
    const messages = wrap.find('Message.like');
    expect(messages).toHaveLength(1);

    const message = messages.get(0);
    expect(message).toBeDefined();
    expect(message.props.className).toEqual('like');
    expect(message.props.icon).toEqual('heart');
  });

  it('renders with 1 feature for reviews', () => {
    const messages = wrap.find('Message.reviews');
    expect(messages).toHaveLength(1);

    const message = messages.get(0)
    expect(message).toBeDefined();
    expect(message.props.className).toEqual('reviews');
    expect(message.props.icon).toEqual('book');
  });

  it('renders with 1 feature for rate', () => {
    const messages = wrap.find('Message.rate');
    expect(messages).toHaveLength(1);

    const message = messages.get(0);
    expect(message).toBeDefined();
    expect(message.props.className).toEqual('rate');
    expect(message.props.icon).toEqual('star');
  });

  it('renders with 1 feature for lists', () => {
    const messages = wrap.find('Message.lists');
    expect(messages).toHaveLength(1);

    const message = messages.get(0);
    expect(message).toBeDefined();
    expect(message.props.className).toEqual('lists');
    expect(message.props.icon).toEqual('list alternate');
  });

  it('renders with 1 feature for journal', () => {
    const messages = wrap.find('Message.journal');
    expect(messages).toHaveLength(1);

    const message = messages.get(0);
    expect(message).toBeDefined();
    expect(message.props.className).toEqual('journal');
    expect(message.props.icon).toEqual('calendar');
  });
});
