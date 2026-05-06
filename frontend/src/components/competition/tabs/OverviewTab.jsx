import React, { useEffect, useState } from "react";

function AnnouncementComments({ comments }) {
  if (!comments || comments.length === 0) {
    return <div className="announcement-comments-empty">No comments yet.</div>;
  }

  return (
    <div className="announcement-comments">
      {comments.map((comment) => (
        <div key={comment.id} className="announcement-comment">
          <div className="announcement-comment-author">{comment.author_name}</div>
          <div className="announcement-comment-text">{comment.text}</div>
        </div>
      ))}
    </div>
  );
}

function CommentForm({ announcementId, onCommentAdded }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    try {
      setSending(true);

      const response = await fetch(
        `http://localhost:8000/api/announcements/${announcementId}/comments/`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newComment = await response.json();
      onCommentAdded(announcementId, newComment);
      setText("");
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="announcement-comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" disabled={sending}>
        Comment
      </button>
    </form>
  );
}

export default function OverviewTab({ competitionId }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadAnnouncements() {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/api/competitions/${competitionId}/announcements/`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load announcements");
        }

        const data = await response.json();

        if (isMounted) {
          setAnnouncements(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAnnouncements();

    return () => {
      isMounted = false;
    };
  }, [competitionId]);

  const handleCommentAdded = (announcementId, newComment) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === announcementId
          ? {
              ...announcement,
              comments: [...(announcement.comments || []), newComment],
            }
          : announcement
      )
    );
  };

  if (loading) {
    return <div className="competition-tab-state">Loading announcements...</div>;
  }

  return (
    <div className="overview-tab">
      {announcements.map((announcement) => (
        <article key={announcement.id} className="announcement-card">
          <div className="announcement-card-header">
            <div>
              <h3>{announcement.title}</h3>
              <div className="announcement-meta">
                {announcement.author_name} · {announcement.created_at}
              </div>
            </div>
          </div>

          <div className="announcement-card-body">
            {announcement.text}
          </div>

          <AnnouncementComments comments={announcement.comments} />

          <CommentForm
            announcementId={announcement.id}
            onCommentAdded={handleCommentAdded}
          />
        </article>
      ))}
    </div>
  );
}