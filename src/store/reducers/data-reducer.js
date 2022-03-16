import { initalState } from "../../data/initialState";
import _ from 'lodash';
import {
  ADD_ITEM_SCORE,
  CLEAR_ITEM_AND_NOTES,
  RESET_APP,
  CLEAR_ALL,
  UPDATE_NOTES,
  UPDATE_WEIGHT,
  ADD_ITEM,
  REMOVE_ITEM,
  ADD_SECTION,
  CLEAR_STATE,
} from "../actions/data-actions";

function getInitialState() {
  return [];
}

function getBaseState(){
  console.log("getInitialState", initalState.length);
  return [...initalState]
}

function clearAll(oldState){
  const state = _.cloneDeep(oldState);
  const nextState = state.map(section=>{
    section.prompts = section.prompts.map(question=> {return {prompt: question.prompt}});
    return section;
  });
  return [...nextState];
}

function getNextState(oldState, payload){
  const state = _.cloneDeep(oldState);
  const { section } = payload;
  const nextState = state.filter(item=>item.section !== section);
  const sectIdx = state.findIndex((item) => item.section === section);
  return { nextState, sectIdx, ...payload };
}

function removePrompt(oldState, payload) {
  const state = _.cloneDeep(oldState);
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

function clearPrompt(oldState, payload) {
  const state = _.cloneDeep(oldState);
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

function addPrompt(oldState, payload){
  const state = _.cloneDeep(oldState);
  const { nextState, sectIdx, prompt, details } = getNextState(state, payload);
  const thisSection = state[sectIdx];
  const newPrompt = { prompt };
  if(details){
    newPrompt.details = details;
  }
  thisSection.prompts.push(newPrompt)
  nextState.splice(sectIdx, 0, thisSection);
  return nextState;
}

function addScore(oldState, payload){
  const state = _.cloneDeep(oldState);
  const { nextState, sectIdx, prompt, score } = getNextState(state, payload);
  const thisSection = addParamToPrompt(state[sectIdx], prompt, 'score', score);
  nextState.splice(sectIdx, 0, thisSection);
  return nextState;
}

function addNotes(oldState, payload){
  const state = _.cloneDeep(oldState);
  const { nextState, sectIdx, prompt, notes } = getNextState(state, payload);
  const thisSection = addParamToPrompt(state[sectIdx], prompt, 'notes', notes);
  nextState.splice(sectIdx, 0, thisSection);
  return nextState;
}

function updateWeight(oldState, payload){
  const state = _.cloneDeep(oldState);
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

function addSection(state, payload){
  console.log("Logging Payload: ", payload);
  if(!state.find(category=>category.section === payload.section)){
  const nextState = removeSection(state, payload);
  return [...nextState, payload];
  }
  else {
    return state;
  }
}

function removeSection(oldState, payload) {
  const state = _.cloneDeep(oldState);
  const { section } = payload;
  return state.filter(
    (item) => {
      return !(item.section === section)
    }
  );
}

export function data(state = getInitialState(), action) {
  switch (action.type) {
    case ADD_SECTION:
      return addSection(state, action.payload);
    case ADD_ITEM:
      return addPrompt(state, action.payload); //expects seciont, prompt and details
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
    case CLEAR_ALL: {
      return clearAll(state);
    }
    case CLEAR_STATE:{
      return getInitialState();
    }
    case RESET_APP: {
      return getBaseState();
    }
    default:
      return state;
  }
}
