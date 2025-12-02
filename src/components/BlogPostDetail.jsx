// src/components/BlogPostDetail.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function BlogPostDetail({ title, author, date, content, editUrl }) {
  if (!title) {
    return <p>Blog post not found.</p>;
  }

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="postDetail">
      <header className="postDetailHeader">
        <div
          className="postDetailHeaderTop"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <h2 className="postDetailTitle">{title}</h2>

          {editUrl && (
            <Link to={editUrl} className="primaryButton">
              Edit Post
            </Link>
          )}
        </div>

        <div className="postDetailMeta">
          {author && <p className="postDetailAuthor">By {author}</p>}
          {formattedDate && (
            <p className="postDetailDate">
              Published on {formattedDate}
            </p>
          )}
        </div>
      </header>

      <section
        className="postDetailContent"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </article>
  );
}
