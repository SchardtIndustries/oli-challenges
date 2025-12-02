import React from "react";
import Comment from "./Comment";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  // Oldest at top, newest at bottom
  const sorted = [...comments].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div aria-live="polite">
      {sorted.map((c) => (
        <Comment
          key={c.id}
          name={c.name}
          date={c.date}
          text={c.text}
          avatar={c.avatar}
        />
      ))}
    </div>
  );
}
