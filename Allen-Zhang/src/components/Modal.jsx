"use client";

import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import styles from "./Modal.module.css";

// Native dialogs contain focus, make the page inert, and restore focus on close.
export default function Modal({ open, onClose, title, id, children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      id={id}
      className={`${styles.dialog} ${className}`}
      aria-labelledby={`${id}-title`}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = [...ref.current.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter(
          (element) => element.getClientRects().length > 0,
        );
        const first = controls[0];
        const last = controls.at(-1);
        // Keep Tab cycling in the dialog instead of moving into browser chrome.
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className={styles.header}>
        <h2 id={`${id}-title`}>{title}</h2>
        <button type="button" onClick={onClose} className={styles.close} aria-label={`Close ${title}`}>
          <FiX aria-hidden="true" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
