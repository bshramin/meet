import express from "express";
import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

const router = express.Router();

// Function to generate payment guide using Hugging Face public API
async function generatePaymentGuide(country: string) {
  try {
    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: `Create a short guide within 250 characters for setting up a metamask wallet, adding ethereum funds, and making payments on a website. Make it specific to the ${country} country's payment landscape.`,
        },
      ],
      max_tokens: 250,
      temperature: 0.7,
      top_p: 0.95,
    });

    if (!chatCompletion) {
      throw new Error(`HTTP error! status: ${chatCompletion}`);
    }

    return {
      title: `Payment Guide for ${country}`,
      body: chatCompletion.choices[0].message.content,
    };
  } catch (error) {
    console.error("Error generating payment guide:", error);
    throw error;
  }
}

// Get payment guide for a specific country
router.get(
  "/:country",
  async function (req: express.Request, res: express.Response) {
    try {
      const { country } = req.params;
      const guide = await generatePaymentGuide(country);

      res.json(guide);
    } catch (error) {
      console.error("Error fetching payment guide:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
