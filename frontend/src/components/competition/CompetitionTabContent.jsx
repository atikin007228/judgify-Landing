import React from "react";
import OverviewTab from "./tabs/OverviewTab";
import ParticipantsTab from "./tabs/ParticipantsTab";
import ResultsTab from "./tabs/ResultsTab";
import JudgingTab from "./tabs/JudgingTab";

<<<<<<< HEAD
export default function CompetitionTabContent({
  activeTab,
  competition,
  commentText,
  onCommentTextChange,
  onCommentPost,
}) {
  if (activeTab === "participants") {
    return <ParticipantsTab competition={competition} />;
  }

  if (activeTab === "results") {
    return <ResultsTab competition={competition} />;
  }

  if (activeTab === "judging") {
    return <JudgingTab competition={competition} />;
  }

  return (
    <OverviewTab
      competition={competition}
      commentText={commentText}
      onCommentTextChange={onCommentTextChange}
      onCommentPost={onCommentPost}
    />
  );
=======
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
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
}