// src/components/BlogPostList.jsx
import BlogPostItem from "./BlogPostItem.jsx";
import styles from "./BlogPostList.module.css";

export default function BlogPostList({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <p className={styles.emptyState}>
        No blog posts available.
      </p>
    );
  }

  return (
    <section
      className={styles.blogPostList}
      aria-label="Blog posts"
    >
      {posts.map((post) => (
        <BlogPostItem
          key={post.id}
          id={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          url={post.url}
        />
      ))}
    </section>
  );
}
