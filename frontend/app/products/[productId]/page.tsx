"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  payOrder,
  watchAndExecute,
} from "@/app/web3/ethereum/paymentProcessor";
import { createOrder } from "@/app/api/order";
import { getProduct } from "@/app/api/products";
import { getMerchant } from "@/app/api/merchants";
import type { IProduct } from "@/app/api/products";
import type { IMerchant } from "@/app/api/merchants";
import type { IOrder } from "@/app/api/order";

export default function ProductOverview() {
  const [loading, setLoading] = useState(false);
  const [paymentState, setPaymentState] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [merchant, setMerchant] = useState<IMerchant | null>(null);
  const [order, setOrder] = useState<IOrder | null>(null);
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        console.log("productId:", productId);
        const productResult = await getProduct(productId);

        if (!productResult || !productResult.merchantId) {
          throw new Error("Invalid product data received.");
        }
        setProduct(productResult);

        const merchantResult = await getMerchant(productResult.merchantId);
        if (!merchantResult) {
          throw new Error("Invalid merchant data received.");
        }
        setMerchant(merchantResult);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleClick = async () => {
    if (!product || !merchant) {
      setError("Product or Merchant data is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await createOrder(product, productQuantity, emailAddress);
      setOrder(result);
      console.log("Order created successfully:", result);
    } catch (err) {
      console.error("Failed to create order:", err);
      setError("Failed to create order. Please try again.");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (merchant && order) {
      const processPayment = async () => {
        try {
          await payOrder(
            merchant.wallet,
            order.id,
            order.totalAmountEth,
            merchant.percentage
          );
        } catch (err) {
          console.error("Failed to pay order:", err);
          setPaymentState("failed");
          setError("Failed to pay order. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      setPaymentState("processing");
      processPayment();
    }
  }, [order]);

  useEffect(() => {
    if (paymentState === "processing" && order?.id) {
      watchAndExecute(order.id, () => {
        console.log("Payment was successful!");
        setPaymentState("success");
      });
    }
  }, [paymentState]);

  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.name}
            </h1>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">
              {product?.description ?? ""}
            </p>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {product?.price ?? 0} per session
            </p>

            <div className="mt-10">
              <div className="mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Your email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="Enter your email"
                  className="block w-64 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                />

                <label
                  htmlFor="quantity"
                  className="block mt-4 text-sm font-medium text-gray-900"
                >
                  Number of sessions
                </label>
                <select
                  id="quantity"
                  value={productQuantity}
                  onChange={(event) =>
                    setProductQuantity(parseInt(event.target.value))
                  }
                  className="block w-16 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-gray-600">
                  Total Price:{" "}
                  {product?.price ? productQuantity * product.price : 0} USD
                  (~0.003 ETH - hardcoded)
                </p>
              </div>

              <button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleClick}
                disabled={loading}
              >
                Pay {product?.price ? productQuantity * product.price : 0} USD
                (~0.003 ETH - hardcoded)
              </button>
              {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
