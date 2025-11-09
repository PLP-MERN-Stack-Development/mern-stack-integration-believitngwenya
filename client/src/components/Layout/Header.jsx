import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={styles.header}>
      <div className="container">
        <div style={styles.nav}>
          <Link to="/" style={styles.logo}>
            BlogApp
          </Link>
          
          <nav style={styles.navLinks}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/posts" style={styles.navLink}>Posts</Link>
            
            {user ? (
              <>
                <Link to="/create-post" style={styles.navLink}>Create Post</Link>
                <span style={styles.user}>Welcome, {user.username}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.navLink}>Login</Link>
                <Link to="/register" style={styles.navLink}>Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '1rem 0',
    marginBottom: '2rem'
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s'
  },
  user: {
    margin: '0 1rem',
    color: '#ccc'
  },
  logoutBtn: {
    background: 'transparent',
    border: '1px solid #dc3545',
    color: '#dc3545',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Header;