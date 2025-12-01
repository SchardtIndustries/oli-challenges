import React, { useEffect, useRef, useCallback } from "react";
import styles from "./ConfirmationDialog.module.css";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  const dialogRef = useRef(null);
  const firstButtonRef = useRef(null);
  const lastButtonRef = useRef(null);

  // Move focus into the dialog when it opens
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        // Simple focus trap between first and last focusable elements
        const focusable = [firstButtonRef.current, lastButtonRef.current].filter(
          Boolean
        );

        if (focusable.length === 0) return;

        const currentIndex = focusable.indexOf(document.activeElement);
        let nextIndex = currentIndex;

        if (event.shiftKey) {
          nextIndex = currentIndex <= 0 ? focusable.length - 1 : currentIndex - 1;
        } else {
          nextIndex = currentIndex === focusable.length - 1 ? 0 : currentIndex + 1;
        }

        if (currentIndex === -1) {
          // If focus isn't inside yet, move it to the first
          focusable[0].focus();
        } else {
          focusable[nextIndex].focus();
        }

        event.preventDefault();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleDialogClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        ref={dialogRef}
        tabIndex="-1"
        onClick={handleDialogClick}
      >
        <h2 id="dialog-title" className={styles.title}>
          Confirm Deletion
        </h2>
        <p id="dialog-description" className={styles.description}>
          Are you sure you want to delete this post?
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onClose}
            ref={firstButtonRef}
            disabled={isDeleting}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            ref={lastButtonRef}
            disabled={isDeleting}
            className={styles.deleteButton}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
