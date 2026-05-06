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

export default function LandingPage({ isAuthenticated = false }) {
  const [filters, setFilters] = useState(initialFilters);
  const [filterOptions, setFilterOptions] = useState(null);
  const [competitions, setCompetitions] = useState([]);
  const [sidebarData, setSidebarData] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestFilters = useMemo(() => ({
    search: filters.search,
    tab: filters.tab,
    status: filters.status,
    event_type: filters.event_type,
    participation_type: filters.participation_type,
    industry: filters.industry,
    difficulty: filters.difficulty,
  }), [filters]);

  useEffect(() => { fetchLandingFilters().then(setFilterOptions).catch(console.error); }, []);
  useEffect(() => {
    setLoading(true);
    fetchCompetitions(requestFilters).then(setCompetitions).catch(console.error).finally(() => setLoading(false));
  }, [requestFilters]);
  useEffect(() => { if (isAuthenticated) fetchSidebar().then(setSidebarData).catch(console.error); }, [isAuthenticated]);

  const handleToggleFilter = (groupName, value) => {
    setFilters((prev) => {
      const exists = prev[groupName].includes(value);
      return { ...prev, [groupName]: exists ? prev[groupName].filter((v) => v !== value) : [...prev[groupName], value] };
    });
  };

  return (
    <div className="landing-page">
      <Header isAuthenticated={isAuthenticated} search={filters.search} onSearchChange={(value) => setFilters((prev) => ({ ...prev, search: value }))} />
      <div className="landing-layout">
        <FiltersSidebar filterOptions={filterOptions} filters={filters} onToggleFilter={handleToggleFilter} onReset={() => setFilters(initialFilters)} />
        <main className="landing-main">
          <h1>Active competitions</h1>
          <CompetitionTabs activeTab={filters.tab} onChange={(tab) => setFilters((prev) => ({ ...prev, tab }))} />
          {loading ? <div>Loading...</div> : (
            <div className={`competition-grid ${isAuthenticated ? 'with-sidebar' : ''}`}>
              <div className="cards-grid">
                {competitions.map((item) => <CompetitionCard key={item.id} item={item} />)}
              </div>
              {isAuthenticated && <RightSidebar data={sidebarData} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
