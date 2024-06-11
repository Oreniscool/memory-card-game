/* eslint-disable react/prop-types */
import '../styles/score.css';

export default function Score({ score, bestScore }) {
  return (
    <div className="score-section">
      <h3 className="score">current score: {score}</h3>
      <h3 className="best-score">best score: {bestScore}</h3>
    </div>
  );
}
