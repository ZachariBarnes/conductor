import {
  ADD_ITEM,
  REMOVE_ITEM,
  RESET_APP,
  UPDATE_NOTES,
} from "../actions/data-actions";

function getInitialState() {
  return [];
}

function remove(state, section, prompt) {
  return state.filter(
    (item) => !(item.section === section && item.prompt === prompt)
  );
}

export function data(state = getInitialState(), action) {
  switch (action.type) {
    case ADD_ITEM:
    case UPDATE_NOTES: {
      const existing =
        state.find(
          (item) =>
            item.section === action.payload.section &&
            item.prompt === action.payload.prompt
        ) || {};
      const item = { ...existing, ...action.payload };
      const nextState = remove(
        state,
        action.payload.section,
        action.payload.prompt
      );
      return [...nextState, item];
    }
    case REMOVE_ITEM: {
      return remove(state, action.payload.section, action.payload.prompt);
    }
    case RESET_APP: {
      return [];
    }
    default:
      return state;
  }
}
