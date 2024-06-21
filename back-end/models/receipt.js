import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      qty: Number,
    },
  ],
  total: Number,
});

const receiptModel = mongoose.model("Receipt", receiptSchema);

export default receiptModel;
