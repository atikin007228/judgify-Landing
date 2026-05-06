import React from "react";

export default function CompetitionHeader({ competition, onJoin }) {
  return (
    <section className="competition-header">
      <div
        className="competition-header-cover"
        style={{
          backgroundImage: competition.cover_image
            ? `url(${competition.cover_image})`
            : undefined,
        }}
      />

      <div className="competition-header-content">
        <div className="competition-header-meta">
          <span className="competition-chip">{competition.status_label || competition.status}</span>
          {competition.industry && (
            <span className="competition-chip">{competition.industry}</span>
          )}
          {competition.difficulty && (
            <span className="competition-chip">{competition.difficulty}</span>
          )}
        </div>

        <h1 className="competition-header-title">{competition.name}</h1>

        {competition.short_description && (
          <p className="competition-header-description">
            {competition.short_description}
          </p>
        )}

        <div className="competition-header-actions">
          <button
            type="button"
            className="join-competition-main-btn"
            onClick={onJoin}
          >
            Join Competition
          </button>
        </div>
      </div>
    </section>
  );
}