import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import matter from 'gray-matter'

function BlogList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Dynamically import all markdown files from the posts directory
    const loadPosts = async () => {
      const postFiles = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default' })
      const postPromises = Object.entries(postFiles).map(async ([path, loader]) => {
        const content = await loader()
        const { data, excerpt } = matter(content, { excerpt: true })
        const slug = path.split('/').pop().replace('.md', '')
        return { slug, ...data, excerpt }
      })
      const loadedPosts = await Promise.all(postPromises)
      // Sort by date, newest first
      loadedPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
      setPosts(loadedPosts)
    }
    loadPosts()
  }, [])

  return (
    <div className="page">
      {/* ── Masthead ── */}
      <header className="masthead" style={{ paddingBottom: '24px' }}>
        <p className="masthead-date">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            ← Leonard A. Robinson
          </Link>
        </p>
        <h1 className="masthead-title" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}>
          The Notebook
        </h1>
        <p className="masthead-subtitle" style={{ opacity: 1 }}>
          Essays, reporting, and observations
        </p>
      </header>

      {/* ── Blog Posts ── */}
      <div className="blog-list">
        {posts.map((post) => (
          <article key={post.slug} className="blog-list-item fade-section visible">
            <time className="blog-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <h2 className="blog-list-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.excerpt && <p className="blog-list-excerpt">{post.excerpt}</p>}
          </article>
        ))}
      </div>

      {/* ── Footer ── */}
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Leonard A. Robinson
        </p>
      </footer>
    </div>
  )
}

export default BlogList
