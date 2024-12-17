import React, { useState, useEffect } from "react";

function TransactionList({ transactions }) {
  const [filter, setFilter] = useState("all");
  const [displayedData, setDisplayedData] = useState([]);

  // type 필드를 동적으로 추가
  const enrichedData = transactions.map((tx) => ({
    ...tx,
    type: parseFloat(tx.amount) > 0 ? "income" : "expense",
  }));

  useEffect(() => {
    // 필터에 따라 표시할 데이터 결정
    const filteredData = enrichedData.filter((tx) => {
      if (filter === "all") return true;
      return tx.type === filter;
    });

    // All 탭에서는 20건, 나머지 탭에서는 10건만 보여줌
    const limitedData = filteredData.slice(0, filter === "all" ? 20 : 10);
    setDisplayedData(limitedData);
  }, [filter, transactions]);

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

  return (
    <div>
      <h3 style={styles.title}>Recent Transactions</h3>
      {/* 필터 버튼 */}
      <div style={styles.filterContainer}>
        {["all", "expense", "income"].map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterButton,
              color: filter === f ? "#392C6D" : "#ccc",
            }}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* 거래 목록 */}
      <div style={styles.listContainer}>
        {displayedData.map((tx, index) => (
          <div key={index} style={styles.transaction}>
            {/* 왼쪽 이미지 */}
            <div style={styles.iconContainer}>
              <div style={styles.placeholderIcon} />
            </div>
            {/* 중앙 내용 */}
            <div style={styles.textContainer}>
              <div style={styles.name}>{tx.name}</div>
              <div style={styles.description}>Transfer</div>
            </div>
            {/* 금액 및 날짜 */}
            <div style={styles.amount}>
              {parseFloat(tx.amount) > 0 ? "+" : "-"}${Math.abs(parseFloat(tx.amount)).toFixed(2)}
              <div style={styles.timestamp}>{formatDate(tx.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "30px",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
    marginBottom: "20px",
  },
  filterButton: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  transaction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
  },
  iconContainer: {
    flex: "0 0 40px",
    marginRight: "15px",
  },
  placeholderIcon: {
    width: "40px",
    height: "40px",
    backgroundColor: "#ddd",
    borderRadius: "6px",
  },
  textContainer: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  name: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#000",
  },
  description: {
    color: "#999",
    fontSize: "0.8rem",
  },
  amount: {
    fontWeight: "bold",
    fontSize: "1.1rem",
    textAlign: "right",
    color: "#392C6D",
  },
  timestamp: {
    color: "#bbb",
    fontSize: "0.8rem",
    marginTop: "5px",
  },
};

export default TransactionList;
