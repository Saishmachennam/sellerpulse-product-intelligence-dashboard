import { useEffect, useState } from "react";
import API from "../services/api";

function Issues() {

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    fetchIssues();

  }, []);

  const fetchIssues = async () => {

    try {

      const response = await API.get("/issues");

      setIssues(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>Listing Issues</h1>

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
            <th>Issue Type</th>
            <th>Message</th>
            <th>Suggested Fix</th>
          </tr>

        </thead>

        <tbody>

          {issues.map((issue) => (

            <tr key={issue.id}>

              <td
  style={{
    color:
      issue.severity === "HIGH"
        ? "red"
        : issue.severity === "MEDIUM"
        ? "orange"
        : "green",
    fontWeight: "bold"
  }}
>
  {issue.severity}
</td>
              <td>{issue.issue_type}</td>
              <td>{issue.message}</td>
              <td>{issue.suggested_fix}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Issues;