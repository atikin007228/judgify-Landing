import React, { useEffect, useState } from "react";

export default function ResultsTab({ competitionId }) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/api/competitions/${competitionId}/results/`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load results");
        }

        const data = await response.json();

        if (isMounted) {
          setResults(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadResults();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  if (loading) {
    return <div className="competition-tab-state">Loading results...</div>;
  }

  if (!results) {
    return <div className="competition-tab-state">No results available.</div>;
  }

  return (
    <div className="results-tab">
      <section className="results-card">
        <h3>Round History</h3>

        <div className="round-history-list">
          {results.round_history?.map((round) => (
            <div key={round.round} className="round-history-item">
              <div>Round {round.round}</div>
              <div>Leader: {round.leader}</div>
              <div>Top score: {round.top_score}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="results-card">
        <h3>Leaderboard</h3>

        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.leaderboard?.map((entry) => (
              <tr key={`${entry.rank}-${entry.name}`}>
                <td>{entry.rank}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}