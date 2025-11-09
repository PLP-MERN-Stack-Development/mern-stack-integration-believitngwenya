import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postsAPI, categoriesAPI } from '../../services/api';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../context/AuthContext';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    featuredImage: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Fetch categories
  const { data: categoriesData } = useApi(categoriesAPI.getAll);
  const categories = categoriesData?.data || [];

  // Fetch post data if editing
  const { data: postData } = useApi(
    () => postsAPI.getById(id), 
    null, 
    [id]
  );

  useEffect(() => {
    if (isEdit && postData?.data) {
      const post = postData.data;
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category._id,
        tags: post.tags.join(', '),
        featuredImage: post.featuredImage || ''
      });
    }
  }, [isEdit, postData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      let response;
      if (isEdit) {
        response = await postsAPI.update(id, postData);
      } else {
        response = await postsAPI.create(postData);
      }

      if (response.data.success) {
        navigate(`/posts/${response.data.data._id}`);
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="error">
        You need to be logged in to {isEdit ? 'edit' : 'create'} posts.
      </div>
    );
  }

  return (
    <div className="card">
      <h1>{isEdit ? 'Edit Post' : 'Create New Post'}</h1>
      
      {errors.submit && (
        <div className="error">{errors.submit}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter post title"
          />
          {errors.title && <div style={styles.errorText}>{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            className="form-control"
            placeholder="Brief description of your post"
            rows="3"
          />
          {errors.excerpt && <div style={styles.errorText}>{errors.excerpt}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            placeholder="Write your post content here..."
            rows="10"
          />
          {errors.content && <div style={styles.errorText}>{errors.content}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && <div style={styles.errorText}>{errors.category}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="form-control"
            placeholder="react, javascript, web-development"
          />
        </div>

        <div className="form-group">
          <label htmlFor="featuredImage">Featured Image URL</label>
          <input
            type="url"
            id="featuredImage"
            name="featuredImage"
            value={formData.featuredImage}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Saving...' : (isEdit ? 'Update Post' : 'Create Post')}
        </button>
      </form>
    </div>
  );
};

const styles = {
  errorText: {
    color: '#dc3545',
    fontSize: '0.875rem',
    marginTop: '0.25rem'
  }
};

export default PostForm;