import React, { useState } from "react";
import styles from "./style.module.scss";
import { CANCEL } from "../../assets/Images";

const Modal = ({
  isOpen = false,
  children,
  customStyleForContent,
  onCancel,
}: any) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleCloseModal = () => {
    onCancel();
  };

  return (
    <>
      {showModal && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContent} style={customStyleForContent}>
            <div>{children}</div>
            <div
              style={{
                position: "absolute",
                top: "22px",
                right: "15px",
                cursor: "pointer",
              }}
              onClick={handleCloseModal}
            >
              <img src={CANCEL} alt="cancel" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
