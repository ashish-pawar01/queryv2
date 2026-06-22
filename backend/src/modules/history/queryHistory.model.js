import mongoose from "mongoose";

const queryHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    queryDefinition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QueryDefinition",
      required: true,
    },

    queryName: String,

    inputs: mongoose.Schema.Types.Mixed,

    generatedSql: String,

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("QueryHistory", queryHistorySchema);
