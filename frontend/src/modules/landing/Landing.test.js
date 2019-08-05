import React from 'react';
import axios from 'axios';
import Enzyme, { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Landing } from '../landing';
import { Backdrop, Footer, Register, LogIn } from '../app/components/';
import { getPopular, getBackdrop } from './actions';
import reducer from './reducers'

describe('Test <Landing /> with valid backdrop and popular props', () => {
  let wrap, props;

  beforeEach(()=>{
    props =
      {
        isLoadingPopular: false,
        getBackdrop: jest.fn().mockName('getBackdropMock'),
        getPopular: jest.fn().mockName('getPopularMock'),
        backdrop: {
            gameId: "2155",
            name: "Dark Souls",
            imageId: "sylfmtzktmb4b0ext8nr",
            slug: "dark-souls"
        },
        popular: [
          {
              "id": 26950,
              "cover": {
                  "id": 75103,
                  "image_id": "co1ly7"
              },
              "name": "Marvel's Avengers",
              "popularity": 1969.805380721215,
              "slug": "marvels-avengers"
          },
          {
              "id": 18225,
              "cover": {
                  "id": 74152,
                  "image_id": "co1l7s"
              },
              "name": "The Sinking City",
              "popularity": 1307.732224438319,
              "slug": "the-sinking-city"
          }]
      }
    wrap = shallow(<Landing {...props}/>)
  });

  afterEach(()=>{
    props.getBackdrop.mockRestore()
    props.getPopular.mockRestore()
  });

  it('renders without crashing', () => {
    expect(wrap.length).toEqual(1);
  });

  it('does not call getPopular through componentDidMount', () => {
    expect(props.getPopular.getMockName()).toEqual('getPopularMock')
    expect(props.getPopular).toHaveBeenCalledTimes(0)
  });

  it('does not call getBackdrop through componentDidMount', () => {
    expect(props.getBackdrop.getMockName()).toEqual('getBackdropMock')
    expect(props.getBackdrop).toHaveBeenCalledTimes(0)
  });

  it('renders Container with padding-bottom class and 2 children', () => {
    const container = wrap.find('Container.padding-bottom')
    expect(container).toHaveLength(1)
    expect(container.children()).toHaveLength(2)

    expect(container.childAt(0).type()).toEqual(Backdrop)
    expect(container.childAt(0).props().imageId).toEqual(props.backdrop.imageId)

    expect(container.childAt(1).type()).toEqual('div')
    expect(container.childAt(1).hasClass('landing')).toEqual(true)
  });

  it('renders section "landing header"', () => {
    const container = wrap.find('section.landing-header')
    expect(container).toHaveLength(1)
    expect(container.children()).toHaveLength(2)
    expect(container.childAt(0).type()).toEqual('h1')

    const registerOrLoginContainer = container.childAt(1)
    expect(registerOrLoginContainer.type()).toEqual('p')
    expect(registerOrLoginContainer.find(Register)).toHaveLength(1)

    const loginContainer = registerOrLoginContainer.find(LogIn)
    expect(loginContainer).toHaveLength(1)
    expect(loginContainer.props().loginText).toEqual('sign in')
  });

  it('renders 1 Backdrop component with correct imageId', () => {
    const container = wrap.find('Backdrop')
    expect(container).toHaveLength(1)
    expect(container.props().imageId).toEqual(props.backdrop.imageId)
  });

  it('renders 1 Popular component with passed props', () => {
    const container = wrap.find('Popular')
    expect(container).toHaveLength(1)
    expect(container.props().isLoading).toEqual(props.isLoadingPopular)
    expect(container.props().popular).toEqual(props.popular)
  });

  it('renders 1 Features component', () => {
    expect(wrap.find('Features')).toHaveLength(1)
  });

  it('renders 1 section with Backdrop information and link', () => {
    const container = wrap.find('section.backdrop-name')
    expect(container).toHaveLength(1)

    const linkContainer = container.find('Link')
    const correctPath = `/games/${props.backdrop.slug}`
    expect(linkContainer.props().to.pathname).toEqual(correctPath)
    expect(linkContainer.props().to.state).toEqual(props.backdrop.gameId)
    expect(linkContainer.children()).toHaveLength(1)
    expect(linkContainer.childAt(0).text()).toEqual(props.backdrop.name)
  });

  it('renders 1 Footer as last component', () => {
    expect(wrap.find(Footer)).toHaveLength(1)
    expect(wrap.children().last().type()).toEqual(Footer)
  });
});

describe('Test <Landing /> with empty backdrop and popular props', () => {
  let wrap, props;

  beforeEach(()=>{
    props =
    {
      isLoadingPopular: true,
      getBackdrop: jest.fn().mockName('getBackdropMock'),
      getPopular: jest.fn().mockName('getPopularMock'),
      backdrop: {},
      popular: []
    }
    wrap = shallow(<Landing {...props}/>)
  });

  afterEach(()=>{
    props.getBackdrop.mockRestore()
    props.getPopular.mockRestore()
  });

  it('renders without crashing', () => {
    expect(wrap.length).toEqual(1);
  });

  it('calls getPopular through componentDidMount', () => {
    expect(props.getPopular.getMockName()).toEqual('getPopularMock')
    expect(props.getPopular).toHaveBeenCalledTimes(1)
  });

  it('calls getBackdrop through componentDidMount', () => {
    expect(props.getBackdrop.getMockName()).toEqual('getBackdropMock')
    expect(props.getBackdrop).toHaveBeenCalledTimes(1)
  });

  it('does not render Backdrop component', () => {
    expect(wrap.find('Backdrop')).toHaveLength(0)
  });

  it('renders section "landing header"', () => {
    const container = wrap.find('section.landing-header')
    expect(container).toHaveLength(1)
    expect(container.children()).toHaveLength(2)
    expect(container.childAt(0).type()).toEqual('h1')

    const registerOrLoginContainer = container.childAt(1)
    expect(registerOrLoginContainer.type()).toEqual('p')
    expect(registerOrLoginContainer.find(Register)).toHaveLength(1)

    const loginContainer = registerOrLoginContainer.find(LogIn)
    expect(loginContainer).toHaveLength(1)
    expect(loginContainer.props().loginText).toEqual('sign in')
  });

  it('renders 1 Popular component with passed props', () => {
    const container = wrap.find('Popular')
    expect(container).toHaveLength(1)
    expect(container.props().isLoading).toEqual(props.isLoadingPopular)
    expect(container.props().popular).toEqual(props.popular)
  });

  it('does not render link to backdrop game information', () => {
    expect(wrap.find('section.backdrop-name')).toHaveLength(0)
    expect(wrap.find('Link')).toHaveLength(0)
  });

  it('renders 1 Footer as last component', () => {
    expect(wrap.find(Footer)).toHaveLength(1)
    expect(wrap.children().last().type()).toEqual(Footer)
  });

});

describe('Test Landing actions', () => {

  let store
  const mockStore = configureStore([thunk])

  beforeEach(()=>{
    axios.get = jest.fn()
    store = mockStore({
      isLoadingPopular: true,
      getBackdrop: jest.fn().mockName('getBackdropMock'),
      getPopular: jest.fn().mockName('getPopularMock'),
      backdrop: {},
      popular: []
    });
  });

  afterEach(()=>{
    axios.get.mockRestore()
  });

  describe('Test getPopular action', () => {
    it('dispatches GET_POPULAR action and returns data on success', async () => {

      const mockResponse = [
        {
            "id": 26950,
            "cover": {
                "id": 75103,
                "image_id": "co1ly7"
            },
            "name": "Marvel's Avengers",
            "popularity": 1969.805380721215,
            "slug": "marvels-avengers"
        },
        {
            "id": 18225,
            "cover": {
                "id": 74152,
                "image_id": "co1l7s"
            },
            "name": "The Sinking City",
            "popularity": 1307.732224438319,
            "slug": "the-sinking-city"
        }]

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockResponse
        })
      );

      await store.dispatch(getPopular());

      // Test axios is called with correct endpoint
      expect(axios.get.mock.calls.length).toEqual(1);
      expect(axios.get.mock.calls[0][0]).toEqual('/api/games/popular/');

      // Test axios get is called with default params
      const params = { limit: 6, offset: 0, filters: {} };
      expect(axios.get.mock.calls[0][1].params).toEqual(params);

      // Test correct action with correct payload
      const actions = store.getActions();
      expect(actions[0].type).toEqual('GET_POPULAR');
      expect(actions[0].payload).toEqual(mockResponse);
    });

    it('does not dispatch GET_POPULAR when an error occurs', async () => {

      const mockResponse = Promise.reject({ error: 'Something bad happened' });
      axios.get.mockImplementationOnce(() => mockResponse);

      // Call getPopular with non default params
      await store.dispatch(getPopular(7, 2, { genre: [{id: 5}]}));

      // Test axios is called with correct args and returns mock response
      expect(axios.get.mock.calls.length).toEqual(1);
      expect(axios.get.mock.calls[0][0]).toEqual('/api/games/popular/');

      // Test axios get is called with given params
      const params = { limit: 7, offset: 2, filters: { genre: [{id: 5}]} };
      expect(axios.get.mock.calls[0][1].params).toEqual(params);

      // Ensure mock axios returns mock response
      expect(axios.get.mock.results[0].value).toEqual(mockResponse);

      // No actions were dispatched because of error in response
      const actions = store.getActions();
      expect(actions).toEqual([]);
    });
  });

  describe('Test getBackdrop action', () => {
    it('dispatches GET_BACKDROP action and returns data on success', async () => {

      const mockResponse = [
        {
            "id": 2155,
            "name": "Dark Souls",
            "screenshots": [
                {
                    "id": 2613,
                    "image_id": "sylfmtzktmb4b0ext8nr"
                },
                {
                    "id": 2614,
                    "image_id": "nz70mpjc7kszcyesgmqw"
                },
                {
                    "id": 4617,
                    "image_id": "xov2ga3zkudrtr0sqp8n"
                },
                {
                    "id": 6379,
                    "image_id": "i16sgcogmkrvy0ixs0rt"
                },
                {
                    "id": 9111,
                    "image_id": "gdplcyvz8fvgxvgu2phn"
                }
            ],
            "slug": "dark-souls"
        }]

      const expectedActionPayload = {
          gameId: 2155,
          name: "Dark Souls",
          imageId: "nz70mpjc7kszcyesgmqw",
          slug: "dark-souls"
      }

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockResponse
        })
      );

      await store.dispatch(getBackdrop(2155));

      // Test axios is called with correct args
      expect(axios.get.mock.calls.length).toEqual(1);
      expect(axios.get.mock.calls[0][0]).toEqual('/api/games/backdrop/2155/');

      // Test correct action with expected payload
      const actions = store.getActions();
      expect(actions[0].type).toEqual('GET_BACKDROP');
      expect(actions[0].payload).toEqual(expectedActionPayload);
    });

    it('does not dispatch GET_BACKDROP when an error occurs', async () => {

      const mockResponse = Promise.reject({ error: "Something bad happened" });
      axios.get.mockImplementationOnce(() => mockResponse);

      await store.dispatch(getBackdrop(2155));

      // Test axios is called with correct args and returns mock response
      expect(axios.get.mock.calls.length).toEqual(1);
      expect(axios.get.mock.calls[0][0]).toEqual('/api/games/backdrop/2155/');

      // Ensure mock axios returns mock response
      expect(axios.get.mock.results[0].value).toEqual(mockResponse);

      // No actions were dispatched because of error in response
      const actions = store.getActions();
      expect(actions).toEqual([]);
    });
  });
});

describe('Test Landing reducers', () => {

  const initialState = {
    backdrop: {},
    popular: [],
    gameData: [],
    isLoadingPopular: true
  };

  it('returns the initial state when an action type is not passed', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_POPULAR', () => {
    const getPayloadAction = {
      type: "GET_POPULAR",
      payload: [
        {
            "id": 26950,
            "cover": {
                "id": 75103,
                "image_id": "co1ly7"
            },
            "name": "Marvel's Avengers",
            "popularity": 1969.805380721215,
            "slug": "marvels-avengers"
        },
        {
            "id": 18225,
            "cover": {
                "id": 74152,
                "image_id": "co1l7s"
            },
            "name": "The Sinking City",
            "popularity": 1307.732224438319,
            "slug": "the-sinking-city"
        }]
    };

    const expectedState = {
      backdrop: {},
      popular: [
        {
            "id": 26950,
            "cover": {
                "id": 75103,
                "image_id": "co1ly7"
            },
            "name": "Marvel's Avengers",
            "popularity": 1969.805380721215,
            "slug": "marvels-avengers"
        },
        {
            "id": 18225,
            "cover": {
                "id": 74152,
                "image_id": "co1l7s"
            },
            "name": "The Sinking City",
            "popularity": 1307.732224438319,
            "slug": "the-sinking-city"
        }],
      gameData: [],
      isLoadingPopular: false
    };

    const getPopularReducer = reducer(initialState, getPayloadAction);
    expect(getPopularReducer).toEqual(expectedState);
  });

  it('handles GET_BACKDROP', () => {
    const getBackdropAction = {
      type: "GET_BACKDROP",
      payload: {
          gameId: 2155,
          name: "Dark Souls",
          imageId: "nz70mpjc7kszcyesgmqw",
          slug: "dark-souls"
      }
    };

    const expectedState = {
      backdrop: {
          gameId: 2155,
          name: "Dark Souls",
          imageId: "nz70mpjc7kszcyesgmqw",
          slug: "dark-souls"
      },
      popular: [],
      gameData: [],
      isLoadingPopular: true
    };

    const getBackdropReducer = reducer(initialState, getBackdropAction);
    expect(getBackdropReducer).toEqual(expectedState);
  });
});
