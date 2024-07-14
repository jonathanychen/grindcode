import React from "react";
import { FaLink } from "react-icons/fa";

const LEETCODE_BASE_URL = "https://leetcode.com";

type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export type QuestionProps = {
  title?: string;
  link?: string;
  questionId?: string;
  difficulty?: QuestionDifficulty;
  topics?: string[];
};

function Question({
  title,
  link,
  questionId,
  difficulty,
  topics,
}: QuestionProps) {
  let difficultyColor;
  if (difficulty === "Easy") {
    difficultyColor = "bg-green-400";
  } else if (difficulty === "Medium") {
    difficultyColor = "bg-yellow-400";
  } else if (difficulty === "Hard") {
    difficultyColor = "bg-red-400";
  }

  return (
    <div className="text-black">
      <div className="flex flex-col justify-center m-2">
        <h1 className="text-md">Official Leetcode Daily Question</h1>
        <div className="flex flex-row items-center self-center mx-2">
          <h2 className="text-lg mr-2 text-nowrap">
            {questionId + ": " + title}
          </h2>
          <div className="cursor-pointer w-full h-full">
            <a href={LEETCODE_BASE_URL + link} target="_blank">
              <FaLink size={16} color="blue" className="cursor-pointer" />
            </a>
          </div>
        </div>

        <div className="flex flex-row flex-wrap text-white text-sm">
          <div
            className={
              "rounded-full w-fit py-0.5 px-1.5 m-1 " + difficultyColor
            }
          >
            {difficulty}
          </div>
          {topics &&
            topics.map((t) => (
              <div className="text-nowrap rounded-full w-fit py-0.5 px-1.5 m-1 bg-slate-400">
                {t}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Question;
