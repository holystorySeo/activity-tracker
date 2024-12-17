import React from "react";

function BottomNavBar() {
  return (
    <div style={styles.navBar}>
      <img src="/Property1.png" alt="Home" style={styles.icon} />
      <img src="/Property2.png" alt="Credit Card" style={styles.icon} />
      <img src="/Property3.png" alt="Chart" style={{ ...styles.icon, ...styles.activeIcon }} />
      <img src="/Property4.png" alt="Grid" style={styles.icon} />
    </div>
  );
}

const styles = {
  navBar: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px 0",
    borderTop: "1px solid #ddd",
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
  icon: {
    width: "24px", // 아이콘 크기
    height: "24px",
    opacity: 0.6, // 비활성화 상태
    transition: "opacity 0.3s ease",
  },
  activeIcon: {
    opacity: 1, // 활성화 상태
    filter: "invert(21%) sepia(94%) saturate(1734%) hue-rotate(240deg)", // 파란색 강조 효과
  },
};

export default BottomNavBar;
