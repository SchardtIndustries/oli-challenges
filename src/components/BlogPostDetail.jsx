// src/components/BlogPostDetail.js
import React from 'react';
import styles from './BlogPostDetail.module.css';

const BlogPostDetail = ({ title, content, author, date }) => {
  // If any essential piece of data is missing, show the "not found" message.
  if (!title || !content || !author || !date) {
    return <p>Blog post not found.</p>;
  }

  // Normalize the date: accept either a Date object or an ISO string.
  const dateValue = date instanceof Date ? date : new Date(date);

  const formattedDate = dateValue.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className={styles.blogPostDetail}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.author}>By {author}</p>
        <p className={styles.date}>Published on {formattedDate}</p>
      </header>

      {/* 
        Use dangerouslySetInnerHTML to render the content as HTML.
        This is a security risk, so be careful when using it.
      */}
      <section
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};

export default BlogPostDetail;
