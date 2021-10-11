export const ADD_ITEM = "ADD_ITEM";
export function addItem({ section, prompt, score }) {
  return { type: ADD_ITEM, payload: { section, prompt, score } };
}

export const UPDATE_NOTES = "UPDATE_NOTES";
export function updateNotes({ section, prompt, notes }) {
  return { type: UPDATE_NOTES, payload: { section, prompt, notes } };
}

export const REMOVE_ITEM = "REMOVE_ITEM";
export function removeItem({ section, prompt }) {
  return { type: REMOVE_ITEM, payload: { section, prompt } };
}

export const RESET_APP = "RESET_APP";
export function resetApp() {
  return { type: RESET_APP };
}
