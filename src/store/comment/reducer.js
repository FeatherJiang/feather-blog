import * as comment from './action-type';

const defaultState = {
  id: 0,
};


/* eslint-disable */
export const commentData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case comment.SETCOMMENTID:
      return { id: action.id };
    default:
      return state;
  }
};
/* eslint-enable */
