import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    companyName: String,

    companyLogo: String,

    theme: {
      type: String,
      default: "LIGHT",
    },

    sessionTimeout: {
      type: Number,
      default: 60,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SystemSettings", settingsSchema);
