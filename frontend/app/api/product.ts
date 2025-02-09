interface IProduct {
  id: string;
  merchantId: string;
  name: string;
  price: number;
  description: string;
}

async function getProduct(productID: string) {
  const BACKEND_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";

  try {
    const response = await fetch(`${BACKEND_BASE_URL}/products/${productID}`);
    if (!response.ok) {
      console.error("Failed to fetch product with response:", response);
      throw new Error("Failed to fetch product. Please try again.");
    }
    const result = await response.json();
    console.log("Product data received:", result);
    return result;
  } catch (err) {
    console.error("Failed to fetch product error:", err);
    throw "Failed to fetch product. Please try again.";
  }
}

export { getProduct };
export type { IProduct };
