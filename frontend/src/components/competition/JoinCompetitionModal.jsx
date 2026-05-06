import React, { useState } from "react";

const roles = [
  { id: "participant", label: "Participant" },
  { id: "team", label: "Team" },
  { id: "observer", label: "Observer" },
];

export default function JoinCompetitionModal({ competitionId, onClose }) {
  const [selectedRole, setSelectedRole] = useState("participant");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const response = await fetch(
        `http://localhost:8000/api/competitions/${competitionId}/join/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: selectedRole,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to join competition");
      }

      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="join-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Join Competition</h2>
        <p>Select your role before joining this competition.</p>

        <div className="join-role-list">
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              className={`join-role-btn ${
                selectedRole === role.id ? "active" : ""
              }`}
              onClick={() => setSelectedRole(role.id)}
            >
              {role.label}
            </button>
          ))}
        </div>

        <div className="join-modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}