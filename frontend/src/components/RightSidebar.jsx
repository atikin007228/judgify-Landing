import React, { useState } from "react";
import { toggleSavedCompetition } from "../api/savedApi";

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

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      className="card-heart-icon filled"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function BannerItem({ item }) {
  return (
    <div className="last-competition-banner">
      <div
        className="last-competition-banner-cover"
        style={
          item.cover_image
            ? { backgroundImage: `url(${item.cover_image})` }
            : undefined
        }
      />
      <div className="last-competition-banner-content">
        <div className="last-competition-banner-name">{item.name}</div>
        <div className="last-competition-banner-meta">
          <span>👤 {item.participants_count}</span>
          <span>💬 {item.comments_count}</span>
          <span className={getStatusClass(item.status)}>
            {getStatusLabel(item.status)}
          </span>
        </div>
      </div>
    </div>
  );
}

function SavedCard({ item, onSavedChange }) {
  const [saving, setSaving] = useState(false);

  const handleRemove = async () => {
    if (saving) return;
    setSaving(true);

    try {
      await toggleSavedCompetition(item.id, false);
      onSavedChange?.(item.id, false, item);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="sidebar-card">
      <div
        className="sidebar-card-cover"
        style={
          item.cover_image
            ? { backgroundImage: `url(${item.cover_image})` }
            : undefined
        }
      />
      <div className="sidebar-card-info">
        <div className="sidebar-card-name-row">
          <div className="sidebar-card-name">{item.name}</div>
          <button
            type="button"
            className="sidebar-heart-btn saved"
            onClick={handleRemove}
            aria-label="Remove from saved"
            title="Remove from saved"
            disabled={saving}
          >
            <HeartIcon />
          </button>
        </div>
        <div className="sidebar-card-meta">
          <span>👤 {item.participants_count}</span>
          <span>💬 {item.comments_count}</span>
          <span className={getStatusClass(item.status)}>
            {getStatusLabel(item.status)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RightSidebar({ data, onSavedChange }) {
  if (!data) return null;

  return (
    <aside className="right-sidebar">
      <section className="right-panel-block">
        <h3>Last Competitions</h3>
        <div className="last-competitions-list">
          {data.last_competitions.map((item) => (
            <BannerItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="right-panel-block">
        <h3>Saved</h3>
        <div className="sidebar-list">
          {data.saved_competitions.length === 0 ? (
            <div className="sidebar-empty">No saved competitions yet.</div>
          ) : (
            data.saved_competitions.map((item) => (
              <SavedCard
                key={item.id}
                item={item}
                onSavedChange={onSavedChange}
              />
            ))
          )}
        </div>
      </section>
    </aside>
  );
}
