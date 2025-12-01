// src/components/BlogPostDetail.jsx
import React, { useState } from "react";
import styles from "./BlogPostDetail.module.css";
import DeleteButton from "./DeleteButton";
import ConfirmationDialog from "./ConfirmationDialog";

const BlogPostDetail = ({ title, content, author, date, onDelete }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // If any essential piece of data is missing, show the "not found" message.
  if (!title || !content || !author || !date) {
    return <p>Blog post not found.</p>;
  }

  // Normalize the date: accept either a Date object or an ISO string.
  const dateValue = date instanceof Date ? date : new Date(date);

  const formattedDate = dateValue.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsDialogOpen(false);
  };

  return (
    <article className={styles.blogPostDetail}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>By {author}</p>
        <p className={styles.date}>Published on {formattedDate}</p>
      </header>

      {/* Render the content as HTML */}
      <section
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Actions row (delete button) */}
      <div className={styles.actions}>
        <DeleteButton onClick={handleDeleteClick} />
      </div>

      {/* Confirmation dialog for deletion */}
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </article>
  );
};

export default BlogPostDetail;
