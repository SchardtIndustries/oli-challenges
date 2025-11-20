// src/components/BlogPostForm.jsx
import { useEffect, useState } from "react";
import styles from "./BlogPostForm.module.css";

function BlogPostForm({ post, onSubmit }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [author, setAuthor] = useState(post?.author ?? "");
  const [date, setDate] = useState(post?.date ?? "");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!post;

  useEffect(() => {
    setTitle(post?.title ?? "");
    setContent(post?.content ?? "");
    setAuthor(post?.author ?? "");
    setDate(post?.date ?? "");
    setErrors({});
  }, [post]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Required";
    if (!content.trim()) newErrors.content = "Required";
    if (!author.trim()) newErrors.author = "Required";
    if (!date.trim()) newErrors.date = "Required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const data = { title, content, author, date };
      const maybePromise = onSubmit?.(data);
      if (maybePromise && typeof maybePromise.then === "function") {
        await maybePromise;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorMessages = Object.values(errors);

  return (
    <form
      id="blogPostForm"
      className={styles.blogPostForm}
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className={styles.heading}>
        {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
      </h2>

      {/* SR-only live region to announce validation errors */}
      <div className={styles.visuallyHidden} aria-live="polite">
        {errorMessages.length > 0 ? errorMessages.join(". ") : ""}
      </div>

      {/* Title */}
      <div className={styles.formRow}>
        <label className={styles.label} htmlFor="title">
          Title
        </label>
        <div className={styles.fieldWrapper}>
          <input
            id="title"
            type="text"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p id="title-error" className={styles.error}>
              {errors.title}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={styles.formRow}>
        <label className={styles.label} htmlFor="content">
          Content
        </label>
        <div className={styles.fieldWrapper}>
          <textarea
            id="content"
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? "content-error" : undefined}
          />
          {errors.content && (
            <p id="content-error" className={styles.error}>
              {errors.content}
            </p>
          )}
        </div>
      </div>

      {/* Author */}
      <div className={styles.formRow}>
        <label className={styles.label} htmlFor="author">
          Author
        </label>
        <div className={styles.fieldWrapper}>
          <input
            id="author"
            type="text"
            className={styles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            aria-invalid={!!errors.author}
            aria-describedby={errors.author ? "author-error" : undefined}
          />
          {errors.author && (
            <p id="author-error" className={styles.error}>
              {errors.author}
            </p>
          )}
        </div>
      </div>

      {/* Publication Date */}
      <div className={styles.formRow}>
        <label className={styles.label} htmlFor="date">
          Publication Date
        </label>
        <div className={styles.fieldWrapper}>
          <input
            id="date"
            type="date"
            className={styles.input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
          {errors.date && (
            <p id="date-error" className={styles.error}>
              {errors.date}
            </p>
          )}
        </div>
      </div>

      {/* Original submit button (still useful, especially for tests / accessibility) */}
      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isEditMode
              ? "Saving..."
              : "Submitting..."
            : isEditMode
            ? "Save Changes"
            : "Create Post"}
        </button>
      </div>
    </form>
  );
}

export default BlogPostForm;
