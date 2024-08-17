import { actions } from "./DropdownModal";

export function switchDropdownVisibilityDispatcher(dispatch) {
  dispatch({
    type: actions.SWITCH_DROPDOWN_VISIBILITY,
  });
}

export function changeOptionSelectionDispatcher(dispatch, option) {
  dispatch({
    type: actions.CHANGE_OPTION_SELECTION,
    payload: {
      option,
    },
  });
}

export function initializeOptionsDispatcher(dispatch, options) {
  dispatch({
    type: actions.INITIALIZE_OPTIONS,
    payload: {
      options,
    },
  });
}

export function switchOptionsVisibilityDispatcher(dispatch, options) {
  dispatch({
    type: actions.SWITCH_OPTIONS_VISIBILITY,
    payload: {
      options,
    },
  });
}
