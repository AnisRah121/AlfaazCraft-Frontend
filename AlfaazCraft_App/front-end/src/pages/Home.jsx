import PostList from "../components/PostList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: "var(--ac-cream)" }}>

      {/* ── Navbar ── */}
      <nav className="navbar ac-navbar px-0">
        <div className="container-fluid d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center gap-2">
            <div className="ac-logo-box">A</div>
            <span className="ac-brand-bold">
              Alfaaz<span className="ac-brand-italic">Craft</span>
            </span>
            <span className="ac-tagline d-none d-md-inline ms-2">The Art of Words</span>
          </div>
          <Link to="/create" className="btn-ac-gold">
            + New Post
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="ac-hero">
        <div className="ac-hero-ring1" />
        <div className="ac-hero-ring2" />
        <div className="container">
          <p className="ac-eyebrow mb-2">✦ A Literary Space ✦</p>
          <h1 className="ac-hero-title mb-3">
            Where Every Word<br />
            <span>Finds Its Craft</span>
          </h1>
          <p className="ac-hero-sub mb-4">
            Curated stories, honest reflections, and words worth reading.
          </p>
          <Link to="/create" className="btn-ac-outline-gold">
            Begin Writing →
          </Link>
        </div>
      </div>

      {/* ── Posts Section ── */}
      <div className="container-lg py-5 flex-grow-1">
        <div className="d-flex align-items-center gap-3 mb-4">
          <div>
            <p className="ac-section-label mb-1">Latest</p>
            <h2 className="ac-section-title mb-0">Recent Stories</h2>
          </div>
          <div className="ac-divider-line" />
        </div>
        <PostList />
      </div>

      {/* ── Footer ── */}
      <footer className="ac-footer">
        <div className="ac-footer-brand">AlfaazCraft</div>
        <p className="ac-footer-copy mb-0">
          © {new Date().getFullYear()} · Crafted with words &amp; passion
        </p>
      </footer>

    </div>
  );
}

export default Home;