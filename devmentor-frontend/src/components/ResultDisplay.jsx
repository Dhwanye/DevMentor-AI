export default function ResultDisplay({ result }) {
  return (
    <div className="feedback-panel">
      <div className="result-box">
        {result || "Your AI feedback will appear here."}
      </div>
    </div>
  );
}
