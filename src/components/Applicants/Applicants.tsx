import { ReduxState } from "../../store/dataSTorage";
import { useSelector } from "react-redux";
import Modal from "../Modal";
import Item from "../Item";
import "./applicant-style.css";

const Applicants = ({ stageId }: { stageId: number }) => {
  const filteredApplicants = useSelector(({ applicants }: ReduxState) =>
    applicants.filter((applicant) => applicant.current_stage_id === stageId)
  );

  const applicants =
    filteredApplicants?.map(({ first_name, last_name, ...a }) => ({
      name: `${first_name} ${last_name}`,
      ...a,
    })) || [];

  const stage = useSelector(({ stages }: ReduxState) => {
    return stages.find((thisstage) => thisstage.id === stageId);
  });

  return (
    <div className="applicant-container">
      {/* Display form if stageId 1 */}
      <Modal stageId={stageId} />

      <p className="title">{stage?.title}</p>

      {applicants.map((applicant) => (
        <Item key={applicant.id} applicant={applicant} stageId={stageId} />
      ))}
    </div>
  );
};

export default Applicants;
