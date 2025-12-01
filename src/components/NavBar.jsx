// src/components/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen((open) => !open);

  return (
    <nav className={styles.navBar}>
      {/* Left: Logo */}
      <Link to="/" className={styles.logo}>
        BlogApp
      </Link>

      {/* Desktop links + New Post button */}
      <div className={styles.rightSection}>
        <div className={styles.links}>
          <Link to="/">Home</Link>
        </div>

        <Link to="/posts/new" className={styles.newPostButton}>
          + New Post
        </Link>
      </div>

      {/* Hamburger (mobile only) */}
      <button
        type="button"
        className={styles.hamburger}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        onClick={toggleMenu}
      >
        {isMobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Mobile dropdown menu */}
      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen ? styles.open : ""
        }`}
      >
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/posts/new" onClick={toggleMenu}>
          + New Post
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
