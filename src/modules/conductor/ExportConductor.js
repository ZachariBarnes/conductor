import React from "react";
import { useSelector } from "react-redux";
import { uniqBy, groupBy } from "lodash";

export function ExportConductor() {
  const items = useSelector((state) => state.data);

  const totalResponses = items.length;
  console.log(items);
  const sections = uniqBy(items, (a) => a.section);
  const totalSections = sections.length;

  const groups = groupBy(items, "section");
  console.log(groups);
  const content = Object.keys(groups)
    .map((group) => {
      let overallScore = 0;
      let addedWeight = 0;
      let a = `##### ${group}\n`;
      const b = groups[group].map((item) => {
        if(item.score){
        let weight = item.weight!==undefined ? item.weight : 1;
        let v = `* ${item.prompt}\n`;
        if (item.score) {
          let scoreArray = Array(item.score).slice(0);
          v += `    - ${scoreArray.fill("★").join("")}`;
          overallScore+=(item.score*weight);
          addedWeight+=weight>1?weight:0;
        }
        if (item.notes) {
          v += `    - ${item.notes}`;
        }
        return v;
      }
      return ''
      });
      overallScore = Math.round(overallScore/(groups[group].length+addedWeight));
      if(overallScore>0){
        a += getStars(overallScore);
      }
      return [a, ...b].join("\n");
    })
    .join("\n");

  return (
    <div>
      <div className="flex flex-col h-screen mx-auto md:w-3/5">
        <div className="">
          <h1 className="text-2xl">Export</h1>

          <div className="flex space-x-4">
            <p className="text-sm">{totalSections} sections used</p>
            <p className="text-sm">{totalResponses} responses recorded</p>
          </div>
        </div>

        {/* <div> */}
        <textarea 
          readOnly
          className="flex-1 flex-grow w-full h-full p-2 my-4 border-2 border-gray-200"
          value={content}
        ></textarea>
        {/* </div> */}
      </div>
    </div>
  );
}

const getStars = (score) => {
  if(score>5){
    score=5;
  }
  let stars = "";
  for(var i = 1; i <= score; i++) {
    stars += "★";
  }
  for(i;i<=5;i++) {
    stars += "☆";
  }
  return stars;
}