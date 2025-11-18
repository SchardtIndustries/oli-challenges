# Blog Post Listing Feature Implementation

This project implements the **Blog Post Listing Feature** as described
in the Challenge 1 specification.\
It includes fully responsive components built with React, Vite, and
React Router, using CSS modules for scoped styling.

------------------------------------------------------------------------

## 📁 Project Structure

    .
    ├── README.md
    ├── challenge-1-design-spec.txt
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   ├── main.jsx
    │   ├── components/
    │   │   ├── BlogPostItem.jsx
    │   │   ├── BlogPostItem.module.css
    │   │   ├── BlogPostList.jsx
    │   │   └── BlogPostList.module.css
    └── vite.config.js

------------------------------------------------------------------------

## 🚀 How to Run the Project

1. Install dependencies:

        npm install

2. Start the development server:

        npm run dev

3. Open your browser and navigate to the URL shown in your terminal
    (usually `http://localhost:5173`).

------------------------------------------------------------------------

## 🧩 Components Implemented

### **BlogPostList**

-Receives an array of blog posts via props.
-Renders a responsive grid:
    -   **1 column** on mobile (≤ 768px)
    -   **2 columns** on tablets (769--1199px)
    -   **3 columns** on desktop (≥ 1200px)
-Displays an empty state message when no posts are available.

### **BlogPostItem**

-Displays:
    -   Title (as a `<Link>` to the full post)
    -   Summary (plain text)
    -   Publication date (formatted as "Month Day, Year")
-Uses semantic HTML: `<article>`, `<h2>`, `<p>`.
-Styles match the UI/UX requirements with appropriate colors,
    spacing, and typography.

### **Routing**

-Implemented using `react-router-dom`.
-Clicking a blog post title navigates to `/posts/:id`.
-A basic Post Detail page is included to satisfy navigation behavior.

------------------------------------------------------------------------

## 📱 Responsiveness

This project fully implements the design requirements:

| Screen Width   | Layout      |
| -------------- | ----------- |
| ≤ 768px        | 1 column    |
| 769--1199px    | 2 columns   |
| ≥ 1200px       | 3 columns   |

Spacing, padding, and typography adjust for mobile readability.

------------------------------------------------------------------------

## ♿ Accessibility

-Semantic HTML ensures compatibility with screen readers.
-Titles are announced as links.
-Section uses `aria-label="Blog posts"`.

------------------------------------------------------------------------

## 🧪 Sample Data

Sample posts are included in `App.jsx` for demonstration purposes:

    const samplePosts = [
      {
        id: "1",
        title: "Getting Started with React",
        summary: "...",
        date: "2023-01-01",
        url: "/posts/1"
      },
      ...
    ];

Replace this array or fetch posts dynamically to integrate with a
backend.

------------------------------------------------------------------------

## ✅ Status

All requirements from Challenge 1 are **fully implemented**, including:

-Display structure and formatting\
-Responsive grid layout\
-Navigation with React Router\
-CSS modules\
-Empty state handling\
-Accessibility fundamentals

You can now submit this implementation.

------------------------------------------------------------------------

## 📄 License

This project is provided for educational purposes under the terms of
your course assignment.
