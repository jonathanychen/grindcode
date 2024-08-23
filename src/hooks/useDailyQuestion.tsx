import { useEffect, useState } from "react";
import { QuestionProps } from "../components/Question"
import { LEETCODE_GRAPHQL_API } from "../common";

function useDailyQuestion() {
  const [dailyQuestion, setDailyQuestion] = useState<QuestionProps>({} as QuestionProps);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // On mount, query Leetcode for daily question data
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

      const currentQuestion =
        responseData.data.activeDailyCodingChallengeQuestion;

      const questionData = {
        title: currentQuestion.question.title,
        titleSlug: currentQuestion.question.titleSlug,
        link: currentQuestion.link,
        questionId: currentQuestion.question.frontendQuestionId,
        topics: currentQuestion.question.topicTags.map(
          (top: { name: string }) => top.name
        ),
        difficulty: currentQuestion.question.difficulty,
        status: currentQuestion.question.status,
      };

      console.log(responseData);

      setDailyQuestion({ ...questionData });
    };

    fetchData();
  }, []);

  // Upon receiving daily question data, set loading state to false
  useEffect(() => {
    if (dailyQuestion.questionId != undefined) {
      setIsLoading(false);
    }
  }, [dailyQuestion]);

  return [dailyQuestion, isLoading] as const
}

export default useDailyQuestion