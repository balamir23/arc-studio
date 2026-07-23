export const tokenFactoryAbi = [
  {
    type: "function",
    name: "createToken",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "name_",
        type: "string",
      },
      {
        name: "symbol_",
        type: "string",
      },
      {
        name: "supply_",
        type: "uint256",
      },
    ],
    outputs: [
      {
        type: "address",
      },
    ],
  },
  {
    type: "function",
    name: "getTokensByOwner",
    stateMutability: "view",
    inputs: [
      {
        name: "owner",
        type: "address",
      },
    ],
    outputs: [
      {
        type: "address[]",
      },
    ],
  },
  {
    type: "function",
    name: "getAllTokens",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "address[]",
      },
    ],
  },
] as const;