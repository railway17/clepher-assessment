import { FC, MouseEvent } from "react";
import { ReactComponent as CloseSVG } from "../assets/close.svg";

type ModalProps = {
  children: React.ReactNode;
  closeModal: () => void;
  ariaLabelledBy?: string; // Accessibility: ID for title
  ariaDescribedBy?: string; // Accessibility: ID for description
  containerClassName?: string; // Custom class for the container
  contentClassName?: string; // Custom class for modal content
};

const Modal: FC<ModalProps> = ({
  children,
  closeModal,
  ariaLabelledBy,
  ariaDescribedBy,
  containerClassName = "",
  contentClassName = "",
}) => {
  // Handles clicks on the overlay
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    closeModal(); // Close modal when overlay is clicked
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.25)] ${containerClassName}`}
      role="dialog"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-white shadow-md rounded-2xl w-11/12 lg:w-[600px] ${contentClassName}`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal content from triggering overlay click
      >
        <div className="modal-header flex w-full justify-end pt-4 px-3">
          <button
            className="cursor-pointer"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <CloseSVG />
          </button>
        </div>
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
