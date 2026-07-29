import styles from "../../pages/reading/Reading.module.css";

export const Details = ({ book, activeTab, setActiveTab, onDeleteSession }) => {
  const progress = book.progress || [];

  return (
    <div className={styles.detailsCard}>
      <div className={styles.detailsHeader}>
        <h3>{activeTab === "diary" ? "Diary" : "Statistics"}</h3>
        <div className={styles.tabIcons}>
          <button
            className={activeTab === "diary" ? styles.activeTab : ""}
            onClick={() => setActiveTab("diary")}
            title="Diary"
          >
            📋
          </button>
          <button
            className={activeTab === "statistics" ? styles.activeTab : ""}
            onClick={() => setActiveTab("statistics")}
            title="Statistics"
          >
            📊
          </button>
        </div>
      </div>

      {activeTab === "diary" ? (
        <div className={styles.diaryContent}>
          {progress.length === 0 ? (
            <p className={styles.infoText}>
              Progress will appear here once you start reading.
            </p>
          ) : (
            progress.map((session) => {
              const pagesRead = session.finishPage ? session.finishPage - session.startPage : 0;
              const percent = ((pagesRead / book.totalPages) * 100).toFixed(1);

              return (
                <div key={session._id} className={styles.diaryItem}>
                  <div className={styles.diaryDate}>
                    {new Date(session.startReading).toLocaleDateString()}
                  </div>
                  <div className={styles.diaryStats}>
                    <span>{percent}%</span>
                    <span>{pagesRead} pages</span>
                    <span>{session.speed || 0} p/h</span>
                    <button
                      onClick={() => onDeleteSession(session._id)}
                      className={styles.deleteBtn}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Statistics Sekmesi */
        <div className={styles.statsContent}>
          <div className={styles.circleProgress}>
            {/* Dairesel veya çubuk grafik istatistiği */}
            <div className={styles.percentText}>
              {(((book.progress?.reduce((acc, curr) => acc + ((curr.finishPage || 0) - curr.startPage), 0) || 0) / book.totalPages) * 100).toFixed(0)}%
            </div>
          </div>
          <p className={styles.infoText}>
            Each page read moves you closer to new knowledge.
          </p>
        </div>
      )}
    </div>
  );
};