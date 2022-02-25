import {
  ADD_ITEM_SCORE,
  CLEAR_ITEM_AND_NOTES,
  RESET_APP,
  UPDATE_NOTES,
  UPDATE_WEIGHT,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_SECTION,
} from "../actions/data-actions";

function getInitialState() {
  return [];
}

function resetAll(state){
  const nextState = state.map(section=>{
    section.prompts = section.prompts.map(question=> {return {prompt: question.prompt}});
    return section;
  });
  return nextState;
}

function getNextState(state, payload){
  const { section } = payload;
  const nextState = state.filter(item=>item.section !== section);
  const sectIdx = state.findIndex((item) => item.section === section);
  return { nextState, sectIdx, ...payload };
}

function remove(state, section, prompt) {
  return state.filter(
    (item) => !(item.section === section && item.prompt === prompt)
  );
}

function removePrompt(state, payload) {
  const { nextState, sectIdx, prompt } = getNextState(state, payload);
  const newSection = removePropmtFromSection(state[sectIdx], prompt);
  nextState.splice(sectIdx, 0, newSection);
  return [...nextState];
}

function removePropmtFromSection(section, prompt) {
  const prompts = section.prompts.filter(
    (q) => !(q.prompt === prompt));
    section.prompts = prompts;
    return section
}

function clearPrompt(state, payload) {
  const { nextState, sectIdx, prompt } = getNextState(state, payload);
  const thisSection = clearPropmtValuesInSection(state[sectIdx], prompt);
  nextState.splice(sectIdx, 0, thisSection);
  return [...nextState];
}

function clearPropmtValuesInSection(section, prompt) {
  const thisPrompt = section.prompts.find((q) => q.prompt === prompt);
  thisPrompt.weight = 1;
  delete thisPrompt.notes;
  delete thisPrompt.score;
  return section;
}

function addScore(state, payload){
  const { nextState, sectIdx, prompt, score } = getNextState(state, payload);
  const thisSection = addParamToPrompt(state[sectIdx], prompt, 'score', score);
  nextState.splice(sectIdx, 0, thisSection);
  return nextState;
}

function addNotes(state, payload){
  const { nextState, sectIdx, prompt, notes } = getNextState(state, payload);
  const thisSection = addParamToPrompt(state[sectIdx], prompt, 'notes', notes);
  nextState.splice(sectIdx, 0, thisSection);
  return nextState;
}

function updateWeight(state, payload){
  const { nextState, sectIdx, prompt, weight } = getNextState(state, payload);
  const thisSection = addParamToPrompt(state[sectIdx], prompt, 'weight', weight);
  nextState.splice(sectIdx, 0, thisSection);
  return nextState;
}

function addParamToPrompt(section, prompt,paramName, paramValue) {
  const thisPrompt = section.prompts.find((q) => q.prompt === prompt);
  thisPrompt[paramName] = paramValue;
  return section;
}

function removeSection(state, payload) {
  const { section } = payload;
  return state.filter(
    (item) => {
      return !(item.section === section)
    }
  );
}

export function data(state = getInitialState(), action) {
  switch (action.type) {
    case ADD_SECTION:{
      const nextState = removeSection(state, action.payload);
      return [...nextState, action.payload];
    }
    case ADD_ITEM:{
      // TODO - add section item
      return [state]    
    }
    case ADD_ITEM_SCORE:{
      return addScore(state, action.payload);
    }
    case UPDATE_NOTES: {
      return addNotes(state, action.payload);
    }
    case UPDATE_WEIGHT: {
      return updateWeight(state, action.payload);
    }
    case REMOVE_ITEM: {
      return removePrompt(state, action.payload);
    }
    case CLEAR_ITEM_AND_NOTES:{
      return clearPrompt(state, action.payload);
    }
    case RESET_APP: {
      return resetAll(state);
    }
    default:
      return state;
  }
}
