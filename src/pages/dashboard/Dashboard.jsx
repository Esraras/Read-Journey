import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations';
import styles from './Dashboard.module.css';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Redux state'ten kullanıcı bilgisi
  const user = useSelector((state) => state.auth.user) || { name: '' };

  // Örnek önerilen kitaplar verisi
  const books = [
    { id: 1, title: 'Lovers of Justice', author: 'Yuri Andrukhovych', cover: 'https://picsum.photos/id/10/200/300' },
    { id: 2, title: 'It doesn\'t hurt', author: 'Kateryna Babkina', cover: 'https://picsum.photos/id/20/200/300' },
    { id: 3, title: 'Galya without a head', author: 'Lyuko Dashvar', cover: 'https://picsum.photos/id/30/200/300' },
    { id: 4, title: 'Where there is no G...', author: 'Max Kidruk', cover: 'https://picsum.photos/id/40/200/300' },
    { id: 5, title: 'Six doors', author: 'Irene Rozdobudko', cover: 'https://picsum.photos/id/50/200/300' },
  ];

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.dashboardLayout}>
        {/* TOP HEADER */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <svg width="24" height="17" viewBox="0 0 24 17" fill="none">
              <path d="M0 0H10V17H0V0Z" fill="white"/>
              <path d="M14 0H24V17H14V0Z" fill="white"/>
            </svg>
            <span>READ JOURNEY</span>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <NavLink to="/recommended" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
              Home
            </NavLink>
            <NavLink to="/library" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
              My library
            </NavLink>
          </nav>

          {/* User & Logout Section */}
          <div className={styles.userBlock}>
            <div className={styles.avatar}>{getInitial(user.name)}</div>
            <span className={styles.userName}>{user.name}</span>
            <button className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
            <button className={styles.burgerBtn} onClick={() => setIsMenuOpen(true)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* MAIN LAYOUT */}
        <div className={styles.mainContentWrapper}>
          {/* LEFT SIDEBAR CONTROLS */}
          <aside className={styles.sidebar}>
            {/* Filter Form Card */}
            <div className={styles.filterCard}>
              <p className={styles.filterTitle}>Filters:</p>
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>Book title:</span>
                  <input type="text" placeholder="Enter text" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>The author:</span>
                  <input type="text" placeholder="Enter text" className={styles.input} />
                </div>
                <button type="submit" className={styles.applyBtn}>To apply</button>
              </form>
            </div>

            {/* Workout / Guide Card */}
            <div className={styles.workoutCard}>
              <h3 className={styles.workoutTitle}>Start your workout</h3>
              <div className={styles.stepsList}>
                <div className={styles.stepItem}>
                  <span className={styles.stepNumber}>1</span>
                  <p className={styles.stepText}>
                    <strong>Create a personal library:</strong> add the books you intend to read to it.
                  </p>
                </div>
                <div className={styles.stepItem}>
                  <span className={styles.stepNumber}>2</span>
                  <p className={styles.stepText}>
                    <strong>Create your first workout:</strong> define a goal, choose a period, start training.
                  </p>
                </div>
              </div>
              <div className={styles.myLibraryLink} onClick={() => navigate('/library')}>
                <span>My library</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>

            {/* Quote Card (Desktop Only) */}
            <div className={styles.quoteCard}>
              <span style={{ fontSize: '24px' }}>📚</span>
              <p className={styles.quoteText}>
                "Books are <span>windows</span> to the world, and reading is a journey into the unknown."
              </p>
            </div>
          </aside>

          {/* RIGHT RECOMMENDED BOOKS LIST */}
          <main className={styles.content}>
            <div className={styles.contentHeader}>
              <h2 className={styles.sectionTitle}>Recommended</h2>
              <div className={styles.paginationBtns}>
                <button className={styles.pageBtn}>&lt;</button>
                <button className={styles.pageBtn}>&gt;</button>
              </div>
            </div>

            <div className={styles.booksGrid}>
              {books.map((book) => (
                <div key={book.id} className={styles.bookCard}>
                  <img src={book.cover} alt={book.title} className={styles.bookCover} />
                  <h4 className={styles.bookName}>{book.title}</h4>
                  <p className={styles.bookAuthor}>{book.author}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* MOBILE SLIDE-OUT MENU */}
      {isMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={() => setIsMenuOpen(false)}>
          <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <nav className={styles.mobileNav}>
              <NavLink to="/recommended" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
                Home
              </NavLink>
              <NavLink to="/library" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink}>
                My library
              </NavLink>
            </nav>
            <button className={styles.logoutBtn} style={{ display: 'block', width: '100%' }} onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};