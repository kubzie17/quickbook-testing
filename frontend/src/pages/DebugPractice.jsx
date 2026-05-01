import { useState } from "react";

export default function DebugPractice() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  function increaseCount() {
    setCount(count + 2);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div>
      <h2>Debug Practice</h2>
      <p>This page is used for debugging Cypress and frontend failures.</p>

      <p data-testid="count-value">Count: {count}</p>
      <button data-testid="increase-count" onClick={increaseCount}>
        Increase
      </button>
      <button data-testid="reset-count" onClick={resetCount}>
        Reset
      </button>

      <div>
        <label>Name</label>
        <br />
        <input
          data-testid="debug-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      {name && <p data-testid="name-output">Hello, {name}</p>}
    </div>
  );
}
