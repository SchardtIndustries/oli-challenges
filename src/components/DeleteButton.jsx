import React from "react";
import styles from "./DeleteButton.module.css";

const DeleteButton = ({ onClick, disabled = false }) => {
  return (
    <button
      type="button"
      className={styles.deleteButton}
      onClick={onClick}
      disabled={disabled}
    >
      Delete
    </button>
  );
};

export default DeleteButton;
