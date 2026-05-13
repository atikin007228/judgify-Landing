import React from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "participants", label: "Participants" },
  { id: "results", label: "Results" },
  { id: "judging", label: "Judging" },
];

export default function CompetitionTabs({ activeTab, onTabChange }) {
  return (
<<<<<<< HEAD
    <div className="competition-detail-tabs">
=======
    <div className="competition-tabs">
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
<<<<<<< HEAD
          className={`competition-detail-tab-btn ${
=======
          className={`competition-tab-btn ${
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
            activeTab === tab.id ? "active" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}