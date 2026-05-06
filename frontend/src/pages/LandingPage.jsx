import React, { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import FiltersSidebar from '../components/FiltersSidebar';
import CompetitionTabs from '../components/CompetitionTabs';
import CompetitionCard from '../components/CompetitionCard';
import RightSidebar from '../components/RightSidebar';
import { fetchCompetitions, fetchLandingFilters, fetchSidebar } from '../api/landingApi';

const initialFilters = {
  search: '',
  tab: 'trending',
  status: ['active'],
  event_type: [],
  participation_type: ['team'],
  industry: ['programming'],
  difficulty: ['mixed'],
};
import {
  fetchCompetitions,
  fetchLandingFilters,
  fetchSidebar,
} from "../api/landingApi";

import { useAuth } from "../context/AuthContext";

const initialFilters = {
  search: "",
  tab: "trending",
  status: [],
  event_type: [],
  participation_type: [],
  industry: [],
  difficulty: [],
};

export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user ?? null;
  const login = auth?.login ?? (() => {});

  const isAuthenticated = Boolean(user);
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, setFilterOptions] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [sidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState(null);

  const requestFilters = useMemo(() => ({
    search: filters.search,
    tab: filters.tab,
    status: filters.status,
    event_type: filters.event_type,
    participation_type: filters.participation_type,
    industry: filters.industry,
    difficulty: filters.difficulty,
  }), [filters]);

  useEffect(() => {
    fetchLandingFilters().then(setFilterOptions).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchCompetitions(requestFilters)
      .then(setCompetitions)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [requestFilters]);

  useEffect(() => {
    if (!isAuthenticated) {
      setSidebarData(null);
      return;
    }
    fetchSidebar().then(setSidebarData).catch(console.error);
  }, [isAuthenticated]);

  const handleToggleFilter = (groupName, value) => {
    setFilters((prev) => {
      const exists = prev[groupName].includes(value);
      return {
        ...prev,
        [groupName]: exists
          ? prev[groupName].filter((v) => v !== value)
          : [...prev[groupName], value],
      };
    });
  };

  const handleReset = () => setFilters(initialFilters);
  const handleOpenSignUp = () => setAuthStep("signup");
  const handleCloseSignUp = () => setAuthStep(null);
  const handleOpenSignIn = () => alert("Sign In modal will be implemented next.");
  const handleSignUpComplete = () => setAuthStep("onboard");

  const handleFinishOnboarding = (data) => {
    login({
      id: 1,
      displayName: "Stan",
      interests: data?.interests || [],
      createTeam: data?.createTeam || false,
    });
    setAuthStep(null);
    navigate("/profile");
  };

  return (
    <div className="landing-page">
      <Header
        isAuthenticated={isAuthenticated}
        search={filters.search}
        onSearchChange={(value) => setFilters((prev) => ({ ...prev, search: value }))}
        onOpenSignUp={handleOpenSignUp}
        onOpenSignIn={handleOpenSignIn}
      />

      <div className="landing-layout">
        <FiltersSidebar
          filterOptions={filterOptions}
          filters={filters}
          onToggleFilter={handleToggleFilter}
          onReset={handleReset}
        />

        <main className="landing-main">
          <h1>Active competitions</h1>
          <CompetitionTabs
            activeTab={filters.tab}
            onChange={(tab) => setFilters((prev) => ({ ...prev, tab }))}
          />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className={`competition-grid ${isAuthenticated ? "with-sidebar" : ""}`}>
              <div className="cards-grid">
                {competitions.map((item) => (
                  <CompetitionCard key={item.id} item={item} />
                ))}
              </div>
              {isAuthenticated && <RightSidebar data={sidebarData} />}
            </div>
          )}
        </main>
      </div>

      {authStep === "signup" && (
        <SignUpModal
          isOpen={true}
          onClose={handleCloseSignUp}
          onOpenSignIn={handleOpenSignIn}
          onComplete={handleSignUpComplete}
        />
      )}

      {authStep === "onboard" && (
        <OnboardModal onFinish={handleFinishOnboarding} />
      )}
    </div>
  );
}