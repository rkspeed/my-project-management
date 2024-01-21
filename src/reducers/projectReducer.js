import { SAVE_PROJECT_DETAILS } from '../actions/projectActions';

const initialState = {
  projectDetails: {}
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PROJECT_DETAILS:
      return {
        ...state,
        projectDetails: action.payload
      };
    default:
      return state;
  }
};

export default projectReducer;
