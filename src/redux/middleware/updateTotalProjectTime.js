import { setProjectTotalTime } from "../actionCreators/projectsActionCreators.js";

const updateTotalProjectTime = (store) => (next) => (action) => {
	next(action);

  if (action.type === "SET_DAY_SPLIT_TIME" || action.type === "DELETE_SPLIT") {
    const projectId = store.getState().projectEditor.currentProjectId;

    if (projectId) {
      const weeks = store.getState().projects[projectId].weeks;
			
			let totalTime = 0;
      for (let week in weeks) {
				weeks[week].forEach((day) => {
					day.forEach((split) => {
						totalTime += split.time;
					});
				})
      }
			
			store.dispatch(setProjectTotalTime(projectId, Math.floor(totalTime * 100) / 100));
    }
  }
};

export default updateTotalProjectTime;
