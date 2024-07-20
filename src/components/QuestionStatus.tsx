import React, { useState, useEffect } from "react";
import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalCircle,
} from "react-icons/io5";

import { LEETCODE_GRAPHQL_API } from "../common";

export type QuestionStatusProps = {
  titleSlug?: string;
};

function QuestionStatus({ titleSlug }: QuestionStatusProps) {
  const [questionStatus, setQuestionStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const query = `query userQuestionStatus($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        status
      }
    }`;

    const request = {
      operationName: "userQuestionStatus",
      query: query,
      variables: {
        titleSlug: titleSlug,
      },
    };

    const fetchData = async () => {
      const response = await fetch(LEETCODE_GRAPHQL_API, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(request),
      });
      const responseData = await response.json();

      console.log(responseData);

      setQuestionStatus(responseData.data.question.status);
    };

    setIsLoading(true);
    fetchData();
  }, []);

  useEffect(() => {
    if (questionStatus != "") {
      setIsLoading(false);
    }
  }, [questionStatus]);

  if (isLoading) {
    return <></>;
  }

  let statusString;
  let statusSymbol;
  if (questionStatus == "ac") {
    statusString = "Solved";
    statusSymbol = <IoCheckmarkCircleOutline size={16} color="#22c55e" />;
  } else if (questionStatus == "") {
    statusString = "Attempted";
    statusSymbol = <IoEllipsisHorizontalCircle size={16} color="#fde047" />;
  }

  const innerContent = (
    <>
      <div className="text-md mx-2 truncate text-nowrap">{statusString}</div>
      {statusSymbol}
    </>
  );

  return <div className="flex flex-row items-center">{innerContent}</div>;
}

export default QuestionStatus;
