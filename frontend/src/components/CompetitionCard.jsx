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
<<<<<<< HEAD

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
=======
  return map[status] || status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusClass(status) {
  return `status-badge status-${status.replace("_", "-")}`;
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
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

<<<<<<< HEAD
function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
      className={`card-heart-icon ${filled ? "filled" : ""}`}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
=======
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
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
    </svg>
  );
}

export default function CompetitionCard({ item, onSavedChange }) {
  const navigate = useNavigate();
<<<<<<< HEAD

=======
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
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
<<<<<<< HEAD

  const uiStatus =
    item.status === "active" && isTimerExpired
      ? "finished"
      : item.status;

  const isDanger =
    remainingMs !== null &&
    remainingMs > 0 &&
    remainingMs <= 5 * 60 * 1000;

  const openCompetition = () => {
    navigate(`/competitions/${item.id}`, {
      state: {
        competition: {
          ...item,
          status: uiStatus,
        },
      },
    });
=======
  const uiStatus = item.status === "active" && isTimerExpired ? "finished" : item.status;
  const isDanger = remainingMs !== null && remainingMs > 0 && remainingMs <= 5 * 60 * 1000;

  const openCompetition = () => {
    navigate(`/competitions/${item.id}`);
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
  };

  const handleSavedClick = async (e) => {
    e.stopPropagation();
<<<<<<< HEAD

=======
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
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
<<<<<<< HEAD
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle saved state");
      }

      if (onSavedChange) {
        onSavedChange(item.id, nextSaved);
      }
=======
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Failed to toggle saved");
      if (onSavedChange) onSavedChange(item.id, nextSaved);
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
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
<<<<<<< HEAD
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openCompetition();
        }
      }}
    >
      <div
        className="card-cover"
        style={
          item.cover_image
            ? { backgroundImage: `url(${item.cover_image})` }
            : undefined
        }
=======
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openCompetition()}
    >
      <div
        className="card-cover"
        style={item.cover_image ? { backgroundImage: `url(${item.cover_image})` } : undefined}
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
      >
        {item.status !== "archived" && remainingMs !== null && (
          <div className={`card-timer ${isDanger ? "danger" : ""}`}>
            {formatRemaining(remainingMs)}
          </div>
        )}
<<<<<<< HEAD

=======
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
        <button
          type="button"
          className={`card-bookmark-btn ${saved ? "saved" : ""}`}
          onClick={handleSavedClick}
<<<<<<< HEAD
          aria-label={saved ? "Remove from saved" : "Save competition"}
          title={saved ? "Remove from saved" : "Save competition"}
          disabled={saving}
=======
          disabled={saving}
          aria-label={saved ? "Remove from saved" : "Save competition"}
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-name-row">
          <div className="card-name">{item.name}</div>
<<<<<<< HEAD
          {item.industry && (
            <span className="card-industry-tag">{item.industry}</span>
          )}
        </div>

        <div className="card-round">
          Round: {item.current_round}/{item.total_rounds}
        </div>

=======
          {item.industry && <span className="card-industry-tag">{item.industry}</span>}
        </div>
        
        <div className="card-round">
          Round: {item.current_round}/{item.total_rounds}
        </div>
        
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
        {item.short_description && (
          <div className="card-description">{item.short_description}</div>
        )}
      </div>

      <div className="card-footer">
<<<<<<< HEAD
        <span>👤 {item.participants_count} participants</span>
=======
        <span className="participants-count">
          {item.participants_count} participants
        </span>
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
        <span className={getStatusClass(uiStatus)}>
          {getStatusLabel(uiStatus)}
        </span>
      </div>
    </div>
  );
}