"use client";

import { useLayoutEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import styles from "./Modal.module.css";

// Native dialogs contain focus, make the page inert, and restore focus on close.
export default function Modal({ open, onClose, title, id, children, className = "" }) {
  const ref = useRef(null);

  // A layout effect opens the dialog in the same commit, so view transitions capture it open.
  useLayoutEffect(() => {
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
        const index = controls.indexOf(document.activeElement);
        const next =
          index === -1
            ? controls.at(event.shiftKey ? -1 : 0)
            : controls.at((index + (event.shiftKey ? -1 : 1)) % controls.length);
        // Cycle focus ourselves: Safari's Tab skips links, which let focus escape the dialog.
        event.preventDefault();
        next?.focus();
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
