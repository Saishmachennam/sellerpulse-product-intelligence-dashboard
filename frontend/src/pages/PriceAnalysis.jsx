import { useEffect, useState } from "react";
import API from "../services/api";

function PriceAnalysis() {

  const [analysis, setAnalysis] = useState([]);

  useEffect(() => {

    fetchAnalysis();

  }, []);

  const fetchAnalysis = async () => {

    try {

      const response = await API.get(
        "/price-analysis"
      );

      setAnalysis(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>
        Price Intelligence Analysis
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

            <th>Product</th>

            <th>Our Price</th>

            <th>Lowest Competitor</th>

            <th>Average Competitor</th>

            <th>Price Gap %</th>

            <th>Recommended Action</th>

          </tr>

        </thead>

        <tbody>

          {analysis.map((item, index) => (

            <tr key={index}>

              <td>{item.product_title}</td>

              <td>₹{item.our_price}</td>

              <td>
                ₹{item.lowest_competitor_price}
              </td>

              <td>
                ₹{item.average_competitor_price}
              </td>

              <td>

                <span
                  style={{
                    color:
                      item.price_gap_percent > 10
                        ? "red"
                        : "green",
                    fontWeight: "bold"
                  }}
                >

                  {item.price_gap_percent}%

                </span>

              </td>

              <td>

                <span
                  style={{
                    color:
                      item.recommended_action ===
                      "Reduce price"
                        ? "red"
                        : "green",

                    fontWeight: "bold"
                  }}
                >

                  {item.recommended_action}

                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PriceAnalysis;