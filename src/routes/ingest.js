import express from "express";
import { v4 as uuidv4 } from "uuid";
import Ingestion from "../models/ingestion.js";
import { enqueueJob } from "../utils/priorityQueue.js";

const router = express.Router();

router.post("/ingest", async (req, res) => {
	const { ids, priority } = req.body;

	if (
		!Array.isArray(ids) ||
		!ids.every((id) => typeof id === "number") ||
		!["HIGH", "MEDIUM", "LOW"].includes(priority)
	) {
		return res.status(400).json({ error: "Invalid input" });
	}

	const ingestion_id = uuidv4();
	const ingestion = new Ingestion({ ingestion_id, priority });
	await ingestion.save();

	const created_at = new Date();

	ids.forEach((id) => enqueueJob({ id, ingestion_id, priority, created_at }));

	res.json({ ingestion_id });
});

export default router;
