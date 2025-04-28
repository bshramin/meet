import express from "express";

const router = express.Router();

const paymentGuides = {
  US: {
    title: "How to Pay with MetaMask in the United States",
    steps: [
      "Install MetaMask extension from the Chrome Web Store",
      "Create a new wallet or import an existing one",
      "Add funds to your wallet using a credit card or bank transfer",
      "Connect your MetaMask wallet to this website",
      "Complete the payment process",
    ],
  },
  UK: {
    title: "How to Pay with MetaMask in the United Kingdom",
    steps: [
      "Install MetaMask extension from the Chrome Web Store",
      "Create a new wallet or import an existing one",
      "Add funds to your wallet using a credit card or bank transfer",
      "Connect your MetaMask wallet to this website",
      "Complete the payment process",
    ],
  },
  default: {
    title: "How to Pay with MetaMask",
    steps: [
      "Install MetaMask extension from the Chrome Web Store",
      "Create a new wallet or import an existing one",
      "Add funds to your wallet using a credit card or bank transfer",
      "Connect your MetaMask wallet to this website",
      "Complete the payment process",
    ],
  },
};

// Get payment guide for a specific country
router.get(
  "/:country",
  async function (req: express.Request, res: express.Response) {
    try {
      const { country } = req.params;
      const guide =
        paymentGuides[country as keyof typeof paymentGuides] ||
        paymentGuides.default;

      res.json({
        title: guide.title,
        steps: guide.steps,
      });
    } catch (error) {
      console.error("Error fetching payment guide:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
