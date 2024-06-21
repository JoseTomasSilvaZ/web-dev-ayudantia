import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: Number,
});

const walletModel = mongoose.model("Wallet", walletSchema);

export default walletModel;
