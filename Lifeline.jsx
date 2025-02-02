export default function Lifeline({ usedFiftyFifty, onFiftyFifty }) {
  return (
    <button onClick={onFiftyFifty} disabled={usedFiftyFifty}>
      50-50
    </button>
  );
}