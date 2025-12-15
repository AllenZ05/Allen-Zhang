import { useEffect, useRef, useState } from "react";
import styles from "./CursorGlow.module.css";

const CursorGlow = () => {
  const [isVisible, setIsVisible] = useState(false);
  const glowRef = useRef(null);
  const rafIdRef = useRef(0);
  const pendingPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const updatePosition = () => {
      rafIdRef.current = 0;
      const { x, y } = pendingPositionRef.current;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
    };

    const handlePointerMove = (e) => {
      pendingPositionRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
      if (!rafIdRef.current) rafIdRef.current = window.requestAnimationFrame(updatePosition);
    };

    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    const handleDocumentLeave = (e) => {
      if (!e.relatedTarget) setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseout", handleDocumentLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("mouseout", handleDocumentLeave);
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
    };
  }, [isVisible]);

  return <div ref={glowRef} className={`${styles.cursorGlow} ${isVisible ? styles.visible : ""}`} />;
};

export default CursorGlow;
