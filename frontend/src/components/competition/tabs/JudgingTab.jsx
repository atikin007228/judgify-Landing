<<<<<<< HEAD
import React from "react";

export default function JudgingTab({ competition }) {
  return (
    <section className="competition-panel">
      <h2 className="competition-section-title">Judging</h2>

      <div className="judging-mode-line">
        Scoring mode: <strong>{competition.judging?.mode}</strong>
      </div>

      <div className="judging-metric-list">
        {(competition.judging?.metrics || []).map((metric) => (
          <div key={metric.label} className="judging-metric-item">
            <div>{metric.label}</div>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>
    </section>
=======
import React, { useEffect, useState } from "react";

export default function JudgingTab({ competitionId }) {
  const [judging, setJudging] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadJudging() {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/api/competitions/${competitionId}/judging/`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load judging");
        }

        const data = await response.json();

        if (isMounted) {
          setJudging(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadJudging();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  if (loading) {
    return <div className="competition-tab-state">Loading judging...</div>;
  }

  if (!judging) {
    return <div className="competition-tab-state">No judging data available.</div>;
  }

  return (
    <div className="judging-tab">
      <section className="judging-card">
        <h3>
          Judging Statistics{" "}
          <span className="judging-mode-label">
            ({judging.mode === "team" ? "Team" : "Individual"})
          </span>
        </h3>

        <div className="judging-metrics">
          {judging.metrics?.map((metric) => (
            <div key={metric.label} className="judging-metric-item">
              <div className="judging-metric-label">{metric.label}</div>
              <div className="judging-metric-value">{metric.value}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
  );
}