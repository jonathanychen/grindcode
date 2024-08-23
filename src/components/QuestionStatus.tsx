import {
  IoCheckmarkCircleOutline,
  IoEllipsisHorizontalCircle,
} from "react-icons/io5";

import useQuestionStatus from "../hooks/useQuestionStatus";

export type QuestionStatusProps = {
  titleSlug: string;
};

function QuestionStatus({ titleSlug }: QuestionStatusProps) {
  const [questionStatus, isLoading] = useQuestionStatus(titleSlug);

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
