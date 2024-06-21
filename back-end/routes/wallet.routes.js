import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import walletModel from "../models/wallet.js";

const router = Router();

router.get("/wallets", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await walletModel.findOne({ user: userId }).lean();

    return res.json({
      success: true,
      wallet,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
});

router.put("/wallets", authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    const wallet = await walletModel.findOne({ user: userId });
    wallet.balance += +amount;

    await wallet.save();

    return res.json({
      success: true,
      wallet,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
    });
  }
});

export default router;
