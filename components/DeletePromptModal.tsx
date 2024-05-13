import { useEffect, useRef } from "react";
import Modal, { ModalHandle } from "./UI/Modal";

type DeletePromptModalProps = {
  onDelete: () => void;
  onClose: () => void; // onClose is accepted to "tell" the parent component that the UpcomingSessions component should be removed from the DOM
};

export default function DeletePromptModal({
  onClose,
  onDelete,
}: DeletePromptModalProps) {
  const modal = useRef<ModalHandle>(null);

  // useEffect is used to open the Modal via its exposed `open` method when the component is mounted
  useEffect(() => {
    if (modal.current) {
      modal.current.open();
    }
  }, []);

  const handleDeletePrompt = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal ref={modal} onClose={onClose} className={""}>
      <div className="flex flex-col items-center">
        <h2>Are you sure you want to delete this prompt?</h2>
        <div className="flex mt-5 gap-5">
          <button
            className="px-5 py-1.5 bg-primary-orange rounded-full text-white"
            onClick={handleDeletePrompt}
          >
            Delete
          </button>
          <button
            className="px-5 py-1.5 outline_btn rounded-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
