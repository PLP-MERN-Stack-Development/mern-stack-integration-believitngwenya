import { Link } from 'react-router-dom';
import PostList from '../components/Posts/PostList';

const Home = () => {
  return (
    <div>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to BlogApp</h1>
        <p style={styles.heroSubtitle}>
          A modern MERN stack blog application with seamless integration between frontend and backend.
        </p>
        <Link to="/posts" className="btn btn-primary" style={styles.heroBtn}>
          Explore Posts
        </Link>
      </section>

      <section style={styles.featured}>
        <h2>Latest Posts</h2>
        <PostList />
      </section>
    </div>
  );
};

const styles = {
  hero: {
    textAlign: 'center',
    padding: '4rem 0',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '3rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#343a40'
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem',
    maxWidth: '600px',
    margin: '0 auto 2rem'
  },
  heroBtn: {
    fontSize: '1.1rem',
    padding: '12px 30px'
  },
  featured: {
    marginTop: '3rem'
  }
};

export default Home;