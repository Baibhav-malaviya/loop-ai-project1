# 📊 Data Ingestion API

A Node.js-based asynchronous batching system with **priority-based ingestion** and **rate-limited processing**, built using Express, MongoDB, and Mongoose.

---

## 🧠 Features

- RESTful API for submitting ingestion requests and tracking their status.
- **Batches process up to 3 IDs** at a time.
- **Rate limit:** Only **1 batch every 5 seconds**.
- **Priority queue**: HIGH > MEDIUM > LOW.
- Jobs are dequeued based on **priority and creation time**.
- Tracks each batch's processing status: yet_to_start, triggered, completed.
- **Shared batching**: A batch may contain IDs from multiple ingestion requests.
- MongoDB-based persistence using Mongoose.
- Clean modular ES6 codebase inside src/ directory.

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Baibhav-malaviya/loop-ai-project1.git
cd loop-ai-project1
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

---

## 🌐 Live Deployment

**Base URL:** https://loop-ai-project1.onrender.com

---

## 📬 API Endpoints

### 🔹 `POST /ingest`

Submit a list of IDs to be processed.

**Request Body:**

```json
{
	"ids": [1, 2, 3, 4, 5],
	"priority": "HIGH"
}
```

**Response:**

```json
{
	"ingestion_id": "abc123"
}
```

### 🔹 `GET /status/:ingestion_id`

Retrieve the status of batches related to a specific ingestion request.

**Response:**

```json
{
	"ingestion_id": "abc123",
	"status": "triggered",
	"batches": [
		{
			"batch_id": "uuid1",
			"ids": [1, 2, 3],
			"status": "completed"
		},
		{
			"batch_id": "uuid2",
			"ids": [4, 5],
			"status": "triggered"
		}
	]
}
```

---

## 🛠 Tech Stack

- Node.js (ES6)
- Express.js
- MongoDB + Mongoose
- UUID (for unique ID generation)

---

## 📁 Project Structure

```
src/
├── models/     # Mongoose schemas (Ingestion, Batch)
├── routes/     # Express routes (ingest, status)
├── utils/      # Priority queue logic
├── processor/  # Batch processor logic
├── index.js    # Entry point
```

---

## 📌 Notes

- Batches are built **from a single queue**, sorted by `(priority, created_at)`.
- **Max 3 jobs** per batch, respecting the **5-second rule**.
- **Dynamic batching**: IDs from newer high-priority requests may be processed before older lower-priority ones.
- Every batch logs status in the database and can be tracked via the `/status/:ingestion_id` endpoint.
