import { useEffect, useState } from "react";

import API from "../services/api";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const response = await API.get(
        "/jobs"
      );

      setJobs(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>

        Processing Jobs

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

            <th>Job ID</th>

            <th>Job Type</th>

            <th>Status</th>

            <th>Progress</th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job.id}>

              <td>{job.id}</td>

              <td>{job.job_type}</td>

              <td>

                <span
                  style={{
                    color:
                      job.status === "COMPLETED"
                        ? "green"
                        : "orange",

                    fontWeight: "bold"
                  }}
                >

                  {job.status}

                </span>

              </td>

              <td>

                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#e5e7eb",
                    borderRadius: "10px"
                  }}
                >

                  <div
                    style={{
                      width: `${job.progress}%`,
                      backgroundColor: "#2563eb",
                      color: "white",
                      padding: "5px",
                      borderRadius: "10px",
                      textAlign: "center"
                    }}
                  >

                    {job.progress}%

                  </div>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Jobs;