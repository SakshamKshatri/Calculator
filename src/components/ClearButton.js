import { ACTIONS } from "./Body";

export default function ClearButton({ className, dispatch }) {
  return (
    <button
      className={className}
      onClick={() => dispatch({type: ACTIONS.CLEAR})}
    >
      C
    </button>
  );
}
