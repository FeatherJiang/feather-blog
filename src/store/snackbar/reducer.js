import * as snackbar from './action-type';

const defaultState = {
  toggle: false,
  message: '',
};


/* eslint-disable */
export const snackbarData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case snackbar.TOGGLESNACKBAR:
      return { toggle: !state.toggle, message: action.message };
    default:
      return state;
  }
};
/* eslint-enable */
