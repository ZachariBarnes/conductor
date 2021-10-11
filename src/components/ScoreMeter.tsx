import React, { useState, MouseEvent } from "react";

const empty_star = "☆";
const full_star = "★";

type NoOp = typeof Function.prototype;

interface ScoreMeterProps {
  score: number;
  scoreRange: number;

  onScoreSelect: ((value: number) => void) | NoOp;
  onScoreClear: (() => void) | NoOp;
}

export function ScoreMeter({
  score = 0,
  onScoreSelect = Function.prototype,
  onScoreClear = Function.prototype,
  scoreRange = 5,
}: ScoreMeterProps) {
  const [tScore, setTScore] = useState<number | null>(0);

  const stars = Array(scoreRange).fill(0);

  function handleClick(event: MouseEvent<HTMLButtonElement>, value: number) {
    event.preventDefault();
    setTScore(null);
    onScoreSelect(value);
  }

  function handleMouseEnter(
    event: MouseEvent<HTMLButtonElement>,
    value: number
  ) {
    event.preventDefault();
    setTScore(value);
  }

  function handleMouseLeave(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setTScore(null);
  }

  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    onScoreClear();
  }

  return (
    <div className="flex items-center">
      {stars.map((p, i) => (
        <button
          key={i}
          type="button"
          className="px-1 py-2 text-2xl pointer"
          onClick={(event) => handleClick(event, i + 1)}
          onMouseEnter={(event) => handleMouseEnter(event, i + 1)}
          onMouseLeave={(event) => handleMouseLeave(event)}
        >
          <Score tScore={tScore} score={score} i={i} />
        </button>
      ))}

      <button
        type="button"
        onClick={(event) => handleClear(event)}
        className="p-2 bg-gray-100 rounded hover:bg-gray-200"
      >
        ❌
      </button>
    </div>
  );
}

interface ScoreProps {
  score: number;
  tScore: number | null;
  i: number;
}

function Score({ score, tScore, i }: ScoreProps) {
  let display = "";
  if (tScore) {
    display = i >= tScore ? empty_star : full_star;
  } else {
    display = i >= score ? empty_star : full_star;
  }

  return <>{display}</>;
}
