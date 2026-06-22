import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  },
);

favoriteSchema.index(
  {
    user: 1,
    queryDefinition: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Favorite", favoriteSchema);
