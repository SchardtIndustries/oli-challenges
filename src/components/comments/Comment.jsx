import React from "react";
import "./commentStyles.css";

export default function Comment({ name, avatar, date, text }) {
  const formattedDate = new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const avatarUrl =
    avatar || `https://cdn.jsdelivr.net/gh/encharm/Font-Awesome-SVG-PNG/black/svg/user.svg`;

  return (
    <div className="comment">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="comment-avatar"
      />

      <div className="comment-body">
        <div className="comment-header">
          <strong className="comment-name">{name}</strong>
          <span className="comment-date">{formattedDate}</span>
        </div>

        <p className="comment-text">{text}</p>
      </div>
    </div>
  );
}
