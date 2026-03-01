import { useEffect, useId, useRef, type ReactNode } from "react";

export function Modal(props: {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        props.onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    // Best-effort focus for keyboard users (no focus trap).
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [props.onClose]);

  return (
    <div
      className="app-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          props.onClose();
        }
      }}
    >
      <div
        ref={panelRef}
        className="app-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="app-modal-header">
          <h2 id={titleId} className="app-modal-title">
            {props.title}
          </h2>
        </div>

        <div className="app-modal-body">{props.children}</div>

        {props.footer && <div className="app-modal-footer">{props.footer}</div>}
      </div>
    </div>
  );
}
