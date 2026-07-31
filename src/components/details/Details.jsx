import styles from "../../pages/reading/Reading.module.css";

export const Details = ({ book, activeTab, setActiveTab, onDeleteSession }) => {
  const progress = book.progress || [];

  const hasStarted = progress.length > 0;

  if (!hasStarted) {
    return (
      <div className={styles.detailsCard}>
        <div className={styles.progressEmptyState}>
          <h3>Progress</h3>
          <p className={styles.infoText}>
            Here you will see when and how much you read.
            <br />
            To record, click on the red button above.
          </p>
          <div className={styles.starIconContainer}>
            <span className={styles.starIcon}>🌟</span>
          </div>
        </div>
      </div>
    );
  }
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
              const pagesRead = session.finishPage
                ? session.finishPage - session.startPage
                : 0;
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
        <div className={styles.statsContent}>
          <div className={styles.circleProgress}>
            <div className={styles.percentText}>
              {(
                ((book.progress?.reduce(
                  (acc, curr) =>
                    acc + ((curr.finishPage || 0) - curr.startPage),
                  0,
                ) || 0) /
                  book.totalPages) *
                100
              ).toFixed(0)}
              %
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
