import styles from "../../styles/ConfirmModal.module.css";

export default function ConfirmModal({ open, onConfirm, onCancel, message }: any) {
  if (!open) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <p style={{ marginBottom: "1.5rem" }}>{message}</p>
        
        <button
          onClick={onConfirm}
          className={`${styles.modalButton} ${styles.confirmButton}`}
        >
          Yes
        </button>

        <button
          onClick={onCancel}
          className={`${styles.modalButton} ${styles.cancelButton}`}
        >
          No
        </button>
      </div>
    </div>
  );
}
