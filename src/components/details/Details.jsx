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
  
  const groupedProgress = progress.reduce((acc, session) => {
    const dateStr = new Date(session.startReading).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(session);
    return acc;
  }, {});

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
          {Object.entries(groupedProgress).map(([date, sessions]) => {

            const totalGroupPages = sessions.reduce((acc, s) => {
              const pages = s.finishPage ? s.finishPage - s.startPage : 0;
              return acc + pages;
            }, 0);

            return (
              <div key={date} className={styles.diaryGroup}>
                <div className={styles.groupHeader}>
                  <div className={styles.groupHeaderLeft}>
                    <span className={styles.squareIcon}>⏹</span>
                    <span className={styles.groupDate}>{date}</span>
                  </div>
                  <span className={styles.groupTotalPages}>{totalGroupPages} pages</span>
                </div>

                <div className={styles.groupTimeline}>
                  <div className={styles.timelineLine}></div>
                  <div className={styles.sessionsList}>
                    {sessions.map((session) => {
                      const pagesRead = session.finishPage
                        ? session.finishPage - session.startPage
                        : 0;
                      const percent = ((pagesRead / book.totalPages) * 100).toFixed(2);

                      const durationMinutes =
                        session.startReading && session.finishReading
                          ? Math.round(
                              (new Date(session.finishReading) -
                                new Date(session.startReading)) /
                                60000
                            )
                          : session.minutesSpent || 0;

                      return (
                        <div key={session._id} className={styles.diaryItem}>
                          <div className={styles.sessionLeft}>
                            <div className={styles.sessionPercent}>{percent}%</div>
                            <div className={styles.sessionTime}>
                              {durationMinutes} minutes
                            </div>
                          </div>

                          <div className={styles.sessionRight}>
                            <div className={styles.graphContainer}>
                              <div className={styles.greenBar}></div>
                              <button
                                onClick={() => onDeleteSession(session._id || session.id)}
                                className={styles.deleteBtn}
                                title="Delete"
                              >
                                🗑️
                              </button>
                            </div>
                            <div className={styles.sessionSpeed}>
                              {session.speed || 0} pages per hour
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
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
