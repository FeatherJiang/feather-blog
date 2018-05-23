import * as loading from './action-type';

const defaultState = {
  loading: false,
};

/* eslint-disable */
export const loadingData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case loading.TOGGLELOADIND:
      return { loading: !state.loading };
    default:
      return state;
  }
};
/* eslint-disable */
