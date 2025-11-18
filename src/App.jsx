// src/App.jsx
import { Routes, Route, useParams, Link } from "react-router-dom";
import BlogPostList from "./components/BlogPostList.jsx";
import "./App.css";

// Sample posts from the spec
const samplePosts = [
  {
    id: "1",
    title: "Getting Started with React",
    summary:
      "Learn the basics of React and build your first application. This guide walks you through components, props, and state so you can start building interactive user interfaces with confidence.",
    date: "2023-01-01",
    url: "/posts/1",
  },
  {
    id: "2",
    title: "CSS Grid vs. Flexbox",
    summary:
      "A comparison of two powerful layout systems in CSS. Discover when to use Grid, when Flexbox shines, and how they can work together to build responsive, modern layouts.",
    date: "2023-02-15",
    url: "/posts/2",
  },
  {
    id: "3",
    title: "Accessibility in Web Development",
    summary:
      "Tips for making your web applications more accessible. Learn how semantic HTML, ARIA attributes, and keyboard navigation can improve usability for all users.",
    date: "2023-03-10",
    url: "/posts/3",
  },
];

// Home page: listing of blog posts
function HomePage() {
  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">Blog Posts</h1>
      </header>
      <BlogPostList posts={samplePosts} />
    </main>
  );
}

// Simple detail page so Links actually navigate somewhere
function PostDetailPage() {
  const { id } = useParams();
  const post = samplePosts.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <main className="appContainer">
        <header className="appHeader">
          <h1 className="appTitle">Post not found</h1>
        </header>
        <p>
          We couldn&apos;t find that post.{" "}
          <Link to="/" className="backLink">
            Back to blog posts
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">{post.title}</h1>
      </header>
      <article className="postDetail">
        <p className="postDetailDate">
          Published on{" "}
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="postDetailSummary">{post.summary}</p>
        <p>
          <Link to="/" className="backLink">
            ← Back to blog posts
          </Link>
        </p>
      </article>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
    </Routes>
  );
}
