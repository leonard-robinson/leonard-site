import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Load all markdown files
        const posts = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default' })
        const postPath = `/content/posts/${slug}.md`

        if (posts[postPath]) {
          const content = await posts[postPath]()
          const { data, content: markdown } = matter(content)
          setPost({ ...data, markdown })
        }
      } catch (error) {
        console.error('Post not found:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading) {
    return <div className="page">Loading...</div>
  }

  if (!post) {
    return (
      <div className="page">
        <p>Post not found.</p>
        <Link to="/blog">← Back to blog</Link>
      </div>
    )
  }

  return (
    <div className="page">
      {/* ── Header ── */}
      <header className="blog-post-header">
        <p className="blog-post-back">
          <Link to="/blog">← Back to The Notebook</Link>
        </p>
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
      </header>

      {/* ── Content ── */}
      <article className="blog-post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.markdown}
        </ReactMarkdown>
      </article>

      {/* ── Footer ── */}
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Leonard A. Robinson
        </p>
      </footer>
    </div>
  )
}

export default BlogPost
