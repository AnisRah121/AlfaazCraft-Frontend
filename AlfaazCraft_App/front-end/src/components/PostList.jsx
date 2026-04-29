import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/api";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      const data = res?.data ?? res;
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this story permanently?")) return;
    try {
      setDeletingId(id);
      await deletePost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Failed to delete post.");
      loadPosts();
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  /* ── Loading ── */
  if (loading) return (
    <div className="text-center py-5">
      <div className="ac-spinner mb-3" />
      <p style={{ color: "var(--ac-muted)", fontStyle: "italic" }}>Loading stories…</p>
    </div>
  );

  /* ── Error ── */
  if (error) return (
    <div className="alert d-flex flex-column align-items-center gap-2"
      style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "10px", color: "var(--ac-rust)" }}>
      <span>⚠️ {error}</span>
      <button type="button" className="btn btn-sm"
        style={{ background: "var(--ac-rust)", color: "white", borderRadius: "6px" }}
        onClick={loadPosts}>
        Try Again
      </button>
    </div>
  );

  /* ── Empty ── */
  if (!posts.length) return (
    <div className="text-center py-5"
      style={{ background: "white", borderRadius: "16px", border: "2px dashed var(--ac-parchment)" }}>
      <div style={{ fontSize: "2.5rem" }}>✍️</div>
      <h3 className="mt-3 mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "var(--ac-ink)" }}>
        No stories yet
      </h3>
      <p style={{ color: "var(--ac-muted)" }} className="mb-3">Be the first to craft something beautiful.</p>
      <Link to="/create" className="btn-ac-edit text-decoration-none">Write First Post →</Link>
    </div>
  );

  /* ── Post Cards ── */
  const delayClasses = ["delay-1", "delay-2", "delay-3", "delay-4", "delay-5"];

  return (
    <div className="d-flex flex-column gap-4">
      {posts.map((post, i) => (
        <article
          key={post.id}
          className={`ac-post-card ${delayClasses[i % 5]}`}
        >
          {/* Top meta */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="ac-badge-story">Story #{i + 1}</span>
            <span className="ac-author">✍️ {post.author}</span>
          </div>

          {/* Gold bar */}
          <div className="ac-gold-bar mb-3" />

          {/* Title */}
          <h2 className="ac-post-title mb-2">{post.title}</h2>

          {/* Content preview */}
          <p className="ac-post-content mb-0">{post.content}</p>

          {/* Actions */}
          <div className="ac-card-footer d-flex justify-content-between align-items-center">
            <Link to={`/edit/${post.id}`} className="btn-ac-edit text-decoration-none">
              ✏️ Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(post.id)}
              disabled={deletingId === post.id}
              className="btn-ac-delete"
            >
              {deletingId === post.id ? "Deleting…" : "🗑️ Delete"}
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PostList;