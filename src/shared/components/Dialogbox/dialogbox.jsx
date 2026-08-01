import { useContext } from "react";
import "./dialogbox.css";
import { DialogBoxContext } from "../../contexts/dialogContext";

export default function Dialog() {
  const { dialogState,dispatchDialog } = useContext(DialogBoxContext);

  if (!dialogState.open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">

        <h2>{dialogState.title}</h2>

        <p>{dialogState.message}</p>

        <div className="dialog-actions">

          <button
            className="cancel-btn"
            onClick={()=>dispatchDialog({type:"CLOSE_DIALOG"})}
          >
            Cancel
          </button>

          {/* <button
            className="confirm-btn"
            onClick={() => {
              dialogState.onConfirm?.();
              closeDialog();
            }}
          >
            Confirm
          </button> */}

        </div>
      </div>
    </div>
  );
}
