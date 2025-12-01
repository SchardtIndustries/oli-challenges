// src/App.jsx
import { useState } from "react";
import {
  Routes,
  Route,
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import BlogPostList from "./components/BlogPostList.jsx";
import BlogPostDetail from "./components/BlogPostDetail.jsx";
import BlogPostForm from "./components/BlogPostForm.jsx";
import "./App.css";

const initialPosts = [
  {
    id: "1",
    title: "Getting Started with React",
    summary:
      "Learn the basics of React and build your first application. This guide walks you through components, props, and state so you can start building interactive user interfaces with confidence.",
    date: "2023-01-01",
    url: "/posts/1",
    author: "Jane Doe",
    content: `
      <p>React is a JavaScript library for building user interfaces.</p>
      <p>It encourages you to think about your UI as a set of reusable components.</p>
      <h2>Key Concepts</h2>
      <ul>
        <li>Components</li>
        <li>Props</li>
        <li>State</li>
      </ul>
      <p>You can learn more on the <a href="https://react.dev" target="_blank" rel="noreferrer">official React documentation</a>.</p>
    `,
  },
  {
    id: "2",
    title: "CSS Grid vs. Flexbox",
    summary:
      "A comparison of two powerful layout systems in CSS. Discover when to use Grid, when Flexbox shines, and how they can work together to build responsive, modern layouts.",
    date: "2023-02-15",
    url: "/posts/2",
    author: "John Smith",
    content: `
      <p>CSS Grid and Flexbox are both powerful layout systems.</p>
      <p>Grid is best for two-dimensional layouts, while Flexbox excels at one-dimensional layouts.</p>
      <h2>When to Use Each</h2>
      <ul>
        <li><strong>Grid</strong> for page-level layout</li>
        <li><strong>Flexbox</strong> for aligning items in a row or column</li>
      </ul>
    `,
  },
  {
    id: "3",
    title: "Accessibility in Web Development",
    summary:
      "Tips for making your web applications more accessible. Learn how semantic HTML, ARIA attributes, and keyboard navigation can improve usability for all users.",
    date: "2023-03-10",
    url: "/posts/3",
    author: "Alex Johnson",
    content: `
      <p>Accessible web apps are usable by as many people as possible.</p>
      <p>Start with semantic HTML, good color contrast, and keyboard-friendly interactions.</p>
      <h2>Quick Wins</h2>
      <ul>
        <li>Use proper heading levels</li>
        <li>Label form controls</li>
        <li>Provide focus styles</li>
      </ul>
    `,
  },
];

// Helper to create a summary from content
function makeSummary(content) {
  if (!content) return "";
  const plain = content.replace(/<[^>]+>/g, ""); // strip HTML tags if any
  return plain.length > 140 ? `${plain.slice(0, 140)}…` : plain;
}

function HomePage({ posts }) {
  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">Blog Posts</h1>
        <p>
          <Link to="/posts/new" className="primaryButton">
            + New Post
          </Link>
        </p>
      </header>
      <BlogPostList posts={posts} />
    </main>
  );
}

function PostDetailPage({ posts, onDeletePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => String(p.id) === String(id));

  const handleDelete = () => {
    if (!post) return;
    onDeletePost(id);
    navigate("/");
  };

  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">Blog Post</h1>
        <p>
          <Link to="/" className="backLink">
            ← Back to blog posts
          </Link>
        </p>
        {post && (
          <p>
            <Link to={`/posts/${post.id}/edit`} className="primaryButton">
              Edit Post
            </Link>
          </p>
        )}
      </header>

      <BlogPostDetail
        title={post?.title}
        content={post?.content}
        author={post?.author}
        date={post?.date}
        onDelete={handleDelete}
      />
    </main>
  );
}

function NewPostPage({ onCreate }) {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const newId = onCreate(data);
    navigate(`/posts/${newId}`);
  };

  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">New Blog Post</h1>
        <p>
          <Link to="/" className="backLink">
            ← Back to blog posts
          </Link>
        </p>
      </header>

      <BlogPostForm onSubmit={handleSubmit} />

      {/* Action bar under the form */}
      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto 0",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button type="submit" form="blogPostForm" className="primaryButton">
          Create Post
        </button>

        <Link to="/" className="secondaryButton">
          Cancel
        </Link>
      </div>
    </main>
  );
}

function EditPostPage({ posts, onUpdate }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((p) => String(p.id) === String(id));

  if (!post) {
    return (
      <main className="appContainer">
        <header className="appHeader">
          <h1 className="appTitle">Edit Blog Post</h1>
          <p>
            <Link to="/" className="backLink">
              ← Back to blog posts
            </Link>
          </p>
        </header>
        <p>Blog post not found.</p>
      </main>
    );
  }

  const handleSubmit = (data) => {
    onUpdate(id, data);
    navigate(`/posts/${id}`);
  };

  return (
    <main className="appContainer">
      <header className="appHeader">
        <h1 className="appTitle">Edit Blog Post</h1>
        <p>
          <Link to={`/posts/${id}`} className="backLink">
            ← Back to post
          </Link>
        </p>
      </header>

      <BlogPostForm post={post} onSubmit={handleSubmit} />

      {/* Action bar under the form */}
      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto 0",
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button type="submit" form="blogPostForm" className="primaryButton">
          Save Changes
        </button>

        <Link to={`/posts/${id}`} className="secondaryButton">
          Cancel
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  const [posts, setPosts] = useState(initialPosts);

  const handleCreatePost = (data) => {
    const id = String(Date.now());
    const summary = makeSummary(data.content);

    const newPost = {
      id,
      title: data.title,
      summary,
      date: data.date,
      url: `/posts/${id}`,
      author: data.author,
      content: data.content,
    };

    setPosts((prev) => [...prev, newPost]);
    return id;
  };

  const handleUpdatePost = (id, data) => {
    const summary = makeSummary(data.content);

    setPosts((prev) =>
      prev.map((post) =>
        String(post.id) === String(id)
          ? {
              ...post,
              title: data.title,
              content: data.content,
              author: data.author,
              date: data.date,
              summary,
              url: `/posts/${id}`,
            }
          : post
      )
    );

    return id;
  };

  const handleDeletePost = (id) => {
    setPosts((prev) =>
      prev.filter((post) => String(post.id) !== String(id))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage posts={posts} />} />
      <Route
        path="/posts/new"
        element={<NewPostPage onCreate={handleCreatePost} />}
      />
      <Route
        path="/posts/:id"
        element={
          <PostDetailPage posts={posts} onDeletePost={handleDeletePost} />
        }
      />
      <Route
        path="/posts/:id/edit"
        element={
          <EditPostPage posts={posts} onUpdate={handleUpdatePost} />
        }
      />
    </Routes>
  );
}
