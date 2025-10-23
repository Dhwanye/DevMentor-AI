import { useState } from "react";

export default function CodeInput({ onAnalyze }) {
  const [code, setCode] = useState("");

  const handleAnalyze = () => {
    if (code.trim() === "") return;
    onAnalyze(code);
  };

  return (
    <div className="code-panel">
      <textarea
        placeholder="Paste your code snippet here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze Code</button>
    </div>
  );
}
