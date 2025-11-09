import { useParams, Link, useNavigate } from 'react-router-dom';
import { postsAPI } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: postData, loading, error } = useApi(() => postsAPI.getById(id));

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsAPI.delete(id);
        navigate('/posts');
      } catch (error) {
        alert('Error deleting post');
      }
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!postData?.data) return <div>Post not found.</div>;

  const post = postData.data;
  const isAuthor = user && user._id === post.author._id;

  return (
    <article className="card">
      <header style={styles.header}>
        <h1>{post.title}</h1>
        <div style={styles.meta}>
          <span>By {post.author.username}</span>
          <span>In {post.category.name}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        {isAuthor && (
          <div style={styles.actions}>
            <Link 
              to={`/edit-post/${post._id}`} 
              className="btn btn-primary"
              style={styles.editBtn}
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        )}
      </header>

      {post.featuredImage && (
        <img 
          src={post.featuredImage} 
          alt={post.title}
          style={styles.featuredImage}
        />
      )}

      <div 
        style={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

const styles = {
  header: {
    marginBottom: '2rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem'
  },
  meta: {
    display: 'flex',
    gap: '1rem',
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.5rem'
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  editBtn: {
    textDecoration: 'none',
    display: 'inline-block'
  },
  featuredImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '2rem'
  },
  content: {
    lineHeight: '1.8',
    fontSize: '1.1rem'
  }
};

export default PostDetail;