import React, { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

function ActivityChart({ data }) {
  const [duration, setDuration] = useState("week");
  const tooltipRef = useRef(null);
  const chartRef = useRef(null);

  const processedData = data.map((item) => ({
    ...item,
    type: parseFloat(item.amount) > 0 ? "income" : "expense",
    date: item.timestamp.split("T")[0],
  }));
  const filteredData = duration === "week" ? processedData.slice(0, 7) : processedData;

  const dates = filteredData.map((item) => item.date);
  const expenseData = filteredData.map((item) => (item.type === "expense" ? Math.abs(item.amount) : null));
  const incomeData = filteredData.map((item) => (item.type === "income" ? item.amount : null));

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Expense",
        data: expenseData,
        borderColor: "#00C853",
        backgroundColor: "rgba(0, 200, 83, 0.2)",
        fill: true,
        tension: 0.4,
        spanGaps: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
      {
        label: "Income",
        data: incomeData,
        borderColor: "#2E224E",
        backgroundColor: "rgba(46, 34, 78, 0.2)",
        fill: true,
        tension: 0.4,
        spanGaps: true,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
        external: (context) => customTooltip(context),
      },
    },
    interaction: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: false,
        grid: { display: false },
      },
      y: {
        display: false,
        grid: { display: false },
      },
    },
  };

  const customTooltip = (context) => {
    const { chart, tooltip } = context;
    const tooltipEl = tooltipRef.current;

    if (!tooltipEl) return;

    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }

    const tooltipData = tooltip.dataPoints[0];
    const value = tooltipData.raw;
    const label = tooltipData.label;
    const datasetLabel = tooltipData.dataset.label;

    const isExpense = datasetLabel === "Expense";
    const backgroundColor = isExpense ? "#00C853" : "#2E224E";

    const displayValue = isExpense ? `-$${Math.abs(value).toFixed(2)}` : `$${Math.abs(value).toFixed(2)}`;

    // 툴팁 내용 업데이트
    tooltipEl.innerHTML = `
  <div>
    <div style="font-size: 14px; font-weight: bold;">${displayValue}</div>
    <div style="text-align: center;">
      <div style="font-size: 12px;">${label}</div>
    </div>
  </div>
`;

    // 툴팁 스타일 업데이트
    tooltipEl.style.opacity = "1";
    tooltipEl.style.backgroundColor = backgroundColor;
    tooltipEl.style.borderRadius = "8px";
    tooltipEl.style.color = "#fff";
    tooltipEl.style.padding = "8px 12px";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.transition = "opacity 0.2s ease-in-out";

    const { offsetLeft, offsetTop } = chart.canvas;
    tooltipEl.style.left = `${offsetLeft + tooltip.caretX - tooltipEl.offsetWidth / 2}px`;
    tooltipEl.style.top = `${offsetTop + tooltip.caretY - tooltipEl.offsetHeight - 10}px`;
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 토글 버튼 */}
      <div style={styles.toggleContainer}>
        <div style={styles.toggleBackground}>
          <div
            style={{
              ...styles.toggleButton,
              transform: duration === "week" ? "translateX(0)" : "translateX(100%)",
            }}
          />
        </div>
        <button
          onClick={() => setDuration("week")}
          style={{
            ...styles.toggleLabel,
            color: duration === "week" ? "#fff" : "#aaa",
          }}
        >
          Week
        </button>
        <button
          onClick={() => setDuration("month")}
          style={{
            ...styles.toggleLabel,
            color: duration === "month" ? "#fff" : "#aaa",
          }}
        >
          Month
        </button>
      </div>

      {/* 라벨 영역 */}
      <div style={styles.legendContainer}>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendLine, backgroundColor: "#2E224E" }} />
          <span style={styles.legendText}>Income</span>
        </div>
        <div style={styles.legendItem}>
          <div style={{ ...styles.legendLine, backgroundColor: "#00C853" }} />
          <span style={styles.legendText}>Expense</span>
        </div>
      </div>

      {/* 차트 */}
      <div style={styles.chartWrapper}>
        <Line key={duration} data={chartData} options={options} />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            opacity: 0,
            background: "#2E224E",
            borderRadius: "8px",
            color: "#fff",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: "bold",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s ease-in-out",
          }}
        />
      </div>

      {/* 날짜 */}
      <div style={styles.dateContainer}>
        <div style={styles.dateLabel}>{startDate}</div>
        <div style={styles.dateLabel}>{endDate}</div>
      </div>
    </div>
  );
}

const styles = {
  toggleContainer: {
    display: "flex",
    position: "relative",
    width: "200px",
    height: "35px",
    backgroundColor: "#ddd",
    borderRadius: "20px",
    marginBottom: "10px",
  },
  toggleBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    overflow: "hidden",
  },
  toggleButton: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#2E224E",
    borderRadius: "20px",
    transition: "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
  },
  toggleLabel: {
    flex: 1,
    textAlign: "center",
    zIndex: 1,
    fontWeight: "bold",
    fontSize: "0.9rem",
    lineHeight: "30px",
    cursor: "pointer",
    border: "none",
    background: "none",
    color: "#aaa",
    transition: "color 0.2s ease-in-out",
  },
  legendContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: "10px",
    gap: "20px",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  legendLine: {
    width: "20px",
    height: "4px",
    borderRadius: "2px",
  },
  legendText: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#444",
  },
  dateContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "0.9rem",
    color: "#888",
    fontWeight: "bold",
  },
  chartWrapper: {
    width: "100%",
    height: "200px",
  },
  dateLabel: {
    minWidth: "70px",
    textAlign: "center",
  },
};

export default ActivityChart;
