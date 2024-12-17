import React, { useState, useEffect } from "react";
import ActivityChart from "./components/ActivityChart";
import TransactionList from "./components/TransactionList";
import BottomNavBar from "./components/BottomNavBar";
import Notification from "./components/Notification";
import mockData from "./mockData.json";

function App() {
  const [latestTransaction, setLatestTransaction] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const safeMockData = Array.isArray(mockData) ? mockData : []; // mockData 안전 처리

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setLatestTransaction(safeMockData[index]);
      setShowNotification(true);

      setTimeout(() => setShowNotification(false), 5000); // 5초 후 알림 숨김
      index = (index + 1) % safeMockData.length;
    }, 10000); // 10초마다 새 알림

    return () => clearInterval(interval); // 클린업
  }, [safeMockData]);

  return (
    <div style={styles.container}>
      {/* 상단 콘텐츠 */}
      <div style={styles.header}>
        <h2 style={styles.title}>Activity</h2>
        {/* 알림 아이콘 */}
        <img
          src={showNotification ? "/Property6.png" : "/Property5.png"}
          alt="Notification Bell"
          style={styles.bellIcon}
        />
      </div>

      <div style={styles.content}>
        {/* 차트 */}
        <ActivityChart data={safeMockData} />

        {/* 거래 내역 */}
        <TransactionList transactions={safeMockData} />
      </div>

      {/* 알림 표시 */}
      {latestTransaction && <Notification transaction={latestTransaction} />}

      {/* 하단 네비게이션 */}
      <BottomNavBar />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    minWidth: "300px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  bellIcon: {
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    display: "flex",
    gap: 20,
    flexDirection: "column",
    overflowY: "auto",
    padding: "20px",
    paddingBottom: "60px",

    /* 스크롤바 숨기기 */
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
};

export default App;
