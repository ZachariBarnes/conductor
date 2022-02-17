/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import yaml from "js-yaml";
import classnames from "classnames";
import { getData } from "../../api/api";
import { AppLink } from "../../components/AppLink";
import { slugify } from "../../helpers/utils";
import { ScoreMeter } from "../../components/ScoreMeter";
import { useSelector, useDispatch } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  addItem,
  removeItem,
  resetApp,
  updateNotes,
  updateWeight,
} from "../../store/actions/data-actions";
import { Link } from "react-router-dom";
import { ResizingTextarea } from "../../components/ResizingTextarea";
import newlinebr from "newline-br";
import { ChevronUp } from "../../components/icons/ChevronUp";
import { ChevronDown } from "../../components/icons/ChevronDown";

export function Conductor() {
  const [data, setData] = useState();
  const [openMenu, setOpenMenu] = useState(true);
  const [visibleSections, setVisibleSections] = useState([]);
  useEffect(() => {
    getData()
      .then((response) => response.data)
      .then((d) => {
        const dd = yaml.load(d);
        setData(dd);
      });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div>
      <ConductorHeader menu={openMenu} setMenu={setOpenMenu} />

      <div className="flex px-4">
        {openMenu && <SectionMenu content={data.content} menu={openMenu} />}

        <div className="container px-4 mx-auto">
          {data.content.map((dat, index) => {
            let visibility = visibleSections[index] || { section:dat.section, visible: dat.visible };
            if(index>visibleSections.length-1){
              visibleSections.push(visibility);
              setVisibleSections(visibleSections);
            }
            return (
              <div
                id={slugify(dat.section)}
                key={dat.section}
                className="border-b-2 border-gray-600 last:border-b-0"
              >
               <details {...getDetailsSection(visibility.visible)}>
                  <summary>
                    <button className="mt-4 mb-4 text-lg font-bold"
                        title="Click to expand/collapse"
                        onClick={(_e)=>{
                          visibility.visible=!visibility.visible;
                          setVisibleSections([...visibleSections]);
                          return false;
                          }}>
                      {dat.section}
                    </button>
                  </summary>
                  <b>Weight</b>
                  {displaySection(dat,visibility)}
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getDetailsSection(visible){
  return visible ? {open:true} : {};
}

function displaySection(dat, visibility){

    const colors = ['white', 'lightgrey'];
    return dat.prompts.map((entry) => (
      <Entry 
        key={entry.prompt}
        section={dat.section}
        entry={entry}
        bgcolor={colors[dat.prompts.indexOf(entry)%2]}
        visible={visibility.visible}
      />
    ))
}

function ConductorHeader({ menu, setMenu }) {
  const topnavClassnames = classnames(
    "border-b-2 border-gray-200 px-4 mb-4 bg-white sticky top-0 z-40"
  );
  return (
    <div className={topnavClassnames}>
      <button type="button" onClick={(e) => {console.log("Test:" + setMenu, menu); return setMenu((p) => !p)}}>
        menu
      </button>
    </div>
  );
}

function SectionMenu({ content, menu }) {
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(resetApp());
  }

  const menuClassnames = classnames("pb-4", {
    "sticky top-0 h-screen": true,
  });

  return (
    <div className={menuClassnames}>
      <h1 className="text-lg font-bold">Table of Contents</h1>
      <ul className="pl-2">
        {content.map((dat) => {
          return (
            <li key={dat.section}>
              <AppLink href={`#${slugify(dat.section)}`}>{dat.section}</AppLink>
            </li>
          );
        })}
      </ul>
      <Link
        to="/conductor/export"
        className="block w-full p-2 my-2 text-center text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700"
      >
        Export to Markdown
      </Link>
      <button
        onClick={handleReset}
        className="block w-full p-2 my-2 text-sm text-center text-white bg-gray-600 rounded shadow-sm hover:bg-gray-700"
      >
        Reset
      </button>
    </div>
  );
}

function useItemEvents(section, prompt) {
  const dispatch = useDispatch();

  const handleScoreSelected = React.useCallback(
    function handleScoreSelected(value) {
      dispatch(addItem({ section, prompt, score: value }));
    },
    [section, prompt, dispatch]
  );

  const handleScoreCleared = React.useCallback(
    function handleScoreCleared() {
      dispatch(removeItem({ section, prompt }));
    },
    [section, prompt, dispatch]
  );

  const handleNotesChanged = React.useCallback(
    function handleNotesChanged(value) {
      dispatch(updateNotes({ section, prompt, notes: value }));
    },
    [section, prompt, dispatch]
  );

  const handleWeightChanged = React.useCallback(
    function handleWeightChanged(value) {
      dispatch(updateWeight({ section, prompt, weight: value }));
    },
    [section, prompt, dispatch]
  );

  return { handleScoreSelected, handleScoreCleared, handleNotesChanged, handleWeightChanged };
}

function useItem(section, prompt) {
  const items = useSelector((state) => state.data);
  return items.find(
    (item) => item.section === section && item.prompt === prompt
  );
}

function getScore(item) {
  const score = item && item.score ? item.score : 0;
  return score;
}

function getWeight(item){
  const weight = item && item.weight!==undefined ? item.weight : 1;
  return weight;
}

function getNotes(item) {
  return item && item.notes ? item.notes : "";
}

function Entry({ section, entry, bgcolor, visible }) {
  const item = useItem(section, entry.prompt);
  const { handleScoreSelected, handleScoreCleared, 
    handleNotesChanged, handleWeightChanged } =
    useItemEvents(section, entry.prompt);
  const score = getScore(item);
  const notes = getNotes(item);
  const weight = getWeight(item);
  return (
    <MemoSingleEntry
      entry={entry}
      prompt={entry.prompt}
      section={section}
      score={score}
      notes={notes}
      weight={weight}
      handleWeightChanged={handleWeightChanged}
      handleScoreCleared={handleScoreCleared}
      handleScoreSelected={handleScoreSelected}
      handleNotesChanged={handleNotesChanged}
      bgcolor={bgcolor}
      visible={visible}
    />
  );
}


function getWeightWidget(promptObj, prompt, handleWeightChanged, weight, setWeight){
  return(
    <div style={{flexWrap:'wrap', flexDirection:'row'}}>
       <button className="w-4 h-4" 
        style={{display: 'inline-block'}}
        onClick={(e)=>{weight++; handleWeightChanged(weight); setWeight(weight)}}>
        <ChevronUp/>
      </button>
        <p style={{display: 'inline-block', padding:2.5}}>{weight}</p>
      <button className="w-4 h-4" 
        style={{display: 'inline-block'}}
        onClick={(e)=>{if(weight){weight--}; handleWeightChanged(weight); setWeight(weight)}}>
        <ChevronDown size="4" />
      </button>
        <p className="pr-4 text-base" style={{display: 'inline-block', padding:5}}>{prompt}</p>
    </div>
  )
}

function SingleEntry({
  entry,
  prompt,
  section,
  score,
  notes,
  weight,
  handleWeightChanged,
  handleScoreCleared,
  handleScoreSelected,
  handleNotesChanged,
  bgcolor,
  visible
}) {
  const [addNotes, setAddNotes] = useState(false);
  const [stateWeight, setWeight] = useState(weight); 
  const displayStyle = visible ? "block" : "none" ;
  const renderTooltip = props => (
    <Tooltip {...props} className="flex-row items-center padding-2 justify-between w-full md:w-2/5 text-sm text-center text-white bg-gray-600 rounded shadow-sm hover:bg-gray-700">{entry.details}</Tooltip>
  );

  return (
    prompt && (
      <div key={prompt} className="mb-4" style={{backgroundColor: bgcolor, padding:5, display: displayStyle}}>
        <div className="flex-row items-center justify-between md:flex" >
        <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
          <div className="w-full md:w-3/5">
            {getWeightWidget(entry, prompt, handleWeightChanged, stateWeight, setWeight)}
          </div>
          </OverlayTrigger>
          <div className="flex items-center w-full space-x-2 md:w-2/5 md:justify-end sm:justify-center sm:self-center">
            <ScoreMeter
              score={score}
              onScoreSelect={handleScoreSelected}
              onScoreClear={handleScoreCleared}
            />

            <button
              className="flex items-center p-2 space-x-2 bg-gray-100 rounded hover:bg-gray-200"
              onClick={(e) => setAddNotes((q) => !q)}
            >
              {!addNotes ? (
                <div className="w-4 h-4">
                  <ChevronUp size="4" />
                </div>
              ) : (
                <div className="w-4 h-4">
                  <ChevronDown size="4" />
                </div>
              )}
              📝
            </button>
          </div>
        </div>
        <div>
          {addNotes && (
            <ResizingTextarea
              row="3"
              className="w-full p-2 border border-gray-300"
              placeholder="notes..."
              value={notes}
              onChange={(e) => handleNotesChanged(e.target.value)}
            />
          )}
          {!addNotes && notes.length > 0 && (
            <div
              className="p-4 bg-gray-200"
              dangerouslySetInnerHTML={{ __html: newlinebr(notes) }}
            ></div>
          )}
        </div>
      </div>
    )
  );
}

const MemoSingleEntry = React.memo(SingleEntry);
