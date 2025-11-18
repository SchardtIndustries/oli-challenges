// src/components/BlogPostItem.jsx
import { Link } from "react-router-dom";
import styles from "./BlogPostItem.module.css";

function formatDate(date) {
  const d = typeof date === "string" ? new Date(date) : date;

  if (!(d instanceof Date) || Number.isNaN(d.getTime())) {
    return "";
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostItem({ id, title, summary, date, url }) {
  const formattedDate = formatDate(date);

  return (
    <article className={styles.blogPostItem} data-id={id}>
      <Link to={url} className={styles.titleLink}>
        <h2 className={styles.title}>{title}</h2>
      </Link>
      <p className={styles.summary}>{summary}</p>
      {formattedDate && (
        <p className={styles.date}>Published on {formattedDate}</p>
      )}
    </article>
  );
}
