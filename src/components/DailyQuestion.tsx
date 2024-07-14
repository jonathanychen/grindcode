import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Question, { QuestionProps } from "./Question";

const LEETCODE_GRAPHQL_API = "https://leetcode.com/graphql/";

function DailyQuestion() {
  const [dailyQuestion, setDailyQuestion] = useState<QuestionProps>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const query = `query questionOfToday {
        activeDailyCodingChallengeQuestion {
            date
            userStatus
            link
            question {
                acRate
                difficulty
                freqBar
                frontendQuestionId: questionFrontendId
                isFavor
                paidOnly: isPaidOnly
                status
                title
                titleSlug
                hasVideoSolution
                hasSolution
                topicTags {
                    name
                        id
                        slug
                }
            }
        }	
    }`;

    const request = {
      operationName: "questionOfToday",
      query: query,
      variables: {},
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

      const currentQuestion =
        responseData.data.activeDailyCodingChallengeQuestion;

      const questionData = {
        title: currentQuestion.question.title,
        link: currentQuestion.link,
        questionId: currentQuestion.question.frontendQuestionId,
        topics: currentQuestion.question.topicTags.map((top: any) => top.name),
        difficulty: currentQuestion.question.difficulty,
      };

      setDailyQuestion({ ...questionData });
    };

    fetchData();
    setIsLoading(false);

    return () => {};
  }, []);

  useEffect(() => {
    console.log(dailyQuestion);
  }, [dailyQuestion]);

  return (
    <div className="bg-white rounded-xl w-full my-4">
      {isLoading ? (
        <div>
          <ClipLoader />
          <h1>Loading...</h1>
        </div>
      ) : (
        <Question {...dailyQuestion} />
      )}
    </div>
  );
}

export default DailyQuestion;
