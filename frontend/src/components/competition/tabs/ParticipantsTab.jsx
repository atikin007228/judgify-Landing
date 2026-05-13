<<<<<<< HEAD
import React from "react";

export default function ParticipantsTab({ competition }) {
  return (
    <section className="competition-panel">
      <h2 className="competition-section-title">Participants</h2>

      <div className="participant-list">
        {(competition.participants || []).map((participant) => (
          <div key={participant.id} className="participant-item">
            <span
              className={`participant-dot ${
                participant.isActiveNow ? "online" : "offline"
              }`}
            />
            <div className="participant-info">
              <div className="participant-name">{participant.name}</div>
              <div className="participant-role">{participant.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
=======
import React, { useEffect, useState } from "react";

export default function ParticipantsTab({ competitionId }) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadParticipants() {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/api/competitions/${competitionId}/participants/`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load participants");
        }

        const data = await response.json();

        if (isMounted) {
          setParticipants(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadParticipants();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  if (loading) {
    return <div className="competition-tab-state">Loading participants...</div>;
  }

  return (
    <div className="participants-tab">
      {participants.map((participant) => (
        <div key={participant.id} className="participant-row">
          <span
            className={`participant-status-dot ${
              participant.is_active_now ? "online" : "offline"
            }`}
          />
          <div className="participant-main">
            <div className="participant-name">{participant.name}</div>
            <div className="participant-role">{participant.role}</div>
          </div>
        </div>
      ))}
    </div>
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
  );
}