import React from "react";
import { BarLoader } from "react-spinners";
import Question from "./Question";
import useDailyQuestion from "../hooks/useDailyQuestion";

function DailyQuestion() {
  const [dailyQuestion, isLoading] = useDailyQuestion();

  return (
    <div className="flex flex-col justify-between bg-white rounded-xl w-full my-4 shadow-lg min-h-24">
      <h1 className="text-md text-black mt-2">
        Official Leetcode Daily Question
      </h1>
      <div className="flex justify-center align-middle">
        {isLoading ? (
          <BarLoader color="#ff18e8" />
        ) : (
          <Question {...dailyQuestion} />
        )}
      </div>
      <div className="mb-2" />
    </div>
  );
}

export default DailyQuestion;
