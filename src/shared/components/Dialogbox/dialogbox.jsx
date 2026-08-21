import { useContext } from "react";
import "./dialogbox.css";
import { DialogBoxContext } from "../../contexts/dialogContext";
import { CartProvider } from "../../contexts/cartContext";

export default function Dialog() {
  const { dialogState,dispatchDialog } = useContext(DialogBoxContext);
  const { cart,dispatch } = useContext(CartProvider);
  if (!dialogState.open) return null;

  const confirm = () => {
    if (dialogState.onConfirm) {
      dialogState.onConfirm();
    }

    dispatchDialog({
      type: "CLOSE_DIALOG",
    });
  };

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

          <button
            className="confirm-btn"
            onClick={() => confirm()}
          >
            Confirm
          </button>

        </div>
      </div>
    </div>
  );
}
