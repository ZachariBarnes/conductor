export const ADD_ITEM_SCORE = "ADD_ITEM_SCORE";
export function addItemNotes({ section, prompt, score }) {
  return { type: ADD_ITEM_SCORE, payload: { section, prompt, score } };
}

export const UPDATE_NOTES = "UPDATE_NOTES";
export function updateNotes({ section, prompt, notes }) {
  return { type: UPDATE_NOTES, payload: { section, prompt, notes } };
}

export const UPDATE_WEIGHT = "UPDATE_WEIGHT";
export function updateWeight({ section, prompt, weight }) {
  return { type: UPDATE_WEIGHT, payload: { section, prompt, weight } };
}

export const CLEAR_ITEM_AND_NOTES = "CLEAR_ITEM_AND_NOTES";
export function clearItem({ section, prompt }) {
  console.log(`Clear item: Section: ${section}, Prompt: ${prompt}`);
  return { type: CLEAR_ITEM_AND_NOTES, payload: { section, prompt } };
}

export const REMOVE_ITEM = "REMOVE_ITEM";
export function removeItem({ section, prompt }) {
  console.log(`Remove item: Section: ${section}, Prompt: ${prompt}`);
  return { type: CLEAR_ITEM_AND_NOTES, payload: { section, prompt } };
}

export const ADD_ITEM = "ADD_ITEM";
export function addItem({ section, prompt }) {
  console.log(`Add new item: Section: ${section}, Prompt: ${prompt}`);
  return { type: ADD_ITEM, payload: { section, prompt } };
}

export const ADD_SECTION = "ADD_SECTION";
export function addSection({ section}) {
  // console.log(`Add new Section: ${section.section}`);
  return { type: ADD_SECTION, payload: section };
}

export const RESET_APP = "RESET_APP";
export function resetApp() {
  return { type: RESET_APP };
}
