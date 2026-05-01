import { useState } from "react";

export default function DebugPractice() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  function increaseCount() {
    setCount(count + 1);
    setMessage("Count increased successfully");
  }

  function resetCount() {
    setCount(0);
    setMessage("Count reset");
  }

  return (
    <div>
      <h2>Debug Practice</h2>

      <p data-testid="debug-instructions">
        Use this page to practise Cypress debugging, selector issues, and logic bugs.
      </p>

      <p data-testid="count-value">Count: {count}</p>

      <button data-testid="add-count" onClick={increaseCount}>
        Increase
      </button>

      <button data-testid="reset-count" onClick={resetCount}>
        Reset
      </button>

      {message && <p data-testid="debug-message">{message}</p>}
    </div>
  );
}
