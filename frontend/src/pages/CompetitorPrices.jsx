import { useEffect, useState } from "react";
import API from "../services/api";

function CompetitorPrices() {

  const [prices, setPrices] = useState([]);

  useEffect(() => {

    fetchCompetitorPrices();

  }, []);

  const fetchCompetitorPrices = async () => {

    try {

      const response = await API.get(
        "/competitor-prices"
      );

      setPrices(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>
        Competitor Prices
      </h1>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          backgroundColor: "white"
        }}
      >

        <thead>

          <tr>
            <th>Product ID</th>
            <th>Platform</th>
            <th>Competitor Price</th>
            <th>URL</th>
          </tr>

        </thead>

        <tbody>

          {prices.map((item) => (

            <tr key={item.id}>

              <td>{item.product_id}</td>

              <td>{item.platform}</td>

              <td>₹{item.competitor_price}</td>

              <td>

                <a
                  href={item.competitor_url}
                  target="_blank"
                >
                  View
                </a>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default CompetitorPrices;