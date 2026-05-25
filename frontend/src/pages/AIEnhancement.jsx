import { useState } from "react";

import API from "../services/api";

import { FaRobot } from "react-icons/fa";

function AIEnhancement() {

  const [title, setTitle] = useState("");

  const [enhancedTitle, setEnhancedTitle] = useState("");

  const generateTitle = async () => {

    try {

      const response = await API.post(
        "/enhance-title",
        {
          title: title
        }
      );

      setEnhancedTitle(
        response.data.enhanced_title
      );

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1
        style={{
          color: "#111827"
        }}
      >

        AI Product Title Enhancement

      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.1)",
          marginTop: "20px"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px"
          }}
        >

          <FaRobot
            size={28}
            color="#2563eb"
          />

          <h2 style={{
          color: "#6197ac"
        }}>

            AI-Powered SEO Title Generator

          </h2>

        </div>

        <input
          type="text"
          placeholder="Enter product title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={generateTitle}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >

          Generate AI Title

        </button>

        {enhancedTitle && (

          <div
            style={{
              marginTop: "25px",
              backgroundColor: "#eff6ff",
              padding: "20px",
              borderRadius: "10px"
            }}
          >

            <h3
              style={{
                color: "#1d4ed8"
              }}
            >

              AI Enhanced Title

            </h3>

            <p
              style={{
                marginTop: "10px",
                fontSize: "18px",
                fontWeight: "bold"
              }}
            >

              {enhancedTitle}

            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default AIEnhancement;