"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useParams } from "next/navigation";
import {
  CHAIN_ID,
  CONTRACT_ADDRESS,
  publicClient,
  RPC_URL,
  walletClient,
} from "@/app/web3/ethereum/client";
import { getCount, increment } from "@/app/web3/ethereum/counter";

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:3001";

export default function ProductOverview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [productQuantity, setProductQuantity] = useState(0); // TODO: change
  const [product, setProduct] = useState({
    id: "",
    merchant_id: "",
    name: "Loading...",
    description: "Loading...",
    price: 0,
  });
  const [order, setOrder] = useState({
    id: "",
    merchant_id: "",
    total_amount: 0,
    status: "",
    items: [],
  });
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    setLoading(true);
    setError("");
    console.log("Fetching data...");
    console.log("BACKEND_BASE_URL", BACKEND_BASE_URL);

    async function fetchData() {
      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Payment failed");
        }
        const result = await response.json();
        console.log("Product data received:", result);
        setProduct(result);
      } catch (err) {
        console.error("Failed to fetch product error:", err);
        setError("Failed to fetch product. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]); // Runs when productId changes

  const handleClick = async () => {
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          merchant_id: product.merchant_id,
          items: [
            {
              product_id: product.id,
              quantity: productQuantity,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      const result = await response.json();
      console.log("Order created successfully:", result);
      setOrder(result);
    } catch (err) {
      console.error("Failed to create order:", err);
      throw new Error("Failed to create order. Please try again.");
    } finally {
      // You can add any cleanup or finalization logic here if needed
    }

    // 2. Pay the order
    increment().then((result) => {
      console.log("increment result: ", result);
    });

    // 3. Wait for payment to go through

    // 4. Retrieve the order status

    // 5. Show a message to the user
  };

  console.log("RPC_URL: ", RPC_URL);
  console.log("CHAIN_ID: ", CHAIN_ID);
  console.log("CONTRACT_ADDRESS: ", CONTRACT_ADDRESS);

  getCount().then((result) => {
    console.log("getCounter: ", Number(result));
  });
  publicClient.getBlockNumber().then((blockNumber) => {
    console.log("Block number: ", Number(blockNumber));
  });
  walletClient.requestAddresses().then((addresses) => {
    console.log("Account Addresses: ", addresses);
  });
  return (
    <div className="bg-white">
      <div className="pt-6">
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-900">{product.description}</p>
          </div>
          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {product.price} per session
            </p>

            <div className="mt-10">
              <div className="mt-10">
                <label
                  htmlFor="price"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Number of sessions
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                      $
                    </div>
                    <input
                      id="price"
                      name="price"
                      type="text"
                      placeholder="0.00"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                      <select
                        id="currency"
                        name="currency"
                        aria-label="Currency"
                        className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      >
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                      </select>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleClick}
                disabled={loading}
              >
                Pay 25$ (0.003 eth)
              </button>
              {error != "" && <p className="mt-4 text-red-500">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
