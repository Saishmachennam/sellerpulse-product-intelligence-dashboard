````md
# SellerPulse – AI Product Intelligence Dashboard

## Overview

SellerPulse is an AI-powered Product Intelligence Dashboard built for e-commerce sellers to monitor listing quality, competitor pricing, and product optimization opportunities.

The platform helps sellers upload product videos or product feed CSVs, validate listing quality, analyze competitor prices, generate AI-enhanced product titles, and raise actionable alerts through a centralized analytics dashboard.

The system is designed around the workflow of a Flipkart seller and focuses on solving common e-commerce challenges such as poor listings, weak titles, invalid pricing, and uncompetitive marketplace pricing.


---

# Live Deployment

## Frontend
https://sellerpulse-product-intelligence-dashboard-b0y7dadj3.vercel.app/

## Backend
https://sellerpulse-backend.onrender.com/

## Swagger API Docs
https://sellerpulse-backend.onrender.com/docs

---

# Tech Stack

## Frontend
- React.js
- Vite
- Axios
- React Icons

## Backend
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn

## Database
- PostgreSQL (NeonDB)

## AI Integration
- Groq API (Llama3)
- Simulated AI Video Extraction

## Deployment
- Vercel (Frontend)
- Render (Backend)
- NeonDB (Database)

---

# Core Features

## 1. AI Video Product Analysis

Users can upload short product videos for AI-based product information extraction.

### Implemented Flow
- Video upload
- AI extraction simulation
- Product attribute detection
- Keyword extraction
- Confidence score generation

### Extracted Information
- Product Name
- Brand
- Category
- Color
- Material
- Gender
- Product Keywords

### Example Output
```text
Nike Blue Running Shoes
Brand: Nike
Category: Shoes
Color: Blue
Material: Mesh
Confidence: 92%
````

### Notes

The current implementation uses a mocked/simulated AI extraction layer for demo reliability and assignment scope.

The architecture supports replacement with:

* OCR pipelines
* OpenAI Vision
* Gemini Vision
* Computer Vision APIs
* Multimodal LLMs

---

# 2. AI Product Title Enhancement

SellerPulse integrates a real LLM using Groq API to generate optimized e-commerce product titles.

### Features

* SEO-friendly title generation
* AI-enhanced product listings
* Marketplace optimized titles
* Ecommerce keyword enrichment

### Example

#### Input

```text
Nike Shoes Blue
```

#### AI Output

```text
Nike Blue Lightweight Running Shoes for Men
```

### AI Model

```text
Llama3-8B-8192 via Groq API
```

---

# 3. Product Feed CSV Upload

The platform supports bulk product ingestion using CSV uploads.

### Features

* CSV upload support
* Bulk product insertion
* Duplicate SKU detection
* Validation during ingestion
* PostgreSQL persistence

### Supported Fields

* sku_id
* product_title
* description
* brand
* category
* price
* mrp
* availability
* color
* size
* material

---

# 4. Product Validation Engine

SellerPulse includes a validation engine that analyzes uploaded product listings and generates listing quality issues.

## Validation Rules Implemented

| Validation Rule              | Severity | Description                    |
| ---------------------------- | -------- | ------------------------------ |
| Missing Product Title        | HIGH     | Product title missing          |
| Missing Brand                | MEDIUM   | Brand information missing      |
| Invalid Product Price        | HIGH     | Price missing or invalid       |
| MRP Lower Than Selling Price | HIGH     | Incorrect pricing logic        |
| Out of Stock Product         | LOW      | Product unavailable            |
| Duplicate SKU Handling       | HIGH     | Duplicate SKU prevention       |
| Weak Listing Detection       | MEDIUM   | Poor listing quality detection |

---

# 5. Product Quality Dashboard

The dashboard provides high-level product quality insights.

## Dashboard Metrics

* Total Products
* Total Issues
* High Severity Issues
* Medium Severity Issues
* Low Severity Issues
* Overall Quality Score

The dashboard updates dynamically after uploads and validations.

---

# 6. Alerts & Notifications System

The platform automatically generates alerts for critical business issues.

## Alert Types

* Missing title alerts
* Invalid price alerts
* High pricing gap alerts
* Weak listing alerts
* Out-of-stock alerts

## Severity Levels

* HIGH
* MEDIUM
* LOW

---

# 7. Competitor Price Intelligence

SellerPulse compares Flipkart product pricing against competitor marketplaces.

## Supported Competitor Platforms

* Amazon
* Myntra
* Ajio

## Features

* Simulated competitor pricing
* Price comparison analytics
* Lowest competitor detection
* Average competitor pricing
* Pricing recommendations

---

# 8. Price Intelligence Analysis

The system analyzes marketplace pricing competitiveness.

## Metrics Calculated

* Our Price
* Lowest Competitor Price
* Average Competitor Price
* Price Gap Percentage
* Recommended Pricing Action

## Recommendation Engine

Example recommendations:

* Reduce Price
* Competitive Pricing
* Increase Price Opportunity

---

# 9. Job Processing & Tracking

SellerPulse tracks long-running operations such as:

* CSV uploads
* Video processing

## Job States

* RUNNING
* COMPLETED

## Features

* Progress tracking
* Job monitoring
* Processing status table

---

# Backend APIs

| Method | Endpoint                    | Purpose                          |
| ------ | --------------------------- | -------------------------------- |
| POST   | /upload-video               | Upload and analyze product video |
| POST   | /upload-products-csv        | Upload product CSV               |
| GET    | /products                   | Get products                     |
| GET    | /issues                     | Get validation issues            |
| GET    | /alerts                     | Get alerts                       |
| GET    | /dashboard/quality-summary  | Dashboard analytics              |
| POST   | /enhance-title              | AI title enhancement             |
| POST   | /generate-competitor-prices | Generate competitor prices       |
| GET    | /competitor-prices          | Get competitor prices            |
| GET    | /price-analysis             | Price intelligence analysis      |
| GET    | /jobs                       | Get processing jobs              |

---

# System Architecture

```text
React Frontend
        ↓
FastAPI Backend
        ↓
PostgreSQL (NeonDB)

AI Services:
- Groq LLM API
- Simulated AI Video Extraction
```

---

# Project Structure

```text
product_intelligence_dashboard/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── package.json
│
├── sample_data/
│   ├── sample_products.csv
│   ├── sample_video.mp4
│
├── screenshots/
│
├── README.md
```

---

# Setup Instructions

## Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

## Backend `.env`

```env
DATABASE_URL=***
GROQ_API_KEY=***
```

## Frontend `.env`

```env
VITE_API_URL=***
```

---

# Mocked vs Real Features

| Feature                   | Status    |
| ------------------------- | --------- |
| Groq AI Title Enhancement | Real      |
| PostgreSQL Database       | Real      |
| Competitor Pricing        | Simulated |
| Video AI Extraction       | Simulated |
| OCR Extraction            | Mocked    |
| Price Refresh Scheduler   | Simulated |

---

# Known Limitations

* Video extraction currently uses simulated AI responses
* Competitor pricing uses mock marketplace data
* No authentication system
* No real OCR pipeline implemented
* Free-tier backend may sleep during inactivity

---

# Future Improvements

* Real OCR integration
* OpenAI Vision / Gemini Vision integration
* Real-time competitor APIs
* Scheduled background jobs
* Email/Slack notifications
* Authentication & RBAC
* Price history charts
* Product recommendation engine
* Docker deployment
* Retry failed jobs
* Advanced analytics



# Author

Developed by:
Saishma Chennam



```
```
