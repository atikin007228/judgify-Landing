import React from "react";
import OverviewTab from "./tabs/OverviewTab";
import ParticipantsTab from "./tabs/ParticipantsTab";
import ResultsTab from "./tabs/ResultsTab";
import JudgingTab from "./tabs/JudgingTab";

export default function CompetitionTabContent({ activeTab, competitionId }) {
  if (activeTab === "participants") {
    return <ParticipantsTab competitionId={competitionId} />;
  }

  if (activeTab === "results") {
    return <ResultsTab competitionId={competitionId} />;
  }

  if (activeTab === "judging") {
    return <JudgingTab competitionId={competitionId} />;
  }

  return <OverviewTab competitionId={competitionId} />;
}