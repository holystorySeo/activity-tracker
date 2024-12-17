import React, { useState, useEffect } from "react";

function Notification({ transaction }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // 알림 표시
    const timer = setTimeout(() => setVisible(false), 5000); // 5초 후 숨김
    return () => clearTimeout(timer);
  }, [transaction]);

  // 날짜 포맷 함수: YYYY.MM.DD HH:mm
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const styles = {
    toast: {
      position: "fixed",
      bottom: "60px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(57, 44, 109, 0.9)", // 반투명한 배경색
      color: "#fff",
      borderRadius: "10px",
      padding: "15px 20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      display: visible ? "flex" : "none",
      flexDirection: "column",
      gap: "5px",
      width: "77%",
      fontSize: "0.9rem",
      WebkitBackdropFilter: "blur(10px)", // Safari 지원
      zIndex: 1000, // 다른 요소 위에 표시
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: { fontWeight: "bold", fontSize: "1rem", color: "#fff" },
    description: { color: "#B8AFCB", fontSize: "0.8rem" }, // 연한 텍스트 색상
    amount: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      color: "#fff",
    },
    timestamp: {
      fontSize: "0.8rem",
      color: "#B8AFCB", // 연한 텍스트 색상
    },
  };

  return (
    <div style={styles.toast}>
      <div style={styles.row}>
        <div style={styles.name}>{transaction.name || "Name"}</div>
        <div style={styles.amount}>
          {transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount).toFixed(1)}
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.description}>Transfer</div>
        <div style={styles.timestamp}>{formatDate(transaction.timestamp)}</div>
      </div>
    </div>
  );
}

export default Notification;
