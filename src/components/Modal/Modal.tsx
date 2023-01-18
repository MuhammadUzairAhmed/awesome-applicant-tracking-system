import { useState, memo } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";

// Set content for modal.
const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "yourAppElement");
document.body.appendChild(modalRoot);
Modal.setAppElement("#yourAppElement");

// Display button if meet this condition
const applicants = [1];

// Set content style for modal
const content = {
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  marginRight: "-50%",
  transform: "translate(-50%, -50%)",
};

const ModalComponent = ({ stageId }: { stageId: number }) => {
  const dispatch = useDispatch();

  const [opened, open] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    description: "",
  });

  const handleSubmit = () => {
    const payload = {
      // Generate a unique id
      id: +new Date(),
      current_stage_id: 1,
      ...formData,
    };

    dispatch({
      type: "loadNewApplicant",
      payload,
    });
    open(false);
  };

  const handleOpen = () => open(false);

  return (
    <>
      {applicants.includes(stageId) && (
        <button onClick={() => open(true)}>New applicant</button>
      )}
      <Modal
        isOpen={opened}
        onRequestClose={handleOpen}
        style={{ content }}
        contentLabel="Add applicant"
      >
        <div>Add a new applicant</div>
        <br />
        <br />
        <form>
          <label htmlFor="firstname">First Name</label>
          <br />
          <input
            id="firstname"
            value={formData.first_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, first_name: e.target.value }))
            }
          />

          <br />
          <br />

          <label htmlFor="lastname">Last Name</label>
          <br />
          <input
            id="lastname"
            value={formData.last_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, last_name: e.target.value }))
            }
          />

          <br />
          <br />

          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            style={{ width: "100%" }}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>

          <br />
          <br />

          <button onClick={handleSubmit} style={{ width: "100%" }}>
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default memo(ModalComponent);
