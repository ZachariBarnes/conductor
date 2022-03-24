import React from "react";
import { useSelector } from "react-redux";
import { uniqBy } from "lodash";

export function ExportConductor() {
  const items = useSelector((state) => state.data);

  const totalResponses = items.length;
  const sections = uniqBy(items, (a) => a.section);
  const totalSections = sections.length;
  let totalScore = 0;
  let totalWeight = 0;
  const sectionSummaries = sections
    .map((group) => {
      let overallScore = 0;
      let addedWeight = 0;
      let a = `\n#### ${group.section}:`;
      const answerCount = group.prompts.filter(q=>q.score).length;
      if(answerCount){
      const b = group.prompts.map((item) => {
        if(item.score){
        let weight = item.weight || 1;
        let v = `* ${item.prompt}\n`;
        if (item.score) {
          let scoreArray = Array(item.score).slice(0);
          v += `    - ${scoreArray.fill("★").join("")}`;
          overallScore+=(item.score*weight);
          addedWeight+=(weight>1?weight-1:0);
          totalScore+=(item.score*weight);
          totalWeight+=(weight||1);
        }
        if (item.notes) {
          v += `    - ${item.notes}`;
        }
        return v;
      }
      return ''
      }).filter(q=>q.length);
      overallScore = overallScore/(answerCount+addedWeight);
      if(overallScore>0){
        a += ` ${getStars(overallScore)} (${(overallScore * 100 / 5).toFixed(0)}%)`;
      }
      return [a, ...b].join("\n");
    } else return null;
    }).filter(q=>q!==null)
    .join("\n");
    const overallAverage = totalScore / totalWeight;
    const overallSummary = `\n## Overall Summary: ${getStars(overallAverage)} (${(overallAverage * 100 / 5).toFixed(0)}%)\n`;
    const content =overallSummary + sectionSummaries;

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

const getStars = (incommingScore) => {
  let score = Math.round(incommingScore)
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