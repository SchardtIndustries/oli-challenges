import React, { useState } from "react";
import "./commentStyles.css";

export default function CommentForm({
  onSubmit,
  isLoggedIn = false,
  userName = "",
}) {
  const [name, setName] = useState(userName || "");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) return;
    if (!isLoggedIn && !name.trim()) return;

    const finalName = isLoggedIn ? userName : name;

    onSubmit({
      name: finalName,
      text,
      date: new Date().toISOString(),

      // Avatar: Consistent placeholder based on name
      avatar: `https://cdn.jsdelivr.net/gh/encharm/Font-Awesome-SVG-PNG/black/svg/user.svg`,
    });

    setText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      {!isLoggedIn && (
        <div className="form-control">
          <label htmlFor="comment-name">Name</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLoggedIn}
          />
        </div>
      )}

      <div className="form-control">
        <label htmlFor="comment-text">Comment</label>
        <textarea
          id="comment-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <button className="comment-submit" type="submit">
        Post Comment
      </button>
    </form>
  );
}
