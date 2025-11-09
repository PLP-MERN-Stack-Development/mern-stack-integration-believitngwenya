import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postsAPI } from '../../services/api';
import { useApi } from '../../hooks/useApi';

const PostList = () => {
  const [page, setPage] = useState(1);
  const { data: postsData, loading, error } = useApi(() => postsAPI.getAll(page), null, [page]);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!postsData?.data?.length) return <div>No posts found.</div>;

  const { data: posts, pagination } = postsData;

  return (
    <div>
      <h1>Latest Posts</h1>
      
      <div style={styles.postsGrid}>
        {posts.map(post => (
          <div key={post._id} className="card" style={styles.postCard}>
            <h3>
              <Link to={`/posts/${post._id}`} style={styles.postLink}>
                {post.title}
              </Link>
            </h3>
            <p style={styles.excerpt}>{post.excerpt}</p>
            <div style={styles.meta}>
              <span>By {post.author.username}</span>
              <span>In {post.category.name}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div style={styles.pagination}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            style={styles.paginationBtn}
          >
            Previous
          </button>
          
          <span style={styles.pageInfo}>
            Page {page} of {pagination.pages}
          </span>
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === pagination.pages}
            style={styles.paginationBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  postsGrid: {
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
  },
  postCard: {
    transition: 'transform 0.2s',
    cursor: 'pointer'
  },
  postLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  excerpt: {
    color: '#666',
    margin: '1rem 0',
    lineHeight: '1.5'
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.9rem',
    color: '#888',
    marginTop: '1rem'
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem'
  },
  paginationBtn: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  pageInfo: {
    margin: '0 1rem'
  }
};

export default PostList;