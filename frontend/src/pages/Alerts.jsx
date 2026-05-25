import { useEffect, useState } from "react";
import API from "../services/api";

function Alerts() {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    fetchAlerts();

  }, []);

  const fetchAlerts = async () => {

    try {

      const response = await API.get("/alerts");

      setAlerts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>Alerts</h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse"
        }}
      >

        <thead>

          <tr>
            <th>Severity</th>
            <th>Message</th>
            <th>Product ID</th>
          </tr>

        </thead>

        <tbody>

          {alerts.map((alert) => (

            <tr key={alert.id}>
                <td
  style={{
    color:
      alert.severity === "HIGH"
        ? "red"
        : alert.severity === "MEDIUM"
        ? "orange"
        : "green",
    fontWeight: "bold"
  }}
>
  {alert.severity}
</td>
              <td>{alert.message}</td>
              <td>{alert.product_id}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Alerts;