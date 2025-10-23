import { useState } from "react";
import Header from "./components/Header";
import CodeInput from "./components/CodeInput";
import ResultDisplay from "./components/ResultDisplay";
import './index.css';

function App() {
  const [result, setResult] = useState("");

  const handleAnalyze = async (code) => {
  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setResult(data.feedback);  // update ResultDisplay
  } catch (error) {
    setResult("Error: Could not fetch AI feedback.");
    console.error(error);
  }
};

  return (
    <div>
      <Header />
      <div className="container">
        <CodeInput onAnalyze={handleAnalyze} />
        <ResultDisplay result={result} />
      </div>
    </div>
  );
}

export default App;
