import { memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import "./item-style.css";

// this condition shouldn't be true for stage changes.
const changeStages = [4, 5];

const nextSteps = [1, 2, 3];

type ApplicantsProps = {
  name: string;
  description: string;
  id: number;
};

// Memo increase performance.
const Item = ({
  applicant,
  stageId,
}: {
  applicant: ApplicantsProps;
  stageId: number;
}) => {
  const dispatch = useDispatch();

  // calling this function for moving to next step.
  // useMemo helps us to stop recreation of this funciton repeatedly.
  const nextStep = useMemo(() => {
    if (nextSteps.includes(stageId)) return stageId + 1;
    return false;
  }, [stageId]);

  // move to next step
  const handleChangeSteps = (type: string, payload: object | number) => {
    const param = {
      type,
      payload,
    };
    dispatch(param);
  };

  return (
    <div
      className={
        stageId === 5 ? " applicant-rejected item-container" : "item-container"
      }
    >
      <b className={"applicantName"}>{applicant.name}</b>
      {/* Feature needed for allowing styling of an applicants description. */}
      {/* Ignore dangerouslySetInnerHTML because its a html prop and we use react */}
      <p dangerouslySetInnerHTML={{ __html: applicant.description }}></p>
      {/* Delete button */}
      <button
        onClick={() => handleChangeSteps("deleteApplicant", applicant?.id)}
      >
        Delete
      </button>
      {/* reject button */}
      {!changeStages.includes(stageId) && (
        <button
          onClick={() =>
            handleChangeSteps("changeStage", {
              id: applicant.id,
              newStageId: 5,
            })
          }
        >
          Reject
        </button>
      )}
      {/* next step button */}
      {nextStep && (
        <button
          onClick={() =>
            handleChangeSteps("changeStage", {
              id: applicant.id,
              newStageId: nextStep,
            })
          }
        >
          Move to next step
        </button>
      )}
    </div>
  );
};

export default memo(Item);
