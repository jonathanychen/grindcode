import React, { useState, useEffect } from 'react';
import { LEETCODE_GRAPHQL_API } from '../common';

function useQuestionStatus(titleSlug: string) {
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

  return [questionStatus, isLoading] as const
}

export default useQuestionStatus
