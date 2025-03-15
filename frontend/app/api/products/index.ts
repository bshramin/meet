interface IProduct {
  id: string;
  merchantId: string;
  name: string;
  price: number;
  description: string;
}

async function getProduct(productID: string): Promise<IProduct> {
  const response = await fetch(`/api/products/${productID}`);
  if (!response.ok) throw new Error("Failed to fetch product.");
  return response.json();
}

export { getProduct };
export type { IProduct };
