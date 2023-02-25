import { useCallback, useEffect } from "react";
import "./Modal.css";

export function Modal(props) {
  const { onClose } = props;
  const closeOnEscapeKeyDown = useCallback(
    (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  /*
   */

  return (
    <div
      onClick={props.onClose}
      className={`modal ${props.show ? "show" : ""}`}
    >
      <div onClick={(e) => e.stopPropagation()} className="modalContent">
        <div className="modalBody">{props.children}</div>
        <div className="modalFooter">
          <button onClick={props.onClose} className="button">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
