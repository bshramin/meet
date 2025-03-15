"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  payOrder,
  watchAndExecute,
} from "@/app/web3/ethereum/paymentProcessor";
import { createOrder } from "@/app/api/orders";
import { getProduct } from "@/app/api/products";
import { getMerchant } from "@/app/api/merchants";
import type { IProduct } from "@/app/api/products";
import type { IMerchant } from "@/app/api/merchants";
import type { IOrder } from "@/app/api/orders";

export default function ProductOverview() {
  const [loading, setLoading] = useState(false);
  const [paymentState, setPaymentState] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailError, setEmailError] = useState("");
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleClick = async () => {
    if (!validateEmail(emailAddress)) {
      return;
    }
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
  }, [order, merchant]);

  useEffect(() => {
    if (paymentState === "processing" && order?.id) {
      watchAndExecute(order.id, () => {
        console.log("Payment was successful!");
        setPaymentState("success");
      });
    }
  }, [paymentState, order]);

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
            {paymentState === "success" ? (
              <div className="text-center p-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  Payment Successful!
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for your purchase. You will receive a confirmation
                  email shortly.
                </p>
              </div>
            ) : (
              <>
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
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                        validateEmail(e.target.value);
                      }}
                      placeholder="Enter your email"
                      className={`block w-64 rounded-md border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } p-2 focus:border-blue-500 focus:ring-blue-500`}
                    />
                    {emailError && (
                      <p className="mt-1 text-sm text-red-500">{emailError}</p>
                    )}

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
                      {Array.from({ length: 20 }, (_, i) => i + 1).map(
                        (number) => (
                          <option key={number} value={number}>
                            {number}
                          </option>
                        )
                      )}
                    </select>

                    <p className="mt-2 text-gray-600">
                      Total Price:{" "}
                      {product?.price ? productQuantity * product.price : 0} USD
                    </p>
                  </div>

                  <button
                    className={`mt-10 flex w-full items-center justify-center rounded-md border border-transparent 
                      ${
                        paymentState === "processing"
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      } px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    onClick={handleClick}
                    disabled={loading || paymentState === "processing"}
                  >
                    {paymentState === "processing" ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ${product?.price ? productQuantity * product.price : 0} USD`
                    )}
                  </button>
                  {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
