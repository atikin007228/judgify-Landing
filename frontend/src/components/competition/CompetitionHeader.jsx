import React from "react";

export default function CompetitionHeader({ competition, onJoin }) {
  return (
<<<<<<< HEAD
    <section className="competition-detail-header">
      <div
        className="competition-detail-cover"
=======
    <section className="competition-header">
      <div
        className="competition-header-cover"
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
        style={{
          backgroundImage: competition.cover_image
            ? `url(${competition.cover_image})`
            : undefined,
        }}
      />

<<<<<<< HEAD
      <div className="competition-detail-title-row">
        <div>
          <h1 className="competition-detail-title">{competition.name}</h1>
          <div className="competition-detail-round">
            Round: {competition.current_round}/{competition.total_rounds}
          </div>
        </div>

        <button
          type="button"
          className="competition-join-btn"
          onClick={onJoin}
        >
          Join Competition
        </button>
=======
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
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
      </div>
    </section>
  );
}