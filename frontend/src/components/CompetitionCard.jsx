import React, { useEffect, useMemo, useState } from "react";

function getStatusLabel(status) {
  const map = {
    active: "Online",
    finished: "Finished",
    judging: "Judging",
    archived: "Archived",
    registration_open: "Registration open",
    upcoming: "Upcoming",
  };

  return map[status] || status;
}

function getStatusClass(status) {
  const map = {
    active: "status-active",
    finished: "status-finished",
    judging: "status-judging",
    archived: "status-archived",
    registration_open: "status-registration-open",
    upcoming: "status-upcoming",
  };

  return map[status] || "status-default";
}

function formatRemaining(ms) {
  if (ms === null || ms === undefined) return "No timer";
  if (ms <= 0) return "00:00:00";

  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

export default function CompetitionCard({ item }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const remainingMs = useMemo(() => {
    if (!item.timer_deadline) return null;
    return new Date(item.timer_deadline).getTime() - now;
  }, [item.timer_deadline, now]);

  const isDanger =
    remainingMs !== null &&
    remainingMs > 0 &&
    remainingMs <= 5 * 60 * 1000;

  return (
    <div className="competition-card">
      <div
        className="card-cover"
        style={
          item.cover_image
            ? { backgroundImage: `url(${item.cover_image})` }
            : undefined
        }
      >
        <div className={`card-timer ${isDanger ? "danger" : ""}`}>
          {formatRemaining(remainingMs)}
        </div>
      </div>

      <div className="card-body">
        <div className="card-name">{item.name}</div>
        <div className="card-round">
          Round: {item.current_round}/{item.total_rounds}
        </div>
      </div>

      <div className="card-footer">
        <span>👤 {item.participants_count} participants</span>
        <span className={getStatusClass(item.status)}>
          {getStatusLabel(item.status)}
        </span>
      </div>
    </div>
  );
}