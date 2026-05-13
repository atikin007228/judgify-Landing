import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const roleLabels = {
  participant: "Participant",
  judge: "Judge",
  organizer: "Organizer",
};

const defaultCompetitions = [
  { title: "Frontend UI Sprint", status: "Registered", role: "Participant" },
  { title: "AI Challenge: Object Detection", status: "Saved", role: "Participant" },
  { title: "Cybersecurity CTF", status: "Judging application", role: "Judge" },
];

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [draft, setDraft] = useState(() => ({
    displayName: user?.displayName || "",
    email: user?.email || "",
    primaryRole: user?.primaryRole || "participant",
    country: user?.country || "Ukraine",
    organization: user?.organization || "",
    bio: user?.bio || "",
    skillsText: (user?.skills || []).join(", "),
    interestsText: (user?.interests || []).join(", "),
    github: user?.links?.github || "",
    linkedin: user?.links?.linkedin || "",
    website: user?.links?.website || "",
  }));

  const stats = useMemo(
    () => [
      { label: "Saved", value: 6 },
      { label: "Applications", value: 2 },
      { label: "Judging", value: user?.primaryRole === "judge" ? 3 : 1 },
      { label: "Organized", value: user?.primaryRole === "organizer" ? 4 : 0 },
    ],
    [user?.primaryRole]
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const setField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const saveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      displayName: draft.displayName,
      email: draft.email,
      primaryRole: draft.primaryRole,
      country: draft.country,
      organization: draft.organization,
      bio: draft.bio,
      skills: draft.skillsText.split(",").map((item) => item.trim()).filter(Boolean),
      interests: draft.interestsText.split(",").map((item) => item.trim()).filter(Boolean),
      links: {
        github: draft.github,
        linkedin: draft.linkedin,
        website: draft.website,
      },
    });
  };

  return (
    <div className="profile-page">
      <Header />

      <main className="profile-shell">
        <section className="profile-hero-card">
          <div className="profile-avatar-large">
            {(user?.displayName || user?.username || "U").slice(0, 1).toUpperCase()}
          </div>

          <div className="profile-hero-main">
            <div className="profile-kicker">Judgify profile</div>
            <h1>{user?.displayName || user?.username}</h1>
            <p>
              Personal space for saved competitions, participant applications,
              judge requests and organizer configuration.
            </p>
            <div className="profile-tags">
              <span>{roleLabels[user?.primaryRole] || "Participant"}</span>
              <span>{user?.country || "Ukraine"}</span>
              {user?.organization && <span>{user.organization}</span>}
            </div>
          </div>

          <button className="secondary-btn profile-logout-btn" onClick={logout}>
            Logout
          </button>
        </section>

        <section className="profile-stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="profile-stat-card">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <div className="profile-content-grid">
          <aside className="profile-side-card">
            <button className={`profile-tab-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
            <button className={`profile-tab-btn ${activeTab === "edit" ? "active" : ""}`} onClick={() => setActiveTab("edit")}>Edit profile</button>
            <button className={`profile-tab-btn ${activeTab === "organizer" ? "active" : ""}`} onClick={() => setActiveTab("organizer")}>Organizer space</button>
          </aside>

          <section className="profile-main-card">
            {activeTab === "overview" && (
              <div>
                <h2>Account overview</h2>
                <p className="profile-muted">
                  The page separates public profile data from operational role blocks.
                  Later these blocks can be connected to real participant, judge and organizer APIs.
                </p>

                <div className="profile-info-grid">
                  <div><span>Email</span><strong>{user?.email || "not specified"}</strong></div>
                  <div><span>Primary role</span><strong>{roleLabels[user?.primaryRole] || "Participant"}</strong></div>
                  <div><span>Skills</span><strong>{(user?.skills || []).join(", ") || "not specified"}</strong></div>
                  <div><span>Interests</span><strong>{(user?.interests || []).join(", ") || "not specified"}</strong></div>
                </div>

                <h3>Activity</h3>
                <div className="profile-activity-list">
                  {defaultCompetitions.map((item) => (
                    <div className="profile-activity-item" key={item.title}>
                      <div><strong>{item.title}</strong><span>{item.role}</span></div>
                      <span className="profile-status-pill">{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "edit" && (
              <form className="profile-form" onSubmit={saveProfile}>
                <h2>Edit profile</h2>

                <div className="profile-form-grid">
                  <div className="form-field"><label>Display name</label><input value={draft.displayName} onChange={(e) => setField("displayName", e.target.value)} /></div>
                  <div className="form-field"><label>Email</label><input type="email" value={draft.email} onChange={(e) => setField("email", e.target.value)} /></div>
                  <div className="form-field"><label>Primary role</label><select value={draft.primaryRole} onChange={(e) => setField("primaryRole", e.target.value)}><option value="participant">Participant</option><option value="judge">Judge</option><option value="organizer">Organizer</option></select></div>
                  <div className="form-field"><label>Country</label><input value={draft.country} onChange={(e) => setField("country", e.target.value)} /></div>
                  <div className="form-field"><label>Organization</label><input value={draft.organization} onChange={(e) => setField("organization", e.target.value)} /></div>
                  <div className="form-field"><label>Skills</label><input value={draft.skillsText} onChange={(e) => setField("skillsText", e.target.value)} placeholder="React, Python, UI/UX" /></div>
                </div>

                <div className="form-field"><label>Interests</label><input value={draft.interestsText} onChange={(e) => setField("interestsText", e.target.value)} placeholder="AI, Design, Cybersecurity" /></div>
                <div className="form-field"><label>Bio</label><textarea value={draft.bio} onChange={(e) => setField("bio", e.target.value)} placeholder="Short public profile description" /></div>

                <div className="profile-form-grid">
                  <div className="form-field"><label>GitHub</label><input value={draft.github} onChange={(e) => setField("github", e.target.value)} /></div>
                  <div className="form-field"><label>LinkedIn</label><input value={draft.linkedin} onChange={(e) => setField("linkedin", e.target.value)} /></div>
                  <div className="form-field"><label>Website</label><input value={draft.website} onChange={(e) => setField("website", e.target.value)} /></div>
                </div>

                <button className="primary-btn profile-save-btn" type="submit">Save profile</button>
              </form>
            )}

            {activeTab === "organizer" && (
              <div>
                <h2>Organizer space</h2>
                <p className="profile-muted">
                  This block is prepared for the next stage: competition configurator,
                  organizer dashboard, jury management and monitoring of submissions.
                </p>

                <div className="organizer-action-grid">
                  <button className="organizer-action-card">Create competition</button>
                  <button className="organizer-action-card">Configure rounds</button>
                  <button className="organizer-action-card">Manage jury</button>
                  <button className="organizer-action-card">View submissions</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
