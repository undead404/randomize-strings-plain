import axios from "axios";

const API_ENDPOINT = "https://api.random.org/json-rpc/4/invoke";

/**
 * Requests api.random.org to shuffle an array
 * @param {number[]} a Array to shuffle
 * @returns {Promise<number[]>} Shuffled array
 */
export default async function shuffleWithRandom(a) {
  const n = a.length;
  const response = await axios.post(API_ENDPOINT, {
    id: 42,
    jsonrpc: "2.0",
    method: "generateIntegers",
    params: {
      apiKey: process.env.RANDOM_API_KEY,
      n: n,
      min: 0,
      max: n - 1,
      replacement: false,
    },
  });
  if (response.data.error) {
    throw new Error(response.data.error.message);
  }
  return response.data.result.random.data.map((position) => a[position]);
}
