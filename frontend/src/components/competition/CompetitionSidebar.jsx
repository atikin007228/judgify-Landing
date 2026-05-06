import React from "react";

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
          <strong>
            {competition.current_round}/{competition.total_rounds}
          </strong>
        </div>

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
      </section>
    </div>
  );
}