const paymentProcessorABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  { type: "fallback", stateMutability: "payable" },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payOrder",
    inputs: [
      { name: "recipient", type: "address", internalType: "address payable" },
      { name: "orderId", type: "string", internalType: "string" },
      { name: "merchantPercentage", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OrderPaid",
    inputs: [
      {
        name: "payer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "orderId",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "recipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "recipientAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "ownerAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "merchantPercentage",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PaymentReceived",
    inputs: [
      {
        name: "payer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
];

export default paymentProcessorABI;
