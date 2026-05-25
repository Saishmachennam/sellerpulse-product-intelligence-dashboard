import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

  const [summary, setSummary] = useState(null);

  useEffect(() => {

    fetchSummary();

  }, []);

  const fetchSummary = async () => {

    try {

      const response = await API.get(
        "/dashboard/quality-summary"
      );

      setSummary(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!summary) {
    return <h2 style={{ color: "green" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>
  SellerPulse Dashboard
</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Products</h3>
          <h2 style={{ color: "#271124" }}>{summary.total_products}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Total Issues</h3>
          <h2 style={{ color: "#271124" }}>{summary.total_issues}</h2>
        </div>

        <div style={cardStyle}>
          <h3>High Issues</h3>
          <h2 style={{ color: "#271124" }}>{summary.high_issues}</h2>
        </div>

        <div style={cardStyle}>
          <h3>Quality Score</h3>
          <h2 style={{ color: "#271124" }}>{summary.quality_score}</h2>
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center"
};

export default Dashboard;