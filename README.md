# 📊 Data Ingestion API

A Node.js-based asynchronous batching system with rate-limited processing, built using Express, MongoDB, and Mongoose. It supports **priority-based ingestion**, batch processing (max 3 IDs per batch), and **1 batch per 5 seconds** execution constraint.

---

## 🧠 Features

- RESTful API for submitting ingestion requests and checking their status.
- Process data in **batches of 3 IDs** at a time.
- **Rate limit:** Only **1 batch per 5 seconds**.
- Priority-based queueing: `HIGH` > `MEDIUM` > `LOW`
- Tracks each batch’s processing state: `yet_to_start`, `triggered`, `completed`.
- Uses MongoDB for persistence.
- Clean ES6 codebase structure inside `src/` directory.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Baibhav-malaviya/loop-ai-project1.git
cd loop-ai-project1
```

## 🌐 Live URL

**Base URL:**  
[https://loop-ai-project1.onrender.com](https://loop-ai-project1.onrender.com)

---

## 📬 API Endpoints

### 1. `POST /ingest`

- Accepts an array of IDs and a priority level.
- Returns a unique `ingestion_id`.

### 2. `GET /status/:ingestion_id`

- Returns overall status and batch-wise progress of a submission.

---

## 🛠 Stack

- Node.js (ES6)
- Express
- MongoDB + Mongoose
- UUID for ID generation

---
