import { v4 as uuidv4 } from "uuid";
import Batch from "../models/batch.js";

const jobQueue = [];
const priorityMap = { HIGH: 0, MEDIUM: 1, LOW: 2 };

function enqueueJob(job) {
	jobQueue.push(job);
	jobQueue.sort((a, b) => {
		const priorityDiff = priorityMap[a.priority] - priorityMap[b.priority];
		return priorityDiff !== 0
			? priorityDiff
			: new Date(a.created_at) - new Date(b.created_at);
	});
}

async function dequeueBatch(limit = 3) {
	if (jobQueue.length === 0) return null;

	const jobs = jobQueue.splice(0, limit);
	const ids = jobs.map((job) => job.id);
	const ingestion_ids = [...new Set(jobs.map((job) => job.ingestion_id))];

	const batch = new Batch({
		batch_id: uuidv4(),
		ids,
		ingestion_ids,
		status: "yet_to_start",
	});

	await batch.save();
	return batch;
}

function isEmpty() {
	return jobQueue.length === 0;
}

export { enqueueJob, dequeueBatch, isEmpty };
