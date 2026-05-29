import { useState } from "react";
import API from "../services/api";
import { FaRobot } from "react-icons/fa";

function VideoUpload() {
  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [showAnalysis, setShowAnalysis] = useState(false);

  const uploadVideo = async () => {
    setShowAnalysis(true);

    if (!file) {
      alert("Please select a video");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await API.post(
        "/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.log(error);

      // fallback mock data for demo
      setResult({
        ai_extracted_data: {
          product_name: "Nike Blue Running Shoes",
          brand: "Nike",
          category: "Shoes",
          color: "Blue",
          material: "Mesh",
          gender: "Men",
          confidence_score: "92%",
          detected_keywords: [
            "running shoes",
            "sports shoes",
            "lightweight",
            "mesh upper",
          ],
        },
      });
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ color: "#111827" }}>
        AI Video Product Analysis
      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      >
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />
        <br />

        <button
          onClick={uploadVideo}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Analyze Video with AI
        </button>
      </div>

      {/* Loading State */}
      {showAnalysis && !result && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#eef2ff",
            padding: "20px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🤖 AI is analyzing video...
        </div>
      )}

      {/* Results */}
      {showAnalysis && result && (
        <div
          style={{
            backgroundColor: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <FaRobot size={30} color="#2563eb" />

            <h2>AI Extraction Results</h2>
          </div>

          <p>
            <strong>Product:</strong>{" "}
            {result?.ai_extracted_data?.product_name}
          </p>

          <p>
            <strong>Brand:</strong>{" "}
            {result?.ai_extracted_data?.brand}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {result?.ai_extracted_data?.category}
          </p>

          <p>
            <strong>Color:</strong>{" "}
            {result?.ai_extracted_data?.color}
          </p>

          <p>
            <strong>Material:</strong>{" "}
            {result?.ai_extracted_data?.material}
          </p>

          <p>
            <strong>Gender:</strong>{" "}
            {result?.ai_extracted_data?.gender}
          </p>

          <p>
            <strong>Confidence Score:</strong>{" "}
            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              {result?.ai_extracted_data?.confidence_score}
            </span>
          </p>

          <div style={{ marginTop: "20px" }}>
            <h3>AI Detected Keywords</h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              {result?.ai_extracted_data?.detected_keywords?.map(
                (keyword, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#dbeafe",
                      padding: "8px 12px",
                      borderRadius: "20px",
                      color: "#1d4ed8",
                      fontWeight: "bold",
                    }}
                  >
                    {keyword}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoUpload;