import React from "react";

<<<<<<< HEAD
function getStatusLabel(status) {
  const map = {
    active: "Online",
    finished: "Finished",
    judging: "Judging",
    archived: "Archived",
    registration_open: "Registration Open",
    upcoming: "Upcoming",
  };

  return map[status] || status;
}

export default function CompetitionSidebar({ competition }) {
  return (
    <div className="competition-detail-sidebar">
      <section className="competition-side-block">
        <h2 className="competition-side-title">{competition.name}</h2>

        <div className="competition-status-pill">
          {getStatusLabel(competition.status)}
        </div>

        <div className="competition-side-row">
          <span>Round:</span>
=======
function formatDateTime(dateValue) {
  if (!dateValue) return "—";

  const date = new Date(dateValue);
  return date.toLocaleString();
}

export default function CompetitionSidebar({ competition }) {
  const materials = competition.materials || [];
  const plannedEvents = competition.planned_events || [];

  return (
    <div className="competition-sidebar">
      <section className="sidebar-card">
        <h3>Current Status</h3>

        <div className="sidebar-kv">
          <span>Status</span>
          <strong>{competition.status_label || competition.status}</strong>
        </div>

        <div className="sidebar-kv">
          <span>Round</span>
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
          <strong>
            {competition.current_round}/{competition.total_rounds}
          </strong>
        </div>

<<<<<<< HEAD
        <div className="competition-side-row">
          <span>{competition.participants_count} participants</span>
          <span className="competition-side-code">
            {competition.organizerCode}
          </span>
        </div>

        <div className="competition-side-separator" />

        <div className="competition-side-row">
          <span>Category:</span>
          <strong>{competition.category}</strong>
        </div>

        <div className="competition-side-row">
          <span>Dates:</span>
          <strong>{competition.datesLabel}</strong>
        </div>

        <div className="competition-side-row">
          <span>Difficulty:</span>
          <strong className="difficulty-good">
            ✔ {competition.difficulty}
          </strong>
        </div>
      </section>

      <section className="competition-side-block description">
        <p>{competition.sidebarDescription}</p>
      </section>

      <section className="competition-side-block">
        <h3 className="competition-block-heading">Upcoming event</h3>
        <div className="competition-upcoming-chip">
          {competition.upcomingText}
        </div>
      </section>

      <section className="competition-side-block">
        <h3 className="competition-block-heading">Downloads</h3>

        <div className="competition-download-list">
          {(competition.materials || []).map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="competition-download-item"
              onClick={(e) => e.preventDefault()}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
              <span>›</span>
            </a>
          ))}
        </div>
=======
        <div className="sidebar-kv">
          <span>Participants</span>
          <strong>{competition.participants_count}</strong>
        </div>

        <div className="sidebar-kv">
          <span>Next deadline</span>
          <strong>{formatDateTime(competition.timer_deadline)}</strong>
        </div>
      </section>

      <section className="sidebar-card">
        <h3>Supporting Materials</h3>

        {materials.length === 0 ? (
          <p className="sidebar-empty">No materials yet.</p>
        ) : (
          <ul className="sidebar-list">
            {materials.map((item) => (
              <li key={item.id}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="sidebar-card">
        <h3>Planned Events</h3>

        {plannedEvents.length === 0 ? (
          <p className="sidebar-empty">No planned events.</p>
        ) : (
          <ul className="sidebar-events">
            {plannedEvents.map((event) => (
              <li key={event.id} className="sidebar-event-item">
                <div className="sidebar-event-title">{event.title}</div>
                <div className="sidebar-event-time">
                  {formatDateTime(event.starts_at)}
                </div>
              </li>
            ))}
          </ul>
        )}
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
      </section>
    </div>
  );
}