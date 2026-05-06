import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function getStatusLabel(status) {
  const map = {
    active: "Online",
    finished: "Finished",
    judging: "Judging",
    archived: "Archived",
    registration_open: "Registration open",
    upcoming: "Upcoming",
  };
  return map[status] || status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusClass(status) {
  return `status-badge status-${status.replace("_", "-")}`;
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

function HeartIcon({ filled }) {
  return (
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

export default function CompetitionCard({ item, onSavedChange }) {
  const navigate = useNavigate();
  const [now, setNow] = useState(Date.now());
  const [saved, setSaved] = useState(Boolean(item.is_saved));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setSaved(Boolean(item.is_saved));
  }, [item.is_saved]);

  const remainingMs = useMemo(() => {
    if (!item.timer_deadline) return null;
    return new Date(item.timer_deadline).getTime() - now;
  }, [item.timer_deadline, now]);

  const isTimerExpired = remainingMs !== null && remainingMs <= 0;
  const uiStatus = item.status === "active" && isTimerExpired ? "finished" : item.status;
  const isDanger = remainingMs !== null && remainingMs > 0 && remainingMs <= 5 * 60 * 1000;

  const openCompetition = () => {
    navigate(`/competitions/${item.id}`);
  };

  const handleSavedClick = async (e) => {
    e.stopPropagation();
    if (saving) return;

    const nextSaved = !saved;
    setSaved(nextSaved);
    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/competitions/${item.id}/save/`,
        {
          method: nextSaved ? "POST" : "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to toggle saved");
      if (onSavedChange) onSavedChange(item.id, nextSaved);
    } catch (error) {
      console.error(error);
      setSaved(!nextSaved);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="competition-card competition-card--interactive"
      onClick={openCompetition}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openCompetition()}
    >
      <div
        className="card-cover"
        style={item.cover_image ? { backgroundImage: `url(${item.cover_image})` } : undefined}
      >
        {item.status !== "archived" && remainingMs !== null && (
          <div className={`card-timer ${isDanger ? "danger" : ""}`}>
            {formatRemaining(remainingMs)}
          </div>
        )}
        <button
          type="button"
          className={`card-bookmark-btn ${saved ? "saved" : ""}`}
          onClick={handleSavedClick}
          disabled={saving}
          aria-label={saved ? "Remove from saved" : "Save competition"}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-name-row">
          <div className="card-name">{item.name}</div>
          {item.industry && <span className="card-industry-tag">{item.industry}</span>}
        </div>
        
        <div className="card-round">
          Round: {item.current_round}/{item.total_rounds}
        </div>
        
        {item.short_description && (
          <div className="card-description">{item.short_description}</div>
        )}
      </div>

      <div className="card-footer">
        <span className="participants-count">
          {item.participants_count} participants
        </span>
        <span className={getStatusClass(uiStatus)}>
          {getStatusLabel(uiStatus)}
        </span>
      </div>
    </div>
  );
}