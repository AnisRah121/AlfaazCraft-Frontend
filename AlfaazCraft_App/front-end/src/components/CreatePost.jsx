import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.title.trim() || !post.content.trim() || !post.author.trim()) {
      setError("All fields are required.");
      return;
    }
    try {
      setSubmitting(true);
      await createPost(post);
      navigate("/");
    } catch {
      setError("Failed to publish. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--ac-cream)" }}>

      {/* Navbar */}
      <nav className="navbar ac-navbar px-4 w-100">
        <div className="container-fluid d-flex justify-content-between align-items-center w-100">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <div className="ac-logo-box">A</div>
            <span className="ac-brand-bold">
              Alfaaz<span className="ac-brand-italic">Craft</span>
            </span>
          </Link>
          <Link to="/" style={{ color: "var(--ac-muted)", fontSize: "0.85rem", textDecoration: "none" }}>
            ← Back to Stories
          </Link>
        </div>
      </nav>

      {/* Form */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center py-5 px-3">
        <div className="ac-form-card w-100" style={{ maxWidth: "660px" }}>

          {/* Header */}
          <div className="text-center mb-4">
            <p className="ac-eyebrow mb-2">✦ New Story ✦</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.9rem", fontWeight: 800, color: "var(--ac-ink)"
            }}>Craft Your Story</h2>
            <div className="ac-gold-bar mx-auto mt-2" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 text-center p-2"
              style={{ background: "#fff5f5", border: "1px solid #fca5a5", borderRadius: "8px", color: "var(--ac-rust)", fontSize: "0.88rem" }}>
              ⚠️ {error}
            </div>
          )}

          {/* Fields */}
          <div className="mb-3">
            <label className="ac-form-label">Title</label>
            <input
              name="title"
              value={post.title}
              placeholder="A compelling headline…"
              onChange={handleChange}
              className="ac-input"
            />
          </div>

          <div className="mb-3">
            <label className="ac-form-label">Content</label>
            <textarea
              name="content"
              value={post.content}
              rows="7"
              placeholder="Pour your thoughts here…"
              onChange={handleChange}
              className="ac-input"
              style={{ resize: "vertical", lineHeight: "1.7" }}
            />
          </div>

          <div className="mb-4">
            <label className="ac-form-label">Author</label>
            <input
              name="author"
              value={post.author}
              placeholder="Your name"
              onChange={handleChange}
              className="ac-input"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-ac-publish"
          >
            {submitting ? "Publishing…" : "🚀 Publish Story"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;