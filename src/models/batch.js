import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
	batch_id: String,
	ids: [Number],
	ingestion_ids: [String], // multiple ingestion IDs possible per batch
	status: {
		type: String,
		enum: ["yet_to_start", "triggered", "completed"],
		default: "yet_to_start",
	},
	created_at: { type: Date, default: Date.now },
});

const Batch = mongoose.model("Batch", batchSchema);
export default Batch;
