import React, { useState } from "react";

const roles = [
  { id: "participant", label: "Participant" },
  { id: "team", label: "Team" },
  { id: "observer", label: "Observer" },
];

<<<<<<< HEAD
export default function JoinCompetitionModal({ competition, onClose }) {
  const [selectedRole, setSelectedRole] = useState("participant");

  const handleSubmit = () => {
    alert(`Joined "${competition.name}" as ${selectedRole}`);
    onClose();
=======
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
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
<<<<<<< HEAD
      <div className="join-modal" onClick={(e) => e.stopPropagation()}>
=======
      <div
        className="join-modal"
        onClick={(e) => e.stopPropagation()}
      >
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
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
<<<<<<< HEAD
          <button type="button" className="primary-btn" onClick={handleSubmit}>
=======
          <button
            type="button"
            className="primary-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}