export default function projectEditorReducer(
  state = { currentProjectId: null, selectedWeekId: null },
  action
) {
  switch (action.type) {
		case "PROJECT_EDITOR_SET_PROJECT_ID": {
			return {
				...state,
				currentProjectId: action.payload.projectId
			}
		}

		case "PROJECT_EDITOR_SET_WEEK_ID": {
			return {
				...state,
				selectedWeekId: action.payload.weekId
			}
		}

    default: {
      return { ...state };
    }
  }
}
