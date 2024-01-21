// Action Types
export const SAVE_PROJECT_DETAILS = 'SAVE_PROJECT_DETAILS';

// Action Creator
export const saveProjectDetails = (projectDetails) => ({
  type: SAVE_PROJECT_DETAILS,
  payload: projectDetails
});
