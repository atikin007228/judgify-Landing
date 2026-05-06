import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import CompetitionHeader from "../components/competition/CompetitionHeader";
import CompetitionSidebar from "../components/competition/CompetitionSidebar";
import CompetitionTabs from "../components/competition/CompetitionTabs";
import CompetitionTabContent from "../components/competition/CompetitionTabContent";
import JoinCompetitionModal from "../components/competition/JoinCompetitionModal";

export default function CompetitionPage() {
  const { competitionId } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [competition, setCompetition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "overview"
  );

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    const shouldOpenJoin = searchParams.get("join") === "1";
    setShowJoinModal(shouldOpenJoin);
  }, [location.search, searchParams]);

  useEffect(() => {
    let isMounted = true;

    async function loadCompetition() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:8000/api/competitions/${competitionId}/`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load competition");
        }

        const data = await response.json();

        if (isMounted) {
          setCompetition(data);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Не вдалося завантажити сторінку змагання.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCompetition();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("tab", tab);
    nextParams.delete("join");
    setSearchParams(nextParams);
  };

  const openJoinModal = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("join", "1");
    setSearchParams(nextParams);
  };

  const closeJoinModal = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("join");
    setSearchParams(nextParams);
  };

  if (loading) {
    return <div className="competition-page-state">Loading competition...</div>;
  }

  if (error) {
    return <div className="competition-page-state error">{error}</div>;
  }

  if (!competition) {
    return <div className="competition-page-state">Competition not found.</div>;
  }

  return (
    <div className="competition-page">
      <CompetitionHeader competition={competition} onJoin={openJoinModal} />

      <div className="competition-page-layout">
        <main className="competition-main">
          <CompetitionTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <CompetitionTabContent
            activeTab={activeTab}
            competitionId={competitionId}
          />
        </main>

        <aside className="competition-aside">
          <CompetitionSidebar competition={competition} />
        </aside>
      </div>

      {showJoinModal && (
        <JoinCompetitionModal
          competitionId={competitionId}
          onClose={closeJoinModal}
        />
      )}
    </div>
  );
}