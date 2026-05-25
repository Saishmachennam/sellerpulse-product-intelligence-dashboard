import { useState } from "react";
import API from "../services/api";

function Upload() {

  const [file, setFile] = useState(null);

  const [message, setMessage] = useState("");

  const handleUpload = async () => {

    if (!file) {
      alert("Please select CSV file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {

  const response = await API.post(
    "/upload-products-csv",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  setMessage(response.data.message);

  window.location.reload();

} catch (error) {

  console.log(error);

  setMessage("Upload failed");

}
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1 style={{ color: "#111827" }}>Upload Product CSV</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Upload CSV
      </button>

      <p style={{ marginTop: "20px" }}>
        {message}
      </p>

    </div>
  );
}

export default Upload;