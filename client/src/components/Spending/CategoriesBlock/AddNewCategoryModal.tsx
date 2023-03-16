import React, { useState } from "react";
import styles from "./AddNewCategoryModal.module.css";

type Modal = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewCategoryModal = (props: Modal) => {
  const [newCategory, setNewCategory] = useState("");

  if (!props.isOpen) {
    return <></>;
  }
  return (
    <div
      className={`${styles.modal} + ${styles.active}`}
      onClick={props.onClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <input value={""} />
      </div>
    </div>
  );
};

export default AddNewCategoryModal;
