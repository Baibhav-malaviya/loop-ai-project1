import { dequeueBatch, isEmpty } from "../utils/priorityQueue.js";
import Batch from "../models/batch.js";

function simulateFetch(id) {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ id, data: "processed" }), 1000);
	});
}

async function processBatch(batch) {
	await Batch.findOneAndUpdate(
		{ batch_id: batch.batch_id },
		{ status: "triggered" }
	);

	await Promise.all(batch.ids.map(simulateFetch));

	await Batch.findOneAndUpdate(
		{ batch_id: batch.batch_id },
		{ status: "completed" }
	);

	console.log(`Processed batch ${batch.batch_id}:`, batch.ids);
}

function startQueueProcessor() {
	setInterval(async () => {
		if (!isEmpty()) {
			const batch = await dequeueBatch(3);
			if (batch) await processBatch(batch);
		}
	}, 5000);
}

export default startQueueProcessor;
