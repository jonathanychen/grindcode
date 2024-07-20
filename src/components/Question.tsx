import React from "react";
import { FaLink } from "react-icons/fa";
import { LEETCODE_BASE_URL } from "../common";
import QuestionStatus from "./QuestionStatus";

type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export type QuestionProps = {
  title?: string;
  titleSlug?: string;
  link?: string;
  questionId?: string;
  difficulty?: QuestionDifficulty;
  topics?: string[];
  status?: boolean;
};

function Question({
  title,
  titleSlug,
  link,
  questionId,
  difficulty,
  topics,
}: QuestionProps) {
  let difficultyColor;
  if (difficulty === "Easy") {
    difficultyColor = "bg-green-50 text-green-700 ring-green-600/20";
  } else if (difficulty === "Medium") {
    difficultyColor = "bg-yellow-50 text-yellow-700 ring-yellow-600/20";
  } else if (difficulty === "Hard") {
    difficultyColor = "bg-red-50 text-red-700 ring-red-600/20";
  }

  return (
    <div className="flex flex-col justify-center mx-2 mb-2 text-black max-w-full px-4">
      <div className="flex flex-row align-text-top items-center max-w-full justify-start">
        <h2 className="text-lg mr-2 truncate">{questionId + ": " + title}</h2>
        <div className="cursor-pointer">
          <a href={LEETCODE_BASE_URL + link} rel="noreferrer" target="_blank">
            <FaLink size={16} color="blue" className="cursor-pointer" />
          </a>
        </div>
        <QuestionStatus titleSlug={titleSlug} />
      </div>

      <div className="flex flex-row flex-nowrap text-white text-sm w-full rounded-md mt-1 mx-2">
        <span
          className={
            `inline-flex items-center rounded-full mr-2 px-2 py-1 text-xs font-medium ring-1 ring-inset ` +
            difficultyColor
          }
        >
          {difficulty}
        </span>
        {topics &&
          topics.map((t, id) => (
            <span
              key={id}
              className="inline-flex items-center rounded-full mr-1 bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
            >
              {t}
            </span>
          ))}
      </div>
    </div>
  );
}

export default Question;
