export default function Hint({ hint, showHint, setShowHint, usedHint, setUsedHint }) {
  const handleHintClick = () => {
    if (!usedHint) {
      setShowHint(true);
      setUsedHint(true);
    }
  };

  return (
    <div className="hint-section">
      <button onClick={handleHintClick} disabled={usedHint}>
        Hint
      </button>
      {showHint && <div className="hint-text">{hint}</div>}
    </div>
  );
}