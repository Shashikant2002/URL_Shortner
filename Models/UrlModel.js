const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    short_id: {
      type: String,
      required: true,
      unique: true,
    },
    redirect_url: {
      type: String,
      required: true,
    },
    visit_history: [
      {
        type: Number,
      },
    ],
  },
  { timestamps: true }
);

exports.URL_Modal = mongoose.model("URL", schema);
